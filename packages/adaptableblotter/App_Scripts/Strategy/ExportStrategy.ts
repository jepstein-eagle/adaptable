import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { IExportStrategy } from './Interface/IExportStrategy';
import { ILiveReport } from '../Utilities/Interface/Reports/ILiveReport';
import { ExportDestination, StateChangedTrigger } from '../Utilities/Enums';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { Helper } from '../Utilities/Helpers/Helper';
import { ReportHelper } from '../Utilities/Helpers/ReportHelper';
import { OpenfinHelper } from '../Utilities/Helpers/OpenfinHelper';
import * as _ from 'lodash';
import { ExportState } from '../Redux/ActionsReducers/Interface/IState';
import { iPushPullHelper } from '../Utilities/Helpers/iPushPullHelper';
import { IReport, IAutoExport } from '../Utilities/Interface/BlotterObjects/IReport';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { Glue42Helper } from '../Utilities/Helpers/Glue42Helper';
import { IColumn } from '../Utilities/Interface/IColumn';

export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
  private ExportState: ExportState;
  private CurrentLiveReports: ILiveReport[];
  private isSendingData = false;
  private workAroundOpenfinExcelDataDimension: Map<string, { x: number; y: number }> = new Map();

  private throttledRecomputeAndSendLiveExcelEvent = _.throttle(
    () => this.sendNewDataToLiveExcel(),
    2000
  );

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ExportStrategyId, blotter);
    this.blotter.onGridReloaded().Subscribe((sender, blotter) => this.handleGridReloaded(blotter));

    OpenfinHelper.OnExcelDisconnected().Subscribe(() => {
      LoggingHelper.LogAdaptableBlotterInfo('Excel closed stopping all Live Excel');
      this.CurrentLiveReports.forEach(cle => {
        this.blotter.adaptableBlotterStore.TheStore.dispatch(
          SystemRedux.ReportStopLive(cle.Report, ExportDestination.OpenfinExcel)
        );
      });
    });
    OpenfinHelper.OnWorkbookDisconnected().Subscribe((sender, workbook) => {
      LoggingHelper.LogAdaptableBlotterInfo(
        'Workbook closed:' + workbook.name + ', Stopping Openfin Live Excel'
      );
      let liveReport = this.CurrentLiveReports.find(x => x.WorkbookName == workbook.name);
      if (liveReport) {
        this.blotter.adaptableBlotterStore.TheStore.dispatch(
          SystemRedux.ReportStopLive(liveReport.Report, ExportDestination.OpenfinExcel)
        );
      }
    });
    OpenfinHelper.OnWorkbookSaved().Subscribe((sender, workbookSavedEvent) => {
      LoggingHelper.LogAdaptableBlotterInfo('Workbook Saved', workbookSavedEvent);
      let liveReport = this.CurrentLiveReports.find(
        x => x.WorkbookName == workbookSavedEvent.OldName
      );
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
    this.blotter.onRefresh().Subscribe(() => {
      this.throttledRecomputeAndSendLiveExcelEvent();
    });
    this.blotter.onSelectedCellsChanged().Subscribe(() => {
      if (ArrayExtensions.IsNotNullOrEmpty(this.CurrentLiveReports)) {
        let liveReport = this.CurrentLiveReports.find(
          x => x.Report == ReportHelper.SELECTED_CELLS_REPORT
        );
        if (liveReport) {
          this.throttledRecomputeAndSendLiveExcelEvent();
        }
      }
    });
  }

  private handleGridReloaded(blotter: IAdaptableBlotter) {
    this.scheduleReports();
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.ExportStrategyName,
      ScreenPopups.ExportPopup,
      StrategyConstants.ExportGlyph
    );
  }

  private sendNewDataToLiveExcel() {
    //we wait for the last sendNewDataToLiveExcel to finish
    if (this.isSendingData == true) {
      this.throttledRecomputeAndSendLiveExcelEvent();
      return;
    }
    if (ArrayExtensions.IsNotNullOrEmpty(this.CurrentLiveReports)) {
      this.isSendingData = true;
      let ippStyle = this.blotter.getIPPStyle();
      let promises: Promise<any>[] = [];
      this.CurrentLiveReports.forEach(cle => {
        if (cle.ExportDestination == ExportDestination.OpenfinExcel) {
          promises.push(
            Promise.resolve()
              .then(() => {
                return new Promise<any>((resolve, reject) => {
                  //we want to erase old cells in case we are sending less data
                  //we don't want to call clearCellContent as it makes the excel sheet to blink
                  //and also is incorrrect as until we call setcells again we've lost all values in excel which might upset
                  //some macros
                  let previousDimension = this.workAroundOpenfinExcelDataDimension.get(cle.Report);
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
                    this.workAroundOpenfinExcelDataDimension.set(cle.Report, newDimension);
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
                  'Failed to send data for [' + cle.Report + ']. This live export has been stopped',
                  true
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
                  'Failed to send data for [' + cle.Report + ']. This live export has been stopped',
                  true
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
    ReportName: string,
    exportDestination: ExportDestination,
    folder?: string,
    page?: string
  ): void {
    switch (exportDestination) {
      case ExportDestination.Clipboard:
        this.copyToClipboard(ReportName);
        break;
      case ExportDestination.CSV:
        this.convertReportToCsv(ReportName);
        break;
      case ExportDestination.OpenfinExcel:
        OpenfinHelper.initOpenFinExcel() //.then((workbook) => OpenfinHelper.addReportWorkSheet(workbook, ReportName))
          .then(workbookName => {
            this.blotter.adaptableBlotterStore.TheStore.dispatch(
              SystemRedux.ReportStartLive(ReportName, workbookName, ExportDestination.OpenfinExcel)
            );
            setTimeout(() => {
              this.throttledRecomputeAndSendLiveExcelEvent();
            }, 500);
          });
        break;
      case ExportDestination.iPushPull:
        iPushPullHelper.LoadPage(folder, page).then(() => {
          this.blotter.api.internalApi.ReportStartLive(
            ReportName,
            page,
            ExportDestination.iPushPull
          );
          setTimeout(() => {
            this.throttledRecomputeAndSendLiveExcelEvent();
          }, 500);
        });
        break;
      case ExportDestination.Glue42:
        let data: any[] = this.ConvertReportToArray(ReportName);
        let gridColumns: IColumn[] = this.blotter.adaptableBlotterStore.TheStore.getState().Grid
          .Columns;
        Glue42Helper.exportData(data, gridColumns, this.blotter);
        break;
    }
  }

  private convertReportToCsv(ReportName: string): void {
    let csvContent: string = this.createCSVContent(ReportName);
    if (csvContent) {
      let csvFileName: string = this.getReport(ReportName).Name + '.csv';
      Helper.createDownloadedFile(csvContent, csvFileName, 'text/csv;encoding:utf-8');
    }
  }

  private copyToClipboard(ReportName: string) {
    let csvContent: string = this.createTabularContent(ReportName);
    if (csvContent) {
      Helper.copyToClipboard(csvContent);
    }
  }

  private createCSVContent(ReportName: string): string {
    let ReportAsArray: any[] = this.ConvertReportToArray(ReportName);
    if (ReportAsArray) {
      return Helper.convertArrayToCsv(ReportAsArray, ',');
    }
    return null;
  }

  private createTabularContent(ReportName: string): string {
    let ReportAsArray: any[] = this.ConvertReportToArray(ReportName);
    if (ReportAsArray) {
      return Helper.convertArrayToCsv(ReportAsArray, '\t');
    }
    return null;
  }

  // Converts a Report into an array of array - first array is the column names and subsequent arrays are the values
  private ConvertReportToArray(ReportName: string): any[] {
    let ReportToConvert: IReport = this.getReport(ReportName);
    let actionReturnObj = ReportHelper.ConvertReportToArray(this.blotter, ReportToConvert);
    if (actionReturnObj.Alert) {
      // assume that the MessageType is error - if not then refactor
      this.blotter.adaptableBlotterStore.TheStore.dispatch(
        PopupRedux.PopupShowAlert(actionReturnObj.Alert)
      );
      return null;
    }
    return actionReturnObj.ActionReturn;
  }

  /*
    private getColsForReport(Report: IReport): IColumn[] {
        let allCols: IColumn[] = this.blotter.adaptableBlotterStore.TheStore.getState().Grid.Columns;
        return (Report.ReportColumnScope == ReportColumnScope.AllColumns) ?
            allCols :
            Report.Columns.map(c => allCols.find(col => col.ColumnId == c));
    }
*/

  private getReport(ReportName: string): IReport {
    return this.blotter.adaptableBlotterStore.TheStore.getState()
      .System.SystemReports.concat(this.ExportState.Reports)
      .find(r => r.Name == ReportName);
  }

  protected InitState() {
    if (this.ExportState != this.blotter.api.exportApi.getExportState()) {
      this.scheduleReports();
      this.ExportState = this.blotter.api.exportApi.getExportState();

      if (this.blotter.isInitialised) {
        this.publishStateChanged(StateChangedTrigger.Export, this.ExportState);
      }
    }

    if (this.CurrentLiveReports != this.blotter.api.internalApi.getLiveReports()) {
      this.CurrentLiveReports = this.blotter.api.internalApi.getLiveReports();
    }
  }

  private scheduleReports(): void {
    // just clear all jobs and recreate - simplest thing to do...
    this.blotter.ScheduleService.ClearAllExportJobs();

    this.blotter.adaptableBlotterStore.TheStore.getState().Export.Reports.forEach(
      (report: IReport) => {
        if (report.AutoExport) {
          this.blotter.ScheduleService.AddReportSchedule(report);
        }
      }
    );
  }
}
