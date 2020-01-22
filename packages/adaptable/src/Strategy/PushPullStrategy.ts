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
} from '../Utilities/Constants/GeneralConstants';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { IPushPullStrategy } from './Interface/IPushPullStrategy';
import { IPushPullReport } from '../PredefinedConfig/IPushPullState';
import { DataChangedInfo } from '../AdaptableOptions/CommonObjects/DataChangedInfo';

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

    // if a piece of data has updated then update any live reports except cell or row selected
    // currently we DONT send deltas or even check if the updated cell is in the current report  - we should
    // we simply send everything to ipushpull every time any cell ticks....
    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      if (this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
        let currentLiveIPushPullReport:
          | IPushPullReport
          | undefined = this.adaptable.api.iPushPullApi.getCurrentLiveIPushPullReport();
        if (
          currentLiveIPushPullReport &&
          currentLiveIPushPullReport.ReportName !== SELECTED_CELLS_REPORT &&
          currentLiveIPushPullReport.ReportName !== SELECTED_ROWS_REPORT
        ) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
    // if the grid has refreshed then update all live reports
    this.adaptable._on('GridRefreshed', () => {
      if (this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
        this.throttledRecomputeAndSendLiveDataEvent();
      }
    });
    // if the grid filters have changed then update any live reports except cell or row selected
    this.adaptable._on('GridFiltered', () => {
      // Rerun all reports except selected cells / rows when filter changes
      if (this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
        let currentLiveIPushPullReport:
          | IPushPullReport
          | undefined = this.adaptable.api.iPushPullApi.getCurrentLiveIPushPullReport();
        if (
          currentLiveIPushPullReport &&
          currentLiveIPushPullReport.ReportName !== SELECTED_CELLS_REPORT &&
          currentLiveIPushPullReport.ReportName !== SELECTED_ROWS_REPORT
        ) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
    // if grid selection has changed and the iPushPull Live report is 'Selected Cells' or 'Selected Rows' then send updated data
    this.adaptable.api.eventApi.on('SelectionChanged', () => {
      if (this.adaptable.api.iPushPullApi.isIPushPullLiveDataRunning()) {
        let currentLiveIPushPullReport:
          | IPushPullReport
          | undefined = this.adaptable.api.iPushPullApi.getCurrentLiveIPushPullReport();
        if (
          currentLiveIPushPullReport &&
          (currentLiveIPushPullReport.ReportName === SELECTED_CELLS_REPORT ||
            currentLiveIPushPullReport.ReportName === SELECTED_ROWS_REPORT)
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
