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
import { IOpenFinStrategy } from './Interface/IOpenFinStrategy';
import { IOpenFinReport } from '@adaptabletools/adaptable/src/PredefinedConfig/IOpenFinSchedule';
import { DataChangedInfo } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/DataChangedInfo';
import { IOpenFinApi } from '@adaptabletools/adaptable/src/Api/IOpenFinApi';

import { IOpenFinService } from '../Utilities/Services/Interface/IOpenFinService';

export class OpenFinStrategy extends AdaptableStrategyBase implements IOpenFinStrategy {
  private isSendingData: boolean = false;
  private ippService: IOpenFinService | null = null;

  private throttledRecomputeAndSendLiveDataEvent: (() => void) & _.Cancelable;

  public setStrategyEntitlement(): void {
    // TODO
    if (!this.adaptable.api.pluginsApi.getPluginApi('iOpenFin').isIOpenFinAvailable()) {
      this.AccessLevel = 'Hidden';
    } else {
      this.AccessLevel = this.adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
        this.Id
      );
    }
  }

  public getIPPApi(): IOpenFinApi {
    return this.adaptable.api.pluginsApi.getPluginApi('iOpenFin');
  }

  public isStrategyAvailable(): boolean {
    if (this.adaptable.api.entitlementsApi.isFunctionHiddenEntitlement(this.Id)) {
      return false;
    }
    return true;
  }

  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.IOpenFinStrategyId, adaptable);

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
    // we simply send everything to iOpenFin every time any cell ticks....
    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      if (this.getIPPApi().isIOpenFinLiveDataRunning()) {
        let currentLiveIOpenFinReport:
          | IOpenFinReport
          | undefined = this.getIPPApi().getCurrentLiveIOpenFinReport();
        if (
          currentLiveIOpenFinReport &&
          currentLiveIOpenFinReport.ReportName !== SELECTED_CELLS_REPORT &&
          currentLiveIOpenFinReport.ReportName !== SELECTED_ROWS_REPORT
        ) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
    // if the grid has refreshed then update all live reports
    this.adaptable._on('GridRefreshed', () => {
      if (this.getIPPApi().isIOpenFinLiveDataRunning()) {
        this.throttledRecomputeAndSendLiveDataEvent();
      }
    });
    // if the grid filters have changed then update any live reports except cell or row selected
    this.adaptable._on('GridFiltered', () => {
      // Rerun all reports except selected cells / rows when filter changes
      if (this.getIPPApi().isIOpenFinLiveDataRunning()) {
        let currentLiveIOpenFinReport:
          | IOpenFinReport
          | undefined = this.getIPPApi().getCurrentLiveIOpenFinReport();
        if (
          currentLiveIOpenFinReport &&
          currentLiveIOpenFinReport.ReportName !== SELECTED_CELLS_REPORT &&
          currentLiveIOpenFinReport.ReportName !== SELECTED_ROWS_REPORT
        ) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
    // if grid selection has changed and the iOpenFin Live report is 'Selected Cells' or 'Selected Rows' then send updated data
    this.adaptable.api.eventApi.on('SelectionChanged', () => {
      if (this.getIPPApi().isIOpenFinLiveDataRunning()) {
        let currentLiveIOpenFinReport:
          | IOpenFinReport
          | undefined = this.getIPPApi().getCurrentLiveIOpenFinReport();
        if (
          currentLiveIOpenFinReport &&
          (currentLiveIOpenFinReport.ReportName === SELECTED_CELLS_REPORT ||
            currentLiveIOpenFinReport.ReportName === SELECTED_ROWS_REPORT)
        ) {
          this.throttledRecomputeAndSendLiveDataEvent();
        }
      }
    });
  }

  private getIPPService(): IOpenFinService {
    if (!this.ippService) {
      this.ippService = this.adaptable.getPluginProperty('iOpenFin', 'service') || null;
    }

    return this.ippService;
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.IOpenFinStrategyFriendlyName,
        ComponentName: ScreenPopups.IOpenFinPopup,
        Icon: StrategyConstants.IOpenFinGlyph,
      });
    }
  }

  private sendNewLiveData() {
    //we wait for the last sendNewLiveData to finish
    if (this.isSendingData == true) {
      this.throttledRecomputeAndSendLiveDataEvent();
      return;
    }
    let currentLiveIOpenFinReport:
      | IOpenFinReport
      | undefined = this.getIPPApi().getCurrentLiveIOpenFinReport();
    if (currentLiveIOpenFinReport) {
      this.isSendingData = true;
      let report: Report = this.adaptable.api.exportApi.getReportByName(
        currentLiveIOpenFinReport.ReportName
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
          return this.getIPPService().pushData(currentLiveIOpenFinReport.Page, reportAsArray);
        })
        .then(() => {
          return this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
            'iOpenFin',
            'LiveDataUpdated',
            currentLiveIOpenFinReport
          );
        })
        .catch(reason => {
          LoggingHelper.LogAdaptableWarning(
            'Failed to send data to iOpenFin for [' + currentLiveIOpenFinReport.ReportName + ']',
            reason
          );
          this.getIPPApi().stopLiveData();

          let errorMessage: string = 'Export Failed';
          if (reason) {
            errorMessage += ': ' + reason;
          }
          errorMessage += '.  This live export has been cancelled.';
          this.adaptable.api.alertApi.showAlertError('iOpenFin Export Error', errorMessage);
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

  public sendSnapshot(iOpenFinReport: IOpenFinReport): void {
    this.getIPPService()
      .loadPage(iOpenFinReport.Folder, iOpenFinReport.Page)
      .then(() => {
        let report: Report = this.adaptable.api.exportApi.getReportByName(
          iOpenFinReport.ReportName
        );
        if (report) {
          let reportAsArray: any[] = this.convertReportToArray(report);
          if (reportAsArray) {
            this.getIPPService().pushData(iOpenFinReport.Page, reportAsArray);
          }
        }
      });
  }

  public startLiveData(iOpenFinReport: IOpenFinReport): void {
    this.getIPPService()
      .loadPage(iOpenFinReport.Folder, iOpenFinReport.Page)
      .then(() => {
        this.getIPPApi().startLiveData(iOpenFinReport);
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
    let iOpenFinThrottleTime: number | undefined;
    if (this.getIPPApi().isIOpenFinRunning()) {
      iOpenFinThrottleTime = this.getIPPApi().getIOpenFinThrottleTime();
    }
    return iOpenFinThrottleTime ? iOpenFinThrottleTime : DEFAULT_LIVE_REPORT_THROTTLE_TIME;
  }
}
