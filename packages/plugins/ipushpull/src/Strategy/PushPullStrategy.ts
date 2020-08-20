import { AdaptableStrategyBase } from '@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import * as _ from 'lodash';
import { Report } from '@adaptabletools/adaptable/src/PredefinedConfig/ExportState';
import { LoggingHelper } from '@adaptabletools/adaptable/src/Utilities/Helpers/LoggingHelper';
import {
  SELECTED_CELLS_REPORT,
  DEFAULT_LIVE_REPORT_THROTTLE_TIME,
  SELECTED_ROWS_REPORT,
} from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import { AdaptableMenuItem } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Menu';
import { IPushPullStrategy } from './Interface/IPushPullStrategy';
import { IPushPullReport } from '@adaptabletools/adaptable/src/PredefinedConfig/IPushPullState';
import { DataChangedInfo } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/DataChangedInfo';
import { IPushPullApi } from '@adaptabletools/adaptable/src/Api/IPushPullApi';

import { IPushPullService } from '../Utilities/Services/Interface/IPushPullService';

export class PushPullStrategy extends AdaptableStrategyBase implements IPushPullStrategy {
  private isSendingData: boolean = false;
  private ippService: IPushPullService | null = null;

  private throttledRecomputeAndSendLiveDataEvent: (() => void) & _.Cancelable;

  public setStrategyEntitlement(): void {
    // TODO
    if (!this.adaptable.api.pluginsApi.getPluginApi('ipushpull').isIPushPullAvailable()) {
      this.AccessLevel = 'Hidden';
    } else {
      this.AccessLevel = this.adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
        this.Id
      );
    }
  }

  public getIPPApi(): IPushPullApi {
    return this.adaptable.api.pluginsApi.getPluginApi('ipushpull');
  }

  public isStrategyAvailable(): boolean {
    if (this.adaptable.api.entitlementsApi.isFunctionHiddenEntitlement(this.Id)) {
      return false;
    }
    return true;
  }

  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.IPushPullStrategyId,
      StrategyConstants.IPushPullStrategyFriendlyName,
      StrategyConstants.IPushPullGlyph,
      ScreenPopups.IPushPullPopup,
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
    // we simply send everything to ipushpull every time any cell ticks....
    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      if (this.getIPPApi().isIPushPullLiveDataRunning()) {
        let currentLiveIPushPullReport:
          | IPushPullReport
          | undefined = this.getIPPApi().getCurrentLiveIPushPullReport();
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
      if (this.getIPPApi().isIPushPullLiveDataRunning()) {
        this.throttledRecomputeAndSendLiveDataEvent();
      }
    });
    // if the grid filters have changed then update any live reports except cell or row selected
    this.adaptable._on('GridFiltered', () => {
      // Rerun all reports except selected cells / rows when filter changes
      if (this.getIPPApi().isIPushPullLiveDataRunning()) {
        let currentLiveIPushPullReport:
          | IPushPullReport
          | undefined = this.getIPPApi().getCurrentLiveIPushPullReport();
        if (
          currentLiveIPushPullReport &&
          currentLiveIPushPullReport.ReportName !== SELECTED_CELLS_REPORT &&
          currentLiveIPushPullReport.ReportName !== SELECTED_ROWS_REPORT
        ) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
    // if grid selection has changed and the ipushpull Live report is 'Selected Cells' or 'Selected Rows' then send updated data
    this.adaptable.api.eventApi.on('SelectionChanged', () => {
      if (this.getIPPApi().isIPushPullLiveDataRunning()) {
        let currentLiveIPushPullReport:
          | IPushPullReport
          | undefined = this.getIPPApi().getCurrentLiveIPushPullReport();
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

  private getIPPService(): IPushPullService {
    if (!this.ippService) {
      this.ippService = this.adaptable.getPluginProperty('ipushpull', 'service') || null;
    }

    return this.ippService;
  }

  private sendNewLiveData() {
    //we wait for the last sendNewLiveData to finish
    if (this.isSendingData == true) {
      this.throttledRecomputeAndSendLiveDataEvent();
      return;
    }
    let currentLiveIPushPullReport:
      | IPushPullReport
      | undefined = this.getIPPApi().getCurrentLiveIPushPullReport();
    if (currentLiveIPushPullReport) {
      this.isSendingData = true;
      let report: Report = this.adaptable.api.exportApi.getReportByName(
        currentLiveIPushPullReport.ReportName
      );

      Promise.resolve()
        .then(() => {
          return new Promise<any>((resolve, reject) => {
            let reportAsArray: any[] = this.convertReportToArray(report);
            if (reportAsArray) {
              resolve(reportAsArray);
            } else {
              reject('no data in the report');
            }
          });
        })
        .then(reportAsArray => {
          return this.getIPPService().pushData(currentLiveIPushPullReport.Page, reportAsArray);
        })
        .then(() => {
          return this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
            'ipushpull',
            'LiveDataUpdated',
            currentLiveIPushPullReport
          );
        })
        .catch(reason => {
          LoggingHelper.LogAdaptableWarning(
            'Failed to send data to ipushpull for [' + currentLiveIPushPullReport.ReportName + ']',
            reason
          );
          this.getIPPApi().stopLiveData();

          let errorMessage: string = 'Export Failed';
          if (reason) {
            errorMessage += ': ' + reason;
          }
          errorMessage += '.  This live export has been cancelled.';
          this.adaptable.api.alertApi.showAlertError('ipushpull Export Error', errorMessage);
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
    this.getIPPService()
      .loadPage(iPushPullReport.Folder, iPushPullReport.Page)
      .then(() => {
        let report: Report = this.adaptable.api.exportApi.getReportByName(
          iPushPullReport.ReportName
        );
        if (report) {
          let reportAsArray: any[] = this.convertReportToArray(report);
          if (reportAsArray) {
            this.getIPPService().pushData(iPushPullReport.Page, reportAsArray);
          }
        }
      });
  }

  public startLiveData(iPushPullReport: IPushPullReport): void {
    this.getIPPService()
      .loadPage(iPushPullReport.Folder, iPushPullReport.Page)
      .then(() => {
        this.getIPPApi().startLiveData(iPushPullReport);
        setTimeout(() => {
          this.throttledRecomputeAndSendLiveDataEvent();
        }, 500);
      });
  }

  // Converts a Report into an array of array - first array is the column names and subsequent arrays are the values
  // Should probably use same one as Export
  private convertReportToArray(report: Report): any[] {
    let actionReturnObj = this.adaptable.ReportService.ConvertReportToArray(report);
    if (actionReturnObj.Alert) {
      this.adaptable.api.alertApi.displayMessageAlertPopup(actionReturnObj.Alert);
      return [];
    }
    return actionReturnObj.ActionReturn;
  }

  private getThrottleTimeFromState(): number {
    let iPushPullThrottleTime: number | undefined;
    if (this.getIPPApi().isIPushPullRunning()) {
      iPushPullThrottleTime = this.getIPPApi().getIPushPullThrottleTime();
    }
    return iPushPullThrottleTime ? iPushPullThrottleTime : DEFAULT_LIVE_REPORT_THROTTLE_TIME;
  }
}
