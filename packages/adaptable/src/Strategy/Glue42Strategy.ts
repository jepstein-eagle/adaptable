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
import { IGlue42Strategy } from './Interface/IGlue42Strategy';
import { DataChangedInfo } from '../AdaptableOptions/CommonObjects/DataChangedInfo';
import { Glue42Report } from '../PredefinedConfig/Glue42State';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';

export class Glue42Strategy extends AdaptableStrategyBase implements IGlue42Strategy {
  private isSendingData: boolean = false;

  private throttledRecomputeAndSendLiveDataEvent: (() => void) & _.Cancelable;

  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.Glue42StrategyId, adaptable);

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
      if (this.adaptable.api.glue42Api.isGlue42Running()) {
        let currentLiveIGlue42Report:
          | Glue42Report
          | undefined = this.adaptable.api.glue42Api.getCurrentLiveGlue42Report();
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
      if (this.adaptable.api.glue42Api.isGlue42Running()) {
        this.throttledRecomputeAndSendLiveDataEvent();
      }
    });
    // if the grid filters have changed then update any live reports except cell or row selected
    this.adaptable._on('GridFiltered', () => {
      // Rerun all reports except selected cells / rows when filter changes
      if (this.adaptable.api.glue42Api.isGlue42Running()) {
        let currentLiveIGlue42Report:
          | Glue42Report
          | undefined = this.adaptable.api.glue42Api.getCurrentLiveGlue42Report();
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
      if (this.adaptable.api.glue42Api.isGlue42Running()) {
        let currentLiveIGlue42Report:
          | Glue42Report
          | undefined = this.adaptable.api.glue42Api.getCurrentLiveGlue42Report();
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

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.adaptable.api.glue42Api.isGlue42Available()) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.Glue42StrategyFriendlyName,
        ComponentName: ScreenPopups.Glue42Popup,
        Icon: StrategyConstants.Glue42Glyph,
      });
    }
  }

  private sendNewLiveData() {
    //we wait for the last sendNewLiveData to finish
    if (this.isSendingData == true) {
      this.throttledRecomputeAndSendLiveDataEvent();
      return;
    }
    let currentLiveIGlue42Report:
      | Glue42Report
      | undefined = this.adaptable.api.glue42Api.getCurrentLiveGlue42Report();
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

  public sendSnapshot(glue42Report: Glue42Report): void {
    let report: Report = this.adaptable.api.exportApi.getReportByName(glue42Report.ReportName);
    if (report) {
      let data: any[] = this.ConvertReportToArray(report);
      let gridColumns: AdaptableColumn[] = this.adaptable.api.gridApi.getColumns();
      // for glue42 we need to pass in the pk values of the data also
      let primaryKeyValues: any[] = this.adaptable.ReportService.GetPrimaryKeysForReport(report);
      try {
        if (data) {
          this.adaptable.Glue42Service.exportData.apply(this.adaptable.Glue42Service, [
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

  public startLiveData(glue42Report: Glue42Report): void {
    let report: Report = this.adaptable.api.exportApi.getReportByName(glue42Report.ReportName);
    if (report) {
      let page: string = 'Excel'; // presume we should get this from Glue42 service in async way??
      let reportData: any[] = this.ConvertReportToArray(report);
      this.adaptable.Glue42Service.openSheet(reportData).then(() => {
        this.adaptable.api.glue42Api.startLiveData(glue42Report);
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
    if (this.adaptable.api.glue42Api.isGlue42Running()) {
      iGlue42ThrottleTime = this.adaptable.api.glue42Api.getGlue42ThrottleTime();
    }
    return iGlue42ThrottleTime ? iGlue42ThrottleTime : DEFAULT_LIVE_REPORT_THROTTLE_TIME;
  }
}
