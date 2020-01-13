import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IExportStrategy } from './Interface/IExportStrategy';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { Helper } from '../Utilities/Helpers/Helper';
import { OpenfinHelper } from '../Utilities/Helpers/OpenfinHelper';
import * as _ from 'lodash';
import { Report } from '../PredefinedConfig/ExportState';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import {
  SELECTED_CELLS_REPORT,
  DEFAULT_LIVE_REPORT_THROTTLE_TIME,
} from '../Utilities/Constants/GeneralConstants';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { LiveReport } from '../Api/Events/LiveReportUpdated';
import { DataChangedInfo } from '../AdaptableOptions/CommonObjects/DataChangedInfo';

export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
  private isSendingData: boolean = false;
  private workAroundOpenfinExcelDataDimension: Map<string, { x: number; y: number }> = new Map();

  private throttledRecomputeAndSendLiveDataEvent: (() => void) & _.Cancelable;

  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ExportStrategyId, adaptable);

    this.adaptable.api.eventApi.on('AdaptableReady', () => {
      setTimeout(() => {
        this.throttledRecomputeAndSendLiveDataEvent = _.throttle(
          () => this.sendNewLiveData(),
          this.getThrottleTimeFromState()
        );
      }, 1000);
    });

    // ideally this OpenFin stuff should come out and be put in an OpenFin Service
    // and that will manage this and only call the strategy as required
    OpenfinHelper.OnExcelDisconnected().Subscribe(() => {
      LoggingHelper.LogAdaptableInfo('Excel closed stopping all Live Excel');
      this.adaptable.api.internalApi.getLiveReports().forEach(cle => {
        this.adaptable.api.internalApi.stopLiveReport(cle.Report, ExportDestination.OpenfinExcel);
      });
    });
    OpenfinHelper.OnWorkbookDisconnected().Subscribe((sender, workbook) => {
      LoggingHelper.LogAdaptableInfo(
        'Workbook closed:' + workbook.name + ', Stopping Openfin Live Excel'
      );
      let liveReport = this.adaptable.api.internalApi
        .getLiveReports()
        .find(x => x.PageName == workbook.name);
      if (liveReport) {
        this.adaptable.api.internalApi.stopLiveReport(
          liveReport.Report,
          ExportDestination.OpenfinExcel
        );
      }
    });
    OpenfinHelper.OnWorkbookSaved().Subscribe((sender, workbookSavedEvent) => {
      LoggingHelper.LogAdaptableInfo('Workbook Saved', workbookSavedEvent);
      let liveReport = this.adaptable.api.internalApi
        .getLiveReports()
        .find(x => x.PageName == workbookSavedEvent.OldName);

      this.adaptable.api.internalApi.stopLiveReport(
        liveReport.Report,
        ExportDestination.OpenfinExcel
      );

      this.adaptable.api.internalApi.startLiveReport(
        liveReport.Report,
        workbookSavedEvent.NewName,
        ExportDestination.OpenfinExcel
      );
    });
    // if a piece of data has updated then update any live reports
    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      // we currently always refresh - is that right??
      this.refreshLiveReports();
    });
    // if the grid has refreshed then update any live reports
    this.adaptable._on('GridRefreshed', () => {
      this.refreshLiveReports();
    });
    // if cell selection has changed and we have selected cells as one of the live reports then send updated data
    this.adaptable._on('CellsSelected', () => {
      if (ArrayExtensions.IsNotNullOrEmpty(this.adaptable.api.internalApi.getLiveReports())) {
        let liveReport = this.adaptable.api.internalApi
          .getLiveReports()
          .find(x => x.Report.Name == SELECTED_CELLS_REPORT);
        if (liveReport) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ExportStrategyFriendlyName,
      ComponentName: ScreenPopups.ExportPopup,
      Icon: StrategyConstants.ExportGlyph,
    });
  }

  private sendNewLiveData() {
    //we wait for the last sendNewLiveData to finish
    if (this.isSendingData == true) {
      this.throttledRecomputeAndSendLiveDataEvent();
      return;
    }
    if (ArrayExtensions.IsNotNullOrEmpty(this.adaptable.api.internalApi.getLiveReports())) {
      this.isSendingData = true;
      let promises: Promise<any>[] = [];
      this.adaptable.api.internalApi.getLiveReports().forEach((liveReport: LiveReport) => {
        if (liveReport.ReportDestination == ExportDestination.OpenfinExcel) {
          promises.push(
            Promise.resolve()
              .then(() => {
                return new Promise<any>((resolve, reject) => {
                  //we want to erase old cells in case we are sending less data
                  //we don't want to call clearCellContent as it makes the excel sheet to blink
                  //and also is incorrrect as until we call setcells again we've lost all values in excel which might upset
                  //some macros
                  let previousDimension = this.workAroundOpenfinExcelDataDimension.get(
                    liveReport.Report.Uuid
                  );
                  let ReportAsArray: any[] = this.ConvertReportToArray(liveReport.Report);
                  let newDimension = { x: ReportAsArray[0].length, y: ReportAsArray.length };
                  if (previousDimension) {
                    let missingNumberOfRows = previousDimension.y - newDimension.y;
                    let missingNumberOfColumns = previousDimension.x - newDimension.x;
                    if (missingNumberOfRows > 0) {
                      for (let i = 0; i < missingNumberOfRows; i++) {
                        let newRow = [];
                        for (let j = 0; j < newDimension.x; j++) {
                          newRow.push(null);
                        }
                        ReportAsArray.push(newRow);
                      }
                    }
                    if (missingNumberOfColumns > 0) {
                      //missing column
                      ReportAsArray.forEach(row => {
                        for (let j = 0; j < missingNumberOfColumns; j++) {
                          row.push(null);
                        }
                      });
                    }
                  }
                  if (ReportAsArray) {
                    this.workAroundOpenfinExcelDataDimension.set(
                      liveReport.Report.Uuid,
                      newDimension
                    );
                    resolve(ReportAsArray);
                  } else {
                    reject();
                  }
                });
              })
              .then(ReportAsArray => {
                return OpenfinHelper.pushData(liveReport.PageName, ReportAsArray);
              })
              .catch(reason => {
                LoggingHelper.LogAdaptableWarning(
                  'Live Excel failed to send data for [' + liveReport.Report + ']',
                  reason
                );
                this.adaptable.api.internalApi.stopLiveReport(
                  liveReport.Report,
                  ExportDestination.OpenfinExcel
                );

                this.adaptable.api.alertApi.showAlertError(
                  'Live Excel Error',
                  'Failed to send data for [' +
                    liveReport.Report +
                    ']. This live export has been stopped'
                );
              })
          );
        } else if (liveReport.ReportDestination == ExportDestination.Glue42) {
          promises.push(
            Promise.resolve()
              .then(() => {
                return new Promise<any>((resolve, reject) => {
                  let reportAsArray: any[] = this.ConvertReportToArray(liveReport.Report);

                  if (reportAsArray) {
                    resolve(reportAsArray);
                  } else {
                    reject('no data in the report');
                  }
                });
              })
              .then(reportAsArray => {
                let gridColumns: AdaptableColumn[] = this.adaptable.api.gridApi.getColumns();
                let primaryKeyValues: any[] = this.adaptable.ReportService.GetPrimaryKeysForReport(
                  liveReport.Report
                );
                return this.adaptable.Glue42Service.updateData(
                  reportAsArray,
                  gridColumns,
                  primaryKeyValues
                );
              })
              .catch(reason => {
                LoggingHelper.LogAdaptableWarning(
                  'Live Excel failed to send data for [' + liveReport.Report + ']',
                  reason
                );
                this.adaptable.api.internalApi.stopLiveReport(
                  liveReport.Report,
                  ExportDestination.Glue42
                );

                let errorMessage: string = 'Export Failed';
                if (reason) {
                  errorMessage += ': ' + reason;
                }
                errorMessage += '.  This live export has been cancelled.';
                this.adaptable.api.alertApi.showAlertError('Export Error', errorMessage);
              })
          );
        }
      });
      Promise.all(promises)
        .then(() => {
          LoggingHelper.LogAdaptableSuccess('All live report data sent');
          this.isSendingData = false;
        })
        .catch(() => {
          LoggingHelper.LogAdaptableWarning('One live Excel failed to send data');
          this.isSendingData = false;
        });
    }
  }

  public export(
    report: Report,
    exportDestination: ExportDestination,
    isLiveReport: boolean,
    folder: string,
    page: string
  ): void {
    switch (exportDestination) {
      case ExportDestination.Clipboard:
        this.copyToClipboard(report);
        break;
      case ExportDestination.CSV:
        this.convertReportToCsv(report);
        break;
      case ExportDestination.JSON:
        this.convertReportToJSON(report);
        break;
      case ExportDestination.OpenfinExcel:
        OpenfinHelper.initOpenFinExcel() //.then((workbook) => OpenfinHelper.addReportWorkSheet(workbook, ReportName))
          .then(pageName => {
            this.adaptable.api.internalApi.startLiveReport(
              report,
              pageName,
              ExportDestination.OpenfinExcel
            );
            setTimeout(() => {
              this.throttledRecomputeAndSendLiveDataEvent();
            }, 500);
          });
        break;

      case ExportDestination.Glue42:
        if (isLiveReport) {
          let page: string = 'Excel'; // presume we should get this from Glue42 service in async way??
          let reportData: any[] = this.ConvertReportToArray(report);
          this.adaptable.Glue42Service.openSheet(reportData).then(() => {
            this.adaptable.api.internalApi.startLiveReport(report, page, ExportDestination.Glue42);
            setTimeout(() => {
              this.throttledRecomputeAndSendLiveDataEvent();
            }, 500);
          });
          break;
        } else {
          let data: any[] = this.ConvertReportToArray(report);
          let gridColumns: AdaptableColumn[] = this.adaptable.api.gridApi.getColumns();
          // for glue42 we need to pass in the pk values of the data also
          let primaryKeyValues: any[] = this.adaptable.ReportService.GetPrimaryKeysForReport(
            report
          );
          try {
            if (data) {
              this.adaptable.Glue42Service.exportData.apply(this.adaptable.Glue42Service, [
                data,
                gridColumns,
                primaryKeyValues,
              ]);
            }
          } catch (error) {
            LoggingHelper.LogAdaptableError(error);
          }
          break;
        }
    }
  }

  private convertReportToJSON(report: Report): void {
    let reportAsArray: any[] = this.ConvertReportToArray(report);
    if (reportAsArray) {
      let reportAsJSON = JSON.stringify(reportAsArray);
      if (reportAsJSON) {
        let csvFileName: string = report.Name + '.json';
        Helper.createDownloadedFile(reportAsJSON, csvFileName, 'application/json');
      }
    }
  }

  private convertReportToCsv(report: Report): void {
    let csvContent: string = this.createCSVContent(report);
    if (csvContent) {
      let csvFileName: string = report.Name + '.csv';
      Helper.createDownloadedFile(csvContent, csvFileName, 'text/csv;encoding:utf-8');
    }
  }

  private copyToClipboard(report: Report) {
    let csvContent: string = this.createTabularContent(report);
    if (csvContent) {
      Helper.copyToClipboard(csvContent);
    }
  }

  private createCSVContent(report: Report): string {
    let reportAsArray: any[] = this.ConvertReportToArray(report);
    if (reportAsArray) {
      return Helper.convertArrayToCsv(reportAsArray, ',');
    }
    return null;
  }

  private createTabularContent(report: Report): string {
    let ReportAsArray: any[] = this.ConvertReportToArray(report);
    if (ReportAsArray) {
      return Helper.convertArrayToCsv(ReportAsArray, '\t');
    }
    return null;
  }

  // Converts a Report into an array of array - first array is the column names and subsequent arrays are the values
  private ConvertReportToArray(report: Report): any[] {
    let actionReturnObj = this.adaptable.ReportService.ConvertReportToArray(report);
    if (actionReturnObj.Alert) {
      this.adaptable.api.alertApi.displayMessageAlertPopup(actionReturnObj.Alert);
      return null;
    }
    return actionReturnObj.ActionReturn;
  }

  private getThrottleTimeFromState(): number {
    if (this.adaptable.api.glue42Api.isGlue42Available()) {
      return this.getThrottleDurationForExportDestination(ExportDestination.Glue42);
    }
    if (this.adaptable.api.internalApi.isOpenFinAvailable()) {
      return this.getThrottleDurationForExportDestination(ExportDestination.OpenfinExcel);
    }
    return DEFAULT_LIVE_REPORT_THROTTLE_TIME;
  }

  private getThrottleDurationForExportDestination(exportDestination: ExportDestination): number {
    switch (exportDestination) {
      case ExportDestination.OpenfinExcel:
        return DEFAULT_LIVE_REPORT_THROTTLE_TIME; // hardcoding this for now until we do properly
      case ExportDestination.Glue42:
        let glue42ThrottleTime:
          | number
          | undefined = this.adaptable.api.glue42Api.getGlue42ThrottleTime();
        return glue42ThrottleTime ? glue42ThrottleTime : DEFAULT_LIVE_REPORT_THROTTLE_TIME;
      default:
        return DEFAULT_LIVE_REPORT_THROTTLE_TIME;
    }
  }

  // we assume that we are only ever sending to one destination so we just get the throttle time of the first live report
  // if thats wrong then its not the end of the world tbh
  private refreshLiveReports(): void {
    let firstLiveReport = this.getFirstLiveReport();
    if (firstLiveReport) {
      this.throttledRecomputeAndSendLiveDataEvent();
    }
  }

  private getFirstLiveReport(): LiveReport | undefined {
    if (ArrayExtensions.IsNotNullOrEmpty(this.adaptable.api.internalApi.getLiveReports())) {
      return this.adaptable.api.internalApi.getLiveReports()[0];
    }
    return undefined;
  }
}
