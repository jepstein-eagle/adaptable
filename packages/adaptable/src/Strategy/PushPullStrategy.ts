import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import * as _ from 'lodash';
import { Report } from '../PredefinedConfig/ExportState';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import {
  SELECTED_CELLS_REPORT,
  DEFAULT_LIVE_REPORT_THROTTLE_TIME,
  SELECTED_ROWS_REPORT,
  VISIBLE_DATA_REPORT,
} from '../Utilities/Constants/GeneralConstants';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { IPushPullStrategy } from './Interface/IPushPullStrategy';
import { IPushPullReport } from '../PredefinedConfig/IPushPullState';
import { DataChangedInfo } from '../AdaptableOptions/CommonObjects/DataChangedInfo';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
import { GridRow } from '../Utilities/Interface/Selection/GridRow';

export class PushPullStrategy extends AdaptableStrategyBase implements IPushPullStrategy {
  private isSendingData: boolean = false;

  private throttledRecomputeAndSendLiveDataEvent: (() => void) & _.Cancelable;

  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.IPushPullStrategyId, adaptable);

    this.adaptable.api.eventApi.on('AdaptableReady', () => {
      setTimeout(() => {
        this.throttledRecomputeAndSendLiveDataEvent = _.throttle(
          () => this.sendNewLiveData(),
          this.getThrottleTimeFromState()
        );
      }, 1000);
    });

    // if a piece of data has updated then update any live reports
    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      if (this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
        let currentLiveIPushPullReport:
          | IPushPullReport
          | undefined = this.adaptable.api.iPushPullApi.getCurrentLiveIPushPullReport();
        if (currentLiveIPushPullReport) {
          // reset cell or row selection
          if (currentLiveIPushPullReport.ReportName === SELECTED_CELLS_REPORT) {
            let selectedCellInfo: SelectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();
            let matchingCell: GridCell = selectedCellInfo.GridCells.find(
              (gc: GridCell) =>
                gc.primaryKeyValue == dataChangedInfo.PrimaryKeyValue &&
                gc.columnId == dataChangedInfo.ColumnId
            );
            if (matchingCell) {
              this.adaptable.setSelectedCells(false);
              this.throttledRecomputeAndSendLiveDataEvent();
            }
          } else if (currentLiveIPushPullReport.ReportName === SELECTED_ROWS_REPORT) {
            let selectedRowInfo: SelectedRowInfo = this.adaptable.api.gridApi.getSelectedRowInfo();
            let matchingRow: GridRow = selectedRowInfo.GridRows.find(
              (gr: GridRow) => gr.primaryKeyValue == dataChangedInfo.PrimaryKeyValue
            );
            if (matchingRow) {
              this.adaptable.setSelectedRows(false);
              this.throttledRecomputeAndSendLiveDataEvent();
            }
          } else if (currentLiveIPushPullReport.ReportName === VISIBLE_DATA_REPORT) {
            // would be nice if we could do something here but not sure we can...
            this.throttledRecomputeAndSendLiveDataEvent();
          } else {
            // again would be preferable only to send deltas or to check but for now not sure what we can do
            this.throttledRecomputeAndSendLiveDataEvent();
          }
        }
      }
    });
    // if the grid has refreshed - usually after a filter - then update any live reports
    this.adaptable._on('GridRefreshed', () => {
      if (this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
        this.throttledRecomputeAndSendLiveDataEvent();
      }
    });
    this.adaptable._on('GridFiltered', () => {
      if (this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
        let currentLiveIPushPullReport:
          | IPushPullReport
          | undefined = this.adaptable.api.iPushPullApi.getCurrentLiveIPushPullReport();
        if (currentLiveIPushPullReport) {
          // reset cell or row selection if grid has been filtered but dont send as the event will fire
          if (currentLiveIPushPullReport.ReportName === SELECTED_CELLS_REPORT) {
            this.adaptable.setSelectedCells(true);
          } else if (currentLiveIPushPullReport.ReportName === SELECTED_ROWS_REPORT) {
            this.adaptable.setSelectedRows(true);
          } else {
            // on any other filters lets just resend report
            this.throttledRecomputeAndSendLiveDataEvent();
          }
        }
      }
    });
    // if cell selection has changed and the iPushPull Live report is 'Selected Cells' or 'Selected Rows' then send updated data
    this.adaptable.api.eventApi.on('SelectionChanged', () => {
      if (this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
        let liveIPushPullReport: IPushPullReport = this.adaptable.api.iPushPullApi.getCurrentLiveIPushPullReport();
        if (
          liveIPushPullReport &&
          (liveIPushPullReport.ReportName === SELECTED_CELLS_REPORT ||
            liveIPushPullReport.ReportName === SELECTED_ROWS_REPORT)
        ) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.adaptable.api.iPushPullApi.isIPushPullAvailable()) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.IPushPullStrategyFriendlyName,
        ComponentName: ScreenPopups.ExportPopup,
        Icon: StrategyConstants.IPushPullGlyph,
      });
    }
  }

  private sendNewLiveData() {
    //we wait for the last sendNewLiveData to finish
    if (this.isSendingData == true) {
      this.throttledRecomputeAndSendLiveDataEvent();
      return;
    }
    let currentLiveIPushPullReport:
      | IPushPullReport
      | undefined = this.adaptable.api.iPushPullApi.getCurrentLiveIPushPullReport();
    if (currentLiveIPushPullReport) {
      this.isSendingData = true;
      //   let promises: Promise<any>[] = [];
      let report: Report = this.adaptable.api.exportApi.getReportByName(
        currentLiveIPushPullReport.ReportName
      );

      Promise.resolve()
        .then(() => {
          return new Promise<any>((resolve, reject) => {
            let reportAsArray: any[] = this.ConvertReportToArray(report);
            if (reportAsArray) {
              resolve(reportAsArray);
            } else {
              reject('no data in the report');
            }
          });
        })
        .then(reportAsArray => {
          return this.adaptable.PushPullService.pushData(
            currentLiveIPushPullReport.Page,
            reportAsArray
          );
        })
        .then(() => {
          return this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
            'iPushPull',
            'LiveDataUpdated',
            currentLiveIPushPullReport
          );
        })
        .catch(reason => {
          LoggingHelper.LogAdaptableWarning(
            'Failed to send data to iPushPull for [' + currentLiveIPushPullReport.ReportName + ']',
            reason
          );
          this.adaptable.api.iPushPullApi.stopLiveData();

          let errorMessage: string = 'Export Failed';
          if (reason) {
            errorMessage += ': ' + reason;
          }
          errorMessage += '.  This live export has been cancelled.';
          this.adaptable.api.alertApi.showAlertError('iPushPull Export Error', errorMessage);
        });
      Promise.resolve()
        .then(() => {
          LoggingHelper.LogAdaptableSuccess('All live report data sent');
          this.isSendingData = false;
        })
        .catch(() => {
          LoggingHelper.LogAdaptableWarning('Failed to send data');
          this.isSendingData = false;
        });
    }
  }

  public sendSnapshot(iPushPullReport: IPushPullReport): void {
    this.adaptable.PushPullService.loadPage(iPushPullReport.Folder, iPushPullReport.Page).then(
      () => {
        // need to get the report from somewhere
        let report: Report = this.adaptable.api.exportApi.getReportByName(
          iPushPullReport.ReportName
        );
        if (report) {
          let reportAsArray: any[] = this.ConvertReportToArray(report);
          if (reportAsArray) {
            this.adaptable.PushPullService.pushData(iPushPullReport.Page, reportAsArray);
          }
        }
      }
    );
  }

  public startLiveData(iPushPullReport: IPushPullReport): void {
    this.adaptable.PushPullService.loadPage(iPushPullReport.Folder, iPushPullReport.Page).then(
      () => {
        this.adaptable.api.iPushPullApi.startLiveData(iPushPullReport);
        setTimeout(() => {
          this.throttledRecomputeAndSendLiveDataEvent();
        }, 500);
      }
    );
  }

  // Converts a Report into an array of array - first array is the column names and subsequent arrays are the values
  // Should probably use same one as Export
  private ConvertReportToArray(report: Report): any[] {
    let actionReturnObj = this.adaptable.ReportService.ConvertReportToArray(report);
    if (actionReturnObj.Alert) {
      this.adaptable.api.alertApi.displayMessageAlertPopup(actionReturnObj.Alert);
      return null;
    }
    return actionReturnObj.ActionReturn;
  }

  private getThrottleTimeFromState(): number {
    let iPushPullThrottleTime: number | undefined;
    if (this.adaptable.api.iPushPullApi.isIPushPullRunning()) {
      iPushPullThrottleTime = this.adaptable.api.iPushPullApi.getIPushPullThrottleTime();
    }
    return iPushPullThrottleTime ? iPushPullThrottleTime : DEFAULT_LIVE_REPORT_THROTTLE_TIME;
  }
}
