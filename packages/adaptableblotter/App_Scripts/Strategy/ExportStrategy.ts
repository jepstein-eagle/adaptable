import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { IExportStrategy } from './Interface/IExportStrategy';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { Helper } from '../Utilities/Helpers/Helper';
import { ReportHelper } from '../Utilities/Helpers/ReportHelper';
import { OpenfinHelper } from '../Utilities/Helpers/OpenfinHelper';
import * as _ from 'lodash';
import { ExportState, Report } from '../PredefinedConfig/RunTimeState/ExportState';
import { iPushPullHelper } from '../Utilities/Helpers/iPushPullHelper';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import {
  CELLS_SELECTED_EVENT,
  GRID_RELOADED_EVENT,
  GRID_REFRESHED_EVENT,
} from '../Utilities/Constants/GeneralConstants';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { AlertProperties } from '../PredefinedConfig/RunTimeState/AlertState';

export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
  private ExportState: ExportState;
  private isSendingData = false;
  private workAroundOpenfinExcelDataDimension: Map<string, { x: number; y: number }> = new Map();

  private throttledRecomputeAndSendLiveExcelEvent = _.throttle(
    () => this.sendNewDataToLiveExcel(),
    2000
  );

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ExportStrategyId, blotter);
    //  this.blotter.onGridReloaded().Subscribe((sender, blotter) => this.handleGridReloaded());

    this.blotter.on(GRID_RELOADED_EVENT, () => {
      this.scheduleReports();
    });

    OpenfinHelper.OnExcelDisconnected().Subscribe(() => {
      LoggingHelper.LogAdaptableBlotterInfo('Excel closed stopping all Live Excel');
      this.blotter.api.internalApi.getLiveReports().forEach(cle => {
        this.blotter.adaptableBlotterStore.TheStore.dispatch(
          SystemRedux.ReportStopLive(cle.Report, ExportDestination.OpenfinExcel)
        );
      });
    });
    OpenfinHelper.OnWorkbookDisconnected().Subscribe((sender, workbook) => {
      LoggingHelper.LogAdaptableBlotterInfo(
        'Workbook closed:' + workbook.name + ', Stopping Openfin Live Excel'
      );
      let liveReport = this.blotter.api.internalApi
        .getLiveReports()
        .find(x => x.WorkbookName == workbook.name);
      if (liveReport) {
        this.blotter.adaptableBlotterStore.TheStore.dispatch(
          SystemRedux.ReportStopLive(liveReport.Report, ExportDestination.OpenfinExcel)
        );
      }
    });
    OpenfinHelper.OnWorkbookSaved().Subscribe((sender, workbookSavedEvent) => {
      LoggingHelper.LogAdaptableBlotterInfo('Workbook Saved', workbookSavedEvent);
      let liveReport = this.blotter.api.internalApi
        .getLiveReports()
        .find(x => x.WorkbookName == workbookSavedEvent.OldName);
      this.blotter.adaptableBlotterStore.TheStore.dispatch(
        SystemRedux.ReportStopLive(liveReport.Report, ExportDestination.OpenfinExcel)
      );
      this.blotter.adaptableBlotterStore.TheStore.dispatch(
        SystemRedux.ReportStartLive(
          liveReport.Report,
          workbookSavedEvent.NewName,
          ExportDestination.OpenfinExcel
        )
      );
    });
    this.blotter.DataService.OnDataSourceChanged().Subscribe(() => {
      this.throttledRecomputeAndSendLiveExcelEvent();
    });
    this.blotter.on(GRID_REFRESHED_EVENT, () => {
      this.throttledRecomputeAndSendLiveExcelEvent();
    });

    this.blotter.on(CELLS_SELECTED_EVENT, () => {
      if (ArrayExtensions.IsNotNullOrEmpty(this.blotter.api.internalApi.getLiveReports())) {
        let liveReport = this.blotter.api.internalApi
          .getLiveReports()
          .find(x => x.Report.Name == ReportHelper.SELECTED_CELLS_REPORT);
        if (liveReport) {
          this.throttledRecomputeAndSendLiveExcelEvent();
        }
      }
    });
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ExportStrategyName,
      ComponentName: ScreenPopups.ExportPopup,
      GlyphIcon: StrategyConstants.ExportGlyph,
    });
  }

  private sendNewDataToLiveExcel() {
    //we wait for the last sendNewDataToLiveExcel to finish
    if (this.isSendingData == true) {
      this.throttledRecomputeAndSendLiveExcelEvent();
      return;
    }
    if (ArrayExtensions.IsNotNullOrEmpty(this.blotter.api.internalApi.getLiveReports())) {
      this.isSendingData = true;
      let ippStyle = this.blotter.getIPPStyle();
      let promises: Promise<any>[] = [];
      this.blotter.api.internalApi.getLiveReports().forEach(cle => {
        if (cle.ExportDestination == ExportDestination.OpenfinExcel) {
          promises.push(
            Promise.resolve()
              .then(() => {
                return new Promise<any>((resolve, reject) => {
                  //we want to erase old cells in case we are sending less data
                  //we don't want to call clearCellContent as it makes the excel sheet to blink
                  //and also is incorrrect as until we call setcells again we've lost all values in excel which might upset
                  //some macros
                  let previousDimension = this.workAroundOpenfinExcelDataDimension.get(
                    cle.Report.Uuid
                  );
                  let ReportAsArray: any[] = this.ConvertReportToArray(cle.Report);
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
                    this.workAroundOpenfinExcelDataDimension.set(cle.Report.Uuid, newDimension);
                    resolve(ReportAsArray);
                  } else {
                    reject();
                  }
                });
              })
              .then(ReportAsArray => {
                return OpenfinHelper.pushData(cle.WorkbookName, ReportAsArray);
              })
              .catch(reason => {
                LoggingHelper.LogAdaptableBlotterWarning(
                  'Live Excel failed to send data for [' + cle.Report + ']',
                  reason
                );
                this.blotter.adaptableBlotterStore.TheStore.dispatch(
                  SystemRedux.ReportStopLive(cle.Report, ExportDestination.OpenfinExcel)
                );
                this.blotter.api.alertApi.showAlertError(
                  'Live Excel Error',
                  'Failed to send data for [' + cle.Report + ']. This live export has been stopped'
                );
              })
          );
        } else if (cle.ExportDestination == ExportDestination.iPushPull) {
          //we there is no logic related to the Report so we want to get it only one time
          if (!ippStyle) {
            ippStyle = this.blotter.getIPPStyle();
          }
          promises.push(
            Promise.resolve()
              .then(() => {
                return new Promise<any>((resolve, reject) => {
                  let ReportAsArray: any[] = this.ConvertReportToArray(cle.Report);
                  if (ReportAsArray) {
                    resolve(ReportAsArray);
                  } else {
                    reject();
                  }
                });
              })
              .then(ReportAsArray => {
                return iPushPullHelper.pushData(cle.WorkbookName, ReportAsArray, ippStyle);
              })
              .catch(reason => {
                LoggingHelper.LogAdaptableBlotterWarning(
                  'Live Excel failed to send data for [' + cle.Report + ']',
                  reason
                );
                this.blotter.adaptableBlotterStore.TheStore.dispatch(
                  SystemRedux.ReportStopLive(cle.Report, ExportDestination.iPushPull)
                );
                this.blotter.api.alertApi.showAlertError(
                  'Live Excel Error',
                  'Failed to send data for [' + cle.Report + ']. This live export has been stopped'
                );
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
    folder?: string,
    page?: string
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
          .then(workbookName => {
            this.blotter.adaptableBlotterStore.TheStore.dispatch(
              SystemRedux.ReportStartLive(report, workbookName, ExportDestination.OpenfinExcel)
            );
            setTimeout(() => {
              this.throttledRecomputeAndSendLiveExcelEvent();
            }, 500);
          });
        break;
      case ExportDestination.iPushPull:
        iPushPullHelper.LoadPage(folder, page).then(() => {
          this.blotter.api.internalApi.startLiveReport(report, page, ExportDestination.iPushPull);
          setTimeout(() => {
            this.throttledRecomputeAndSendLiveExcelEvent();
          }, 500);
        });
        break;
      case ExportDestination.Glue42:
        let data: any[] = this.ConvertReportToArray(report);

        let gridColumns: AdaptableBlotterColumn[] = this.blotter.adaptableBlotterStore.TheStore.getState()
          .Grid.Columns;

        try {
          if (data) {
            this.blotter.Glue42Service.exportData.apply(this.blotter.Glue42Service, [
              data,
              gridColumns,
              this.blotter,
            ]);
          }
        } catch (error) {
          console.log(error);
        }

        break;
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
    let actionReturnObj = ReportHelper.ConvertReportToArray(this.blotter, report);
    if (actionReturnObj.Alert) {
      // assume that the MessageType is error - if not then refactor
      this.blotter.adaptableBlotterStore.TheStore.dispatch(
        PopupRedux.PopupShowAlert(actionReturnObj.Alert)
      );
      return null;
    }
    return actionReturnObj.ActionReturn;
  }

  public scheduleReports(): void {
    // just clear all jobs and recreate - simplest thing to do...
    this.blotter.ScheduleService.ClearAllExportJobs();

    this.blotter.adaptableBlotterStore.TheStore.getState().Export.Reports.forEach(
      (report: Report) => {
        if (report.AutoExport) {
          this.blotter.ScheduleService.AddReportSchedule(report);
        }
      }
    );
  }
}
