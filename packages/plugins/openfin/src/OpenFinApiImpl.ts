import { ApiBase } from '@adaptabletools/adaptable/src/Api/Implementation/ApiBase';

import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import { OpenFinApi } from '@adaptabletools/adaptable/src/Api/OpenFinApi';
import { OpenFinPluginOptions } from './index';
import { IAdaptable } from '@adaptabletools/adaptable/types';
import * as OpenFinRedux from './Redux/ActionReducers/OpenFinRedux';
import {
  OpenFinState,
  OpenFinReport,
  OpenFinSchedule,
} from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';
import { OpenFinService } from './Utilities/Services/OpenFinService';

export class OpenFinApiImpl extends ApiBase implements OpenFinApi {
  private options: OpenFinPluginOptions;
  private OpenFinService: OpenFinService | null = null;

  constructor(adaptable: IAdaptable, options: OpenFinPluginOptions) {
    super(adaptable);

    this.options = options;
  }
  public getOpenFinState(): OpenFinState | undefined {
    return this.getAdaptableState().OpenFin;
  }

  public isOpenFinRunning(): boolean {
    let OpenFinState: OpenFinState = this.getOpenFinState();
    if (OpenFinState) {
      return OpenFinState.IsOpenFinRunning;
    }
    return false;
  }

  public isOpenFinAvailable(): boolean {
    let OpenFinState: OpenFinState = this.getOpenFinState();
    if (OpenFinState) {
      return true; //OpenFinState.IsOpenFinAvailable;
    }
    return false;
  }

  private getOpenFinService(): OpenFinService {
    if (!this.OpenFinService) {
      this.OpenFinService = this.adaptable.getPluginProperty('openfin', 'service') || null;
    }

    return this.OpenFinService as OpenFinService;
  }

  public clearOpenFinInternalState(): void {
    this.setOpenFinRunningOff();

    this.dispatchAction(OpenFinRedux.OpenFinLiveReportClear());
  }

  public getOpenFinThrottleTime(): number | undefined {
    return this.options.throttleTime;
  }

  public getCurrentLiveOpenFinReport(): OpenFinReport | undefined {
    return this.getAdaptableState().System.CurrentLiveOpenFinReport;
  }

  public setOpenFinAvailableOn(): void {
    this.dispatchAction(OpenFinRedux.SetOpenFinAvailableOn());
  }

  public setOpenFinAvailableOff(): void {
    this.dispatchAction(OpenFinRedux.SetOpenFinAvailableOff());
  }

  public setOpenFinRunningOn(): void {
    this.dispatchAction(OpenFinRedux.SetOpenFinRunningOn());
  }

  public setOpenFinRunningOff(): void {
    this.dispatchAction(OpenFinRedux.SetOpenFinRunningOff());
  }

  public getOpenFinSchedules(): OpenFinSchedule[] {
    // return this.getAdaptableState().Schedule.OpenFinSchedules || [];
    return [];
  }

  public startLiveData(OpenFinReport: OpenFinReport): void {
    if (this.checkItemExists(OpenFinReport, OpenFinReport.ReportName, 'OpenFin Report')) {
      this.dispatchAction(OpenFinRedux.OpenFinLiveReportSet(OpenFinReport));

      this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
        'OpenFin',
        'LiveDataStarted',
        OpenFinReport
      );
    }
  }

  public stopLiveData(): void {
    let currentLiveReport: OpenFinReport = this.getCurrentLiveOpenFinReport();

    // anything here to do with the OpenFinService should be done
    //    this.adaptable.OpenFinService.stopLiveData()

    // fire the Live Report event for Export Stopped
    this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
      'OpenFin',
      'LiveDataStopped',
      currentLiveReport
    );
  }

  public showOpenFinPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.OpenFinStrategyId,
      ScreenPopups.OpenFinPopup
    );
  }
}
