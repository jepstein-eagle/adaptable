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
  //  private OpenFinService: OpenFinService | null = null;

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
      return OpenFinState.IsOpenFinAvailable;
    }
    return false;
  }

  private getOpenFinService(): OpenFinService {
    if (!this.OpenFinService) {
      this.OpenFinService = this.adaptable.getPluginProperty('OpenFin', 'service') || null;
    }

    return this.OpenFinService as OpenFinService;
  }

  public async loginToOpenFin(userName: string, password: string): Promise<void> {
    await this.getOpenFinService().login(userName, password, this.getOpenFinState().GatewayURL);
    this.adaptable.api.internalApi.hidePopupScreen();
    this.setOpenFinLoginErrorMessage('');
  }

  public logoutFromOpenFin(): void {
    this.clearOpenFinInternalState();
    this.adaptable.api.internalApi.hidePopupScreen();
  }

  public clearOpenFinInternalState(): void {
    this.setOpenFinRunningOff();
    this.setOpenFinLoginErrorMessage('');
    this.dispatchAction(OpenFinRedux.OpenFinLiveReportClear());
  }

  public setOpenFinLoginErrorMessage(loginErrorMessage: string): void {
    this.dispatchAction(OpenFinRedux.OpenFinSetLoginErrorMessage(loginErrorMessage));
  }

  public getOpenFinThrottleTime(): number | undefined {
    return this.options.throttleTime;
  }

  public setOpenFinThrottleTime(throttleTime: number): void {
    this.dispatchAction(OpenFinRedux.OpenFinSetThrottleTime(throttleTime));
  }

  public getCurrentLiveOpenFinReport(): OpenFinReport | undefined {
    return undefined; // need to do this
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
    return this.getAdaptableState().Schedule.OpenFinSchedules || [];
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

  public sendSnapshotToDo(OpenFinReport: OpenFinReport): void {
    // we need to do this as its changed....
  }
}
