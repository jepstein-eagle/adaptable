import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IExportStrategy } from './Interface/IExportStrategy';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { Helper } from '../Utilities/Helpers/Helper';
import { OpenfinHelper } from '../Utilities/Helpers/OpenfinHelper';
import * as _ from 'lodash';
import { Report } from '../PredefinedConfig/ExportState';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableBlotterColumn } from '../PredefinedConfig/Common/AdaptableBlotterColumn';
import {
  SELECTED_CELLS_REPORT,
  DEFAULT_LIVE_REPORT_THROTTLE_TIME,
} from '../Utilities/Constants/GeneralConstants';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/Menu';
import { LiveReport } from '../Api/Events/LiveReportUpdated';

// this page needs some thought as currently we only send live data to iPushpull and Excel but soon we will send it to Glue42
// we need something that will work for all 3 (e.g. all 3 will want to listen to Selected Cells) but allows you to manage throttling time differently for each
// its very unlikley that the same user will be using iPushPull and Glue42 at the same time but its theoretically possible so we need to handle that.
export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
  private isSendingData: boolean = false;
  private workAroundOpenfinExcelDataDimension: Map<string, { x: number; y: number }> = new Map();

  private throttledRecomputeAndSendLiveDataEvent: (() => void) & _.Cancelable;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ExportStrategyId, blotter);

    this.blotter.api.eventApi.on('BlotterReady', () => {
      setTimeout(() => {
        this.throttledRecomputeAndSendLiveDataEvent = _.throttle(
          () => this.sendNewLiveData(),
          this.getThrottleTimeFromState()
        );
      }, 1000);
    });

    this.blotter._on('GridReloaded', () => {
      this.scheduleReports();
    });

    // ideally this OpenFin stuff should come out and be put in an OpenFin Service (like with glue and ipushpull)
    // and that will manage this and only call the strategy as required
    OpenfinHelper.OnExcelDisconnected().Subscribe(() => {
      LoggingHelper.LogAdaptableBlotterInfo('Excel closed stopping all Live Excel');
      this.blotter.api.internalApi.getLiveReports().forEach(cle => {
        this.blotter.api.internalApi.stopLiveReport(cle.Report, ExportDestination.OpenfinExcel);
      });
    });
    OpenfinHelper.OnWorkbookDisconnected().Subscribe((sender, workbook) => {
      LoggingHelper.LogAdaptableBlotterInfo(
        'Workbook closed:' + workbook.name + ', Stopping Openfin Live Excel'
      );
      let liveReport = this.blotter.api.internalApi
        .getLiveReports()
        .find(x => x.PageName == workbook.name);
      if (liveReport) {
        this.blotter.api.internalApi.stopLiveReport(
          liveReport.Report,
          ExportDestination.OpenfinExcel
        );
      }
    });
    OpenfinHelper.OnWorkbookSaved().Subscribe((sender, workbookSavedEvent) => {
      LoggingHelper.LogAdaptableBlotterInfo('Workbook Saved', workbookSavedEvent);
      let liveReport = this.blotter.api.internalApi
        .getLiveReports()
        .find(x => x.PageName == workbookSavedEvent.OldName);

      this.blotter.api.internalApi.stopLiveReport(
        liveReport.Report,
        ExportDestination.OpenfinExcel
      );

      this.blotter.api.internalApi.startLiveReport(
        liveReport.Report,
        workbookSavedEvent.NewName,
        ExportDestination.OpenfinExcel
      );
    });
    // if a piece of data has updated then update any live reports
    this.blotter.DataService.OnDataSourceChanged().Subscribe(() => {
      this.refreshLiveReports();
    });
    // if the grid has refreshed then update any live reports
    this.blotter._on('GridRefreshed', () => {
      this.refreshLiveReports();
    });
    // if cell selection has changed and we have selected cells as one of the live reports then send updated data
    this.blotter._on('CellsSelected', () => {
      if (ArrayExtensions.IsNotNullOrEmpty(this.blotter.api.internalApi.getLiveReports())) {
        let liveReport = this.blotter.api.internalApi
          .getLiveReports()
          .find(x => x.Report.Name == SELECTED_CELLS_REPORT);
        if (liveReport) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ExportStrategyName,
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
    if (ArrayExtensions.IsNotNullOrEmpty(this.blotter.api.internalApi.getLiveReports())) {
      this.isSendingData = true;
      let promises: Promise<any>[] = [];
      this.blotter.api.internalApi.getLiveReports().forEach((liveReport: LiveReport) => {
        if (liveReport.ExportDestination == ExportDestination.OpenfinExcel) {
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
                LoggingHelper.LogAdaptableBlotterWarning(
                  'Live Excel failed to send data for [' + liveReport.Report + ']',
                  reason
                );
                this.blotter.api.internalApi.stopLiveReport(
                  liveReport.Report,
                  ExportDestination.OpenfinExcel
                );

                this.blotter.api.alertApi.showAlertError(
                  'Live Excel Error',
                  'Failed to send data for [' +
                    liveReport.Report +
                    ']. This live export has been stopped'
                );
              })
          );
        } else if (liveReport.ExportDestination == ExportDestination.iPushPull) {
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
                return this.blotter.PushPullService.pushData(liveReport.PageName, reportAsArray);
              })
              .catch(reason => {
                LoggingHelper.LogAdaptableBlotterWarning(
                  'Live Excel failed to send data for [' + liveReport.Report + ']',
                  reason
                );
                this.blotter.api.internalApi.stopLiveReport(
                  liveReport.Report,
                  ExportDestination.iPushPull
                );

                let errorMessage: string = 'Export Failed';
                if (reason) {
                  errorMessage += ': ' + reason;
                }
                errorMessage += '.  This live export has been cancelled.';
                this.blotter.api.alertApi.showAlertError('iPushPull Export Error', errorMessage);
              })
          );
        } else if (liveReport.ExportDestination == ExportDestination.Glue42) {
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
                let gridColumns: AdaptableBlotterColumn[] = this.blotter.api.gridApi.getColumns();
                let primaryKeyValues: any[] = this.blotter.ReportService.GetPrimaryKeysForReport(
                  liveReport.Report
                );
                return this.blotter.Glue42Service.exportData.apply(this.blotter.Glue42Service, [
                  reportAsArray,
                  gridColumns,
                  primaryKeyValues,
                ]);
              })
              .catch(reason => {
                LoggingHelper.LogAdaptableBlotterWarning(
                  'Live Excel failed to send data for [' + liveReport.Report + ']',
                  reason
                );
                this.blotter.api.internalApi.stopLiveReport(
                  liveReport.Report,
                  ExportDestination.iPushPull
                );

                let errorMessage: string = 'Export Failed';
                if (reason) {
                  errorMessage += ': ' + reason;
                }
                errorMessage += '.  This live export has been cancelled.';
                this.blotter.api.alertApi.showAlertError('iPushPull Export Error', errorMessage);
              })
          );
        }
      });
      Promise.all(promises)
        .then(() => {
          LoggingHelper.LogAdaptableBlotterSuccess('All live report data sent');
          this.isSendingData = false;
        })
        .catch(() => {
          LoggingHelper.LogAdaptableBlotterWarning('One live Excel failed to send data');
          this.isSendingData = false;
        });
    }
  }

  public Export(
    report: Report,
    exportDestination: ExportDestination,
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
            this.blotter.api.internalApi.startLiveReport(
              report,
              pageName,
              ExportDestination.OpenfinExcel
            );
            setTimeout(() => {
              this.throttledRecomputeAndSendLiveDataEvent();
            }, 500);
          });
        break;
      case ExportDestination.iPushPull: {
        this.blotter.PushPullService.LoadPage(folder, page).then(() => {
          this.blotter.api.internalApi.startLiveReport(report, page, ExportDestination.iPushPull);
          setTimeout(() => {
            this.throttledRecomputeAndSendLiveDataEvent();
          }, 500);
        });
        break;
      }
      case ExportDestination.Glue42:
        if (this.blotter.api.partnerApi.isGlue42RunLiveData()) {
          let page: string = 'Excel'; // presume we should get this from Glue42 service in async way??
          this.blotter.api.internalApi.startLiveReport(report, page, ExportDestination.Glue42);
          setTimeout(() => {
            this.throttledRecomputeAndSendLiveDataEvent();
          }, 500);
        } else {
          let data: any[] = this.ConvertReportToArray(report);
          let gridColumns: AdaptableBlotterColumn[] = this.blotter.api.gridApi.getColumns();
          // for glue42 we need to pass in the pk values of the data also
          let primaryKeyValues: any[] = this.blotter.ReportService.GetPrimaryKeysForReport(report);
          try {
            if (data) {
              this.blotter.Glue42Service.exportData.apply(this.blotter.Glue42Service, [
                data,
                gridColumns,
                primaryKeyValues,
              ]);
            }
          } catch (error) {
            LoggingHelper.LogAdaptableBlotterError(error);
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
    let actionReturnObj = this.blotter.ReportService.ConvertReportToArray(report);
    if (actionReturnObj.Alert) {
      this.blotter.api.alertApi.displayMessageAlertPopup(actionReturnObj.Alert);
      return null;
    }
    return actionReturnObj.ActionReturn;
  }

  public scheduleReports(): void {
    // just clear all jobs and recreate - simplest thing to do...
    this.blotter.ScheduleService.ClearAllExportJobs();

    this.blotter.api.exportApi.getScheduledReports().forEach((report: Report) => {
      this.blotter.ScheduleService.AddReportSchedule(report);
    });
  }

  private getThrottleTimeFromState(): number {
    if (this.blotter.api.partnerApi.isIPushPullRunning()) {
      return this.getThrottleDurationForExportDestination(ExportDestination.iPushPull);
    }
    if (this.blotter.api.partnerApi.isGlue42Runing()) {
      return this.getThrottleDurationForExportDestination(ExportDestination.Glue42);
    }
    if (this.blotter.api.partnerApi.isOpenFinRuning()) {
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
          | undefined = this.blotter.api.partnerApi.getGlue42ThrottleTime();
        return glue42ThrottleTime ? glue42ThrottleTime : DEFAULT_LIVE_REPORT_THROTTLE_TIME;
      case ExportDestination.iPushPull:
        let iPushPullThrottleTime:
          | number
          | undefined = this.blotter.api.partnerApi.getIPushPullThrottleTime();
        return iPushPullThrottleTime ? iPushPullThrottleTime : DEFAULT_LIVE_REPORT_THROTTLE_TIME;
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
    if (ArrayExtensions.IsNotNullOrEmpty(this.blotter.api.internalApi.getLiveReports())) {
      return this.blotter.api.internalApi.getLiveReports()[0];
    }
    return undefined;
  }
}
