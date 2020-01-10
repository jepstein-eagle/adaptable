import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import * as _ from 'lodash';
import { Report } from '../PredefinedConfig/ExportState';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import {
  SELECTED_CELLS_REPORT,
  DEFAULT_LIVE_REPORT_THROTTLE_TIME,
} from '../Utilities/Constants/GeneralConstants';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { LiveReport } from '../Api/Events/LiveReportUpdated';
import { DataChangedInfo } from '../AdaptableOptions/CommonObjects/DataChangedInfo';
import { IPushPullStrategy } from './Interface/IPushPullStrategy';
import { IPushPullReport } from '../PredefinedConfig/IPushPullState';

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

    this.adaptable._on('GridReloaded', () => {
      this.scheduleIPushPullReports();
    });

    // if a piece of data has updated then update any live reports
    this.adaptable.DataService.on('DataChanged', () => {
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
      Label: StrategyConstants.IPushPullStrategyFriendlyName,
      ComponentName: ScreenPopups.ExportPopup,
      Icon: StrategyConstants.IPushPullGlyph,
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
              return this.adaptable.PushPullService.pushData(liveReport.PageName, reportAsArray);
            })
            .catch(reason => {
              LoggingHelper.LogAdaptableWarning(
                'Live Excel failed to send data for [' + liveReport.Report + ']',
                reason
              );
              this.adaptable.api.internalApi.stopLiveReport(
                liveReport.Report,
                ExportDestination.iPushPull
              );

              let errorMessage: string = 'Export Failed';
              if (reason) {
                errorMessage += ': ' + reason;
              }
              errorMessage += '.  This live export has been cancelled.';
              this.adaptable.api.alertApi.showAlertError('iPushPull Export Error', errorMessage);
            })
        );
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

  public export(iPushPullReport: IPushPullReport, isLiveReport: boolean): void {
    if (isLiveReport) {
      this.adaptable.PushPullService.loadPage(iPushPullReport.Folder, iPushPullReport.Page).then(
        () => {
          this.adaptable.api.internalApi.startLiveReport(
            iPushPullReport.Report,
            iPushPullReport.Page,
            ExportDestination.iPushPull
          );
          setTimeout(() => {
            this.throttledRecomputeAndSendLiveDataEvent();
          }, 500);
        }
      );
    } else {
      this.adaptable.PushPullService.loadPage(iPushPullReport.Folder, iPushPullReport.Page).then(
        () => {
          let reportAsArray: any[] = this.ConvertReportToArray(iPushPullReport.Report);
          if (reportAsArray) {
            this.adaptable.PushPullService.pushData(iPushPullReport.Page, reportAsArray);
          }
        }
      );
    }
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

  public scheduleIPushPullReports(): void {
    // just clear all jobs and recreate - simplest thing to do...
    this.adaptable.ScheduleService.ClearAllIPushPullJobs();
    this.adaptable.api.iPushPullApi
      .getScheduledReports()
      .forEach((iPushPullReport: IPushPullReport) => {
        this.adaptable.ScheduleService.AddIPushPullReportSchedule(iPushPullReport);
      });
  }

  private getThrottleTimeFromState(): number {
    if (this.adaptable.api.iPushPullApi.isIPushPullAvailable()) {
      return this.getThrottleDurationForExportDestination();
    }
    return DEFAULT_LIVE_REPORT_THROTTLE_TIME;
  }

  private getThrottleDurationForExportDestination(): number {
    let iPushPullThrottleTime:
      | number
      | undefined = this.adaptable.api.iPushPullApi.getIPushPullThrottleTime();
    return iPushPullThrottleTime ? iPushPullThrottleTime : DEFAULT_LIVE_REPORT_THROTTLE_TIME;
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
