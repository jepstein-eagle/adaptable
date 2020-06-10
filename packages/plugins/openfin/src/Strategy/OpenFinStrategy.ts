import { AdaptableStrategyBase } from '@adaptabletools/adaptable/src/Strategy/AdaptableStrategyBase';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import { IOpenFinStrategy } from './Interface/IOpenFinStrategy';
import { OpenFinReport } from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';

import {
  IAdaptable,
  DataChangedInfo,
  AdaptableMenuItem,
  Report,
  AdaptableColumn,
} from '@adaptabletools/adaptable/types';
import _ from '@adaptabletools/adaptable/node_modules/@types/lodash';
import {
  SELECTED_CELLS_REPORT,
  SELECTED_ROWS_REPORT,
  DEFAULT_LIVE_REPORT_THROTTLE_TIME,
} from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import LoggingHelper from '@adaptabletools/adaptable/src/Utilities/Helpers/LoggingHelper';
import { OpenFinService } from '../Utilities/Services/OpenFinService';
import { OpenFinApi } from '@adaptabletools/adaptable/src/Api/OpenFinApi';

export class OpenFinStrategy extends AdaptableStrategyBase implements IOpenFinStrategy {
  private isSendingData: boolean = false;
  private OpenFinService: OpenFinService | null = null;

  private throttledRecomputeAndSendLiveDataEvent: (() => void) & _.Cancelable;

  public getOpenFinApi(): OpenFinApi {
    return this.adaptable.api.pluginsApi.getPluginApi('openfin');
  }
  public setStrategyEntitlement(): void {
    const OpenFinApi = this.getOpenFinApi();
    if (!OpenFinApi) {
      this.AccessLevel = 'Hidden';
      return;
    }

    if (!OpenFinApi.isOpenFinAvailable()) {
      this.AccessLevel = 'Hidden';
    } else {
      this.AccessLevel = this.adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
        this.Id
      );
    }
  }

  public isStrategyAvailable(): boolean {
    if (this.adaptable.api.entitlementsApi.isFunctionHiddenEntitlement(this.Id)) {
      return false;
    }
    const OpenFinApi = this.getOpenFinApi();
    if (!OpenFinApi) {
      return false;
    }
    return OpenFinApi.isOpenFinAvailable();
  }

  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.OpenFinStrategyId, adaptable);

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
      const OpenFinApi = this.getOpenFinApi();
      if (!OpenFinApi) {
        return;
      }
      if (OpenFinApi.isOpenFinRunning()) {
        let currentLiveIOpenFinReport:
          | OpenFinReport
          | undefined = OpenFinApi.getCurrentLiveOpenFinReport();
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
      const OpenFinApi = this.getOpenFinApi();
      if (!OpenFinApi) {
        return;
      }
      if (OpenFinApi.isOpenFinRunning()) {
        //   this.throttledRecomputeAndSendLiveDataEvent();
      }
    });
    // if the grid filters have changed then update any live reports except cell or row selected
    this.adaptable._on('GridFiltered', () => {
      const OpenFinApi = this.getOpenFinApi();
      if (!OpenFinApi) {
        return;
      }
      // Rerun all reports except selected cells / rows when filter changes
      if (OpenFinApi.isOpenFinRunning()) {
        let currentLiveIOpenFinReport:
          | OpenFinReport
          | undefined = OpenFinApi.getCurrentLiveOpenFinReport();
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
      const OpenFinApi = this.getOpenFinApi();
      if (!OpenFinApi) {
        return;
      }
      if (OpenFinApi.isOpenFinRunning()) {
        let currentLiveIOpenFinReport:
          | OpenFinReport
          | undefined = OpenFinApi.getCurrentLiveOpenFinReport();
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

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.OpenFinStrategyFriendlyName,
        ComponentName: ScreenPopups.OpenFinPopup,
        Icon: StrategyConstants.OpenFinGlyph,
      });
    }
  }

  private sendNewLiveData() {
    //we wait for the last sendNewLiveData to finish
    if (this.isSendingData == true) {
      this.throttledRecomputeAndSendLiveDataEvent();
      return;
    }
    const OpenFinApi = this.getOpenFinApi();
    if (!OpenFinApi) {
      return;
    }
    let currentLiveIOpenFinReport:
      | OpenFinReport
      | undefined = OpenFinApi.getCurrentLiveOpenFinReport();
    if (currentLiveIOpenFinReport) {
      this.isSendingData = true;
      let report: Report = this.adaptable.api.exportApi.getReportByName(
        currentLiveIOpenFinReport.ReportName
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
          // this.adaptable.OpenFinService.pushData(
          //  currentLiveIOpenFinReport.Page,
          //  reportAsArray
          //);
        })
        .then(() => {
          return this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
            'OpenFin',
            'LiveDataUpdated',
            currentLiveIOpenFinReport
          );
        })
        .catch(reason => {
          LoggingHelper.LogAdaptableWarning(
            'Failed to send data to iOpenFin for [' + currentLiveIOpenFinReport.ReportName + ']',
            reason
          );
          //      this.adaptable.api.OpenFinApi.stopLiveData();

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

  public sendSnapshot(OpenFinReport: OpenFinReport): void {
    let report: Report = this.adaptable.api.exportApi.getReportByName(OpenFinReport.ReportName);

    if (report) {
      let data: any[] = this.ConvertReportToArray(report);
      let gridColumns: AdaptableColumn[] = this.adaptable.api.gridApi.getColumns();
      // for OpenFin we need to pass in the pk values of the data also
      let primaryKeyValues: any[] = this.adaptable.ReportService.GetPrimaryKeysForReport(report);
      try {
        if (data) {
          this.OpenFinService.exportData.apply(this.OpenFinService, [
            data,
            gridColumns,
            primaryKeyValues,
          ]);
        }
      } catch (error) {
        LoggingHelper.LogAdaptableError(error);
      }
    }
  }

  public startLiveData(OpenFinReport: OpenFinReport): void {
    let report: Report = this.adaptable.api.exportApi.getReportByName(OpenFinReport.ReportName);
    if (report) {
      const OpenFinApi = this.getOpenFinApi();
      if (!OpenFinApi) {
        return;
      }
      // let page: string = 'Excel'; // presume we should get this from OpenFin service in async way??
      let reportData: any[] = this.ConvertReportToArray(report);
      this.OpenFinService.openSheet(reportData).then(() => {
        OpenFinApi.startLiveData(OpenFinReport);
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
    let iOpenFinThrottleTime: number | undefined;
    const OpenFinApi = this.getOpenFinApi();
    if (!OpenFinApi) {
      return 0;
    }
    if (OpenFinApi.isOpenFinRunning()) {
      iOpenFinThrottleTime = OpenFinApi.getOpenFinThrottleTime();
    }
    return iOpenFinThrottleTime ? iOpenFinThrottleTime : DEFAULT_LIVE_REPORT_THROTTLE_TIME;
  }
}
