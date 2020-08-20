import { AdaptableStrategyBase } from '@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import { IGlue42Strategy } from './Interface/IGlue42Strategy';
import { Glue42Report } from '@adaptabletools/adaptable/src/PredefinedConfig/Glue42State';

import {
  IAdaptable,
  DataChangedInfo,
  AdaptableMenuItem,
  Report,
  AdaptableColumn,
} from '@adaptabletools/adaptable/types';
import * as _ from 'lodash';
import {
  SELECTED_CELLS_REPORT,
  SELECTED_ROWS_REPORT,
  DEFAULT_LIVE_REPORT_THROTTLE_TIME,
} from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import LoggingHelper from '@adaptabletools/adaptable/src/Utilities/Helpers/LoggingHelper';
import { Glue42Service } from '../Utilities/Services/Glue42Service';
import { Glue42Api } from '@adaptabletools/adaptable/src/Api/Glue42Api';

export class Glue42Strategy extends AdaptableStrategyBase implements IGlue42Strategy {
  private isSendingData: boolean = false;
  private glue42Service: Glue42Service | null = null;

  private throttledRecomputeAndSendLiveDataEvent: (() => void) & _.Cancelable;

  public getGlue42Api(): Glue42Api {
    return this.adaptable.api.pluginsApi.getPluginApi('glue42');
  }
  public setStrategyEntitlement(): void {
    const glue42Api = this.getGlue42Api();
    if (!glue42Api) {
      this.AccessLevel = 'Hidden';
      return;
    }

    if (!glue42Api.isGlue42Available()) {
      this.AccessLevel = 'Hidden';
    } else {
      this.AccessLevel = this.adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
        this.Id
      );
    }
  }

  public isStrategyAvailable(): boolean {
    return true;
    if (this.adaptable.api.entitlementsApi.isFunctionHiddenEntitlement(this.Id)) {
      return false;
    }
    const glue42Api = this.getGlue42Api();
    if (!glue42Api) {
      return false;
    }
    return glue42Api.isGlue42Available();
  }

  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.Glue42StrategyId,
      StrategyConstants.Glue42StrategyFriendlyName,
      StrategyConstants.Glue42Glyph,
      ScreenPopups.Glue42Popup,
      adaptable
    );

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
    // we simply send everything to iGlue42 every time any cell ticks....
    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      const glue42Api = this.getGlue42Api();
      if (!glue42Api) {
        return;
      }
      if (glue42Api.isGlue42Running()) {
        let currentLiveIGlue42Report:
          | Glue42Report
          | undefined = glue42Api.getCurrentLiveGlue42Report();
        if (
          currentLiveIGlue42Report &&
          currentLiveIGlue42Report.ReportName !== SELECTED_CELLS_REPORT &&
          currentLiveIGlue42Report.ReportName !== SELECTED_ROWS_REPORT
        ) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
    // if the grid has refreshed then update all live reports
    this.adaptable._on('GridRefreshed', () => {
      const glue42Api = this.getGlue42Api();
      if (!glue42Api) {
        return;
      }
      if (glue42Api.isGlue42Running()) {
        //   this.throttledRecomputeAndSendLiveDataEvent();
      }
    });
    // if the grid filters have changed then update any live reports except cell or row selected
    this.adaptable._on('GridFiltered', () => {
      const glue42Api = this.getGlue42Api();
      if (!glue42Api) {
        return;
      }
      // Rerun all reports except selected cells / rows when filter changes
      if (glue42Api.isGlue42Running()) {
        let currentLiveIGlue42Report:
          | Glue42Report
          | undefined = glue42Api.getCurrentLiveGlue42Report();
        if (
          currentLiveIGlue42Report &&
          currentLiveIGlue42Report.ReportName !== SELECTED_CELLS_REPORT &&
          currentLiveIGlue42Report.ReportName !== SELECTED_ROWS_REPORT
        ) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
    // if grid selection has changed and the iGlue42 Live report is 'Selected Cells' or 'Selected Rows' then send updated data
    this.adaptable.api.eventApi.on('SelectionChanged', () => {
      const glue42Api = this.getGlue42Api();
      if (!glue42Api) {
        return;
      }
      if (glue42Api.isGlue42Running()) {
        let currentLiveIGlue42Report:
          | Glue42Report
          | undefined = glue42Api.getCurrentLiveGlue42Report();
        if (
          currentLiveIGlue42Report &&
          (currentLiveIGlue42Report.ReportName === SELECTED_CELLS_REPORT ||
            currentLiveIGlue42Report.ReportName === SELECTED_ROWS_REPORT)
        ) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
  }

  private sendNewLiveData() {
    //we wait for the last sendNewLiveData to finish
    if (this.isSendingData == true) {
      this.throttledRecomputeAndSendLiveDataEvent();
      return;
    }
    const glue42Api = this.getGlue42Api();
    if (!glue42Api) {
      return;
    }
    let currentLiveIGlue42Report: Glue42Report | undefined = glue42Api.getCurrentLiveGlue42Report();
    if (currentLiveIGlue42Report) {
      this.isSendingData = true;
      let report: Report = this.adaptable.api.exportApi.getReportByName(
        currentLiveIGlue42Report.ReportName
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
          return [];
          // this.adaptable.Glue42Service.pushData(
          //  currentLiveIGlue42Report.Page,
          //  reportAsArray
          //);
        })
        .then(() => {
          return this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
            'Glue42',
            'LiveDataUpdated',
            currentLiveIGlue42Report
          );
        })
        .catch(reason => {
          LoggingHelper.LogAdaptableWarning(
            'Failed to send data to iGlue42 for [' + currentLiveIGlue42Report.ReportName + ']',
            reason
          );
          //      this.adaptable.api.glue42Api.stopLiveData();

          let errorMessage: string = 'Export Failed';
          if (reason) {
            errorMessage += ': ' + reason;
          }
          errorMessage += '.  This live export has been cancelled.';
          this.adaptable.api.alertApi.showAlertError('iGlue42 Export Error', errorMessage);
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

  private getGlue42Service(): Glue42Service {
    if (!this.glue42Service) {
      this.glue42Service = this.adaptable.getPluginProperty('glue42', 'service') || null;
    }

    return this.glue42Service;
  }

  public sendSnapshot(glue42Report: Glue42Report): void {
    let report: Report = this.adaptable.api.exportApi.getReportByName(glue42Report.ReportName);

    if (report) {
      let data: any[] = this.ConvertReportToArray(report);
      let gridColumns: AdaptableColumn[] = this.adaptable.api.columnApi.getColumns();
      // for glue42 we need to pass in the pk values of the data also
      let primaryKeyValues: any[] = this.adaptable.ReportService.GetPrimaryKeysForReport(report);
      try {
        if (data) {
          this.getGlue42Service().exportData(data, gridColumns, primaryKeyValues);
        }
      } catch (error) {
        LoggingHelper.LogAdaptableError(error);
      }
    }
  }

  public startLiveData(glue42Report: Glue42Report): void {
    let report: Report = this.adaptable.api.exportApi.getReportByName(glue42Report.ReportName);
    if (report) {
      const glue42Api = this.getGlue42Api();
      if (!glue42Api) {
        return;
      }
      // let page: string = 'Excel'; // presume we should get this from Glue42 service in async way??
      let reportData: any[] = this.ConvertReportToArray(report);
      this.getGlue42Service()
        .openSheet(reportData)
        .then(() => {
          glue42Api.startLiveData(glue42Report);
          setTimeout(() => {
            this.throttledRecomputeAndSendLiveDataEvent();
          }, 500);
        });
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

  private getThrottleTimeFromState(): number {
    let iGlue42ThrottleTime: number | undefined;
    const glue42Api = this.getGlue42Api();
    if (!glue42Api) {
      return 0;
    }
    return DEFAULT_LIVE_REPORT_THROTTLE_TIME;

    //  if (glue42Api.isGlue42Running()) {
    //    iGlue42ThrottleTime = glue42Api.getGlue42ThrottleTime();
    //  }
    //  return iGlue42ThrottleTime ? iGlue42ThrottleTime : DEFAULT_LIVE_REPORT_THROTTLE_TIME;
  }
}
