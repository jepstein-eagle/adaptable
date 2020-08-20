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
import { DataChangedInfo } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/DataChangedInfo';
import { OpenFinApi } from '@adaptabletools/adaptable/src/Api/OpenFinApi';

import { IOpenFinService } from '../Utilities/Services/Interface/IOpenFinService';
import { OpenFinReport } from '@adaptabletools/adaptable/src/PredefinedConfig/SystemState';

export class OpenFinStrategy extends AdaptableStrategyBase implements IOpenFinStrategy {
  private isSendingData: boolean = false;
  private openFinService: IOpenFinService | null = null;

  private throttledRecomputeAndSendLiveDataEvent: (() => void) & _.Cancelable;
  private liveIntervalId: number;

  public setStrategyEntitlement(): void {
    if (!this.getOpenFinApi().isOpenFinAvailable()) {
      this.AccessLevel = 'Hidden';
    } else {
      this.AccessLevel = this.adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
        this.Id
      );
    }
  }

  public getOpenFinApi(): OpenFinApi {
    return this.adaptable.api.pluginsApi.getPluginApi('openfin');
  }

  public isStrategyAvailable(): boolean {
    if (this.adaptable.api.entitlementsApi.isFunctionHiddenEntitlement(this.Id)) {
      return false;
    }
    return true;
  }

  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.OpenFinStrategyId,
      StrategyConstants.OpenFinStrategyFriendlyName,
      StrategyConstants.OpenFinGlyph,
      ScreenPopups.OpenFinPopup,
      adaptable
    );

    this.throttledRecomputeAndSendLiveDataEvent = _.throttle(
      () => this.sendNewLiveData(),
      this.getThrottleTimeFromState()
    );
    // if a piece of data has updated then update any live reports except cell or row selected
    // currently we DONT send deltas or even check if the updated cell is in the current report  - we should
    // we simply send everything to iOpenFin every time any cell ticks....
    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      if (this.getOpenFinApi().isOpenFinRunning()) {
        let currentLiveIOpenFinReport:
          | OpenFinReport
          | undefined = this.getOpenFinApi().getCurrentLiveOpenFinReport();
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
      if (this.getOpenFinApi().isOpenFinRunning()) {
        this.throttledRecomputeAndSendLiveDataEvent();
      }
    });
    // if the grid filters have changed then update any live reports except cell or row selected
    this.adaptable._on('GridFiltered', () => {
      // Rerun all reports except selected cells / rows when filter changes
      if (this.getOpenFinApi().isOpenFinRunning()) {
        let currentLiveIOpenFinReport:
          | OpenFinReport
          | undefined = this.getOpenFinApi().getCurrentLiveOpenFinReport();
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
      if (this.getOpenFinApi().isOpenFinRunning()) {
        let currentLiveIOpenFinReport:
          | OpenFinReport
          | undefined = this.getOpenFinApi().getCurrentLiveOpenFinReport();
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

  private getOpenFinService(): IOpenFinService {
    if (!this.openFinService) {
      this.openFinService = this.adaptable.getPluginProperty('openfin', 'service') || null;
    }

    return this.openFinService;
  }

  private workAroundOpenfinExcelDataDimension: Map<string, { x: number; y: number }> = new Map();

  private sendNewLiveData() {
    //we wait for the last sendNewLiveData to finish
    if (this.isSendingData == true) {
      this.throttledRecomputeAndSendLiveDataEvent();
      return;
    }
    let currentLiveIOpenFinReport:
      | OpenFinReport
      | undefined = this.getOpenFinApi().getCurrentLiveOpenFinReport();
    if (currentLiveIOpenFinReport) {
      this.isSendingData = true;
      let report: Report = this.adaptable.api.exportApi.getReportByName(
        currentLiveIOpenFinReport.ReportName
      );

      Promise.resolve()
        .then(() => {
          return new Promise<any>((resolve, reject) => {
            let previousDimension = this.workAroundOpenfinExcelDataDimension.get(report.Uuid);
            let ReportAsArray: any[] = this.convertReportToArray(report);
            let newDimension = {
              x: ReportAsArray.length ? ReportAsArray[0].length : 0,
              y: ReportAsArray.length,
            };
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
              this.workAroundOpenfinExcelDataDimension.set(report.Uuid, newDimension);
              resolve(ReportAsArray);
            } else {
              reject();
            }
          });
        })
        .then(reportAsArray => {
          return this.getOpenFinService().pushData(reportAsArray);
        })
        .then(() => {
          LoggingHelper.LogAdaptableSuccess('All live report data sent');
          this.isSendingData = false;
          return this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
            'OpenFin',
            'LiveDataUpdated',
            currentLiveIOpenFinReport
          );
        })
        .catch(reason => {
          LoggingHelper.LogAdaptableWarning(
            'Failed to send data to OpenFin for [' + currentLiveIOpenFinReport.ReportName + ']',
            reason
          );
          this.getOpenFinApi().stopLiveData();

          let errorMessage: string = 'Export Failed';
          if (reason) {
            errorMessage += ': ' + reason;
          }
          errorMessage += '.  This live export has been cancelled.';
          this.adaptable.api.alertApi.showAlertError('iOpenFin Export Error', errorMessage);

          LoggingHelper.LogAdaptableWarning('Failed to send data');
          this.isSendingData = false;
        });
    }
  }

  public startLiveData(iOpenFinReport: OpenFinReport): void {
    this.liveIntervalId = (setInterval(() => {
      this.throttledRecomputeAndSendLiveDataEvent();
    }, 500) as unknown) as number;
  }

  public stopLiveData(_iOpenFinReport: OpenFinReport): void {
    if (this.liveIntervalId) {
      clearInterval(this.liveIntervalId);
    }
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
    if (this.getOpenFinApi().isOpenFinRunning()) {
      iOpenFinThrottleTime = this.getOpenFinApi().getOpenFinThrottleTime();
    }
    return iOpenFinThrottleTime ? iOpenFinThrottleTime : DEFAULT_LIVE_REPORT_THROTTLE_TIME;
  }
}
