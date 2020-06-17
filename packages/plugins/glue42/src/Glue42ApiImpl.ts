import { ApiBase } from '@adaptabletools/adaptable/src/Api/Implementation/ApiBase';

import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';
import { Glue42Api } from '@adaptabletools/adaptable/src/Api/Glue42Api';
import { Glue42PluginOptions } from './index';
import { IAdaptable } from '@adaptabletools/adaptable/types';
import * as Glue42Redux from './Redux/ActionReducers/Glue42Redux';
import {
  Glue42State,
  Glue42Report,
  Glue42Schedule,
} from '@adaptabletools/adaptable/src/PredefinedConfig/Glue42State';
import { Glue42Service } from './Utilities/Services/Glue42Service';

export class Glue42ApiImpl extends ApiBase implements Glue42Api {
  private options: Glue42PluginOptions;
  private glue42Service: Glue42Service | null = null;

  constructor(adaptable: IAdaptable, options: Glue42PluginOptions) {
    super(adaptable);

    this.options = options;
  }
  public getGlue42State(): Glue42State | undefined {
    return this.getAdaptableState().Glue42;
  }

  public isGlue42Running(): boolean {
    let glue42State: Glue42State = this.getGlue42State();
    if (glue42State) {
      return glue42State.IsGlue42Running;
    }
    return false;
  }

  public isGlue42Available(): boolean {
    let glue42State: Glue42State = this.getGlue42State();
    if (glue42State) {
      return glue42State.IsGlue42Available;
    }
    return false;
  }

  private getGlue42Service(): Glue42Service {
    if (!this.glue42Service) {
      this.glue42Service = this.adaptable.getPluginProperty('glue42', 'service') || null;
    }

    return this.glue42Service as Glue42Service;
  }

  public async loginToGlue42(userName: string, password: string): Promise<void> {
    await this.getGlue42Service().login(userName, password, this.options.gatewayURL);
    this.adaptable.api.internalApi.hidePopupScreen();
    this.setGlue42LoginErrorMessage('');
  }

  public logoutFromGlue42(): void {
    this.clearGlue42InternalState();
    this.adaptable.api.internalApi.hidePopupScreen();
  }

  public clearGlue42InternalState(): void {
    this.setGlue42RunningOff();
    this.setGlue42LoginErrorMessage('');
    this.dispatchAction(Glue42Redux.Glue42LiveReportClear());
  }

  public setGlue42LoginErrorMessage(loginErrorMessage: string): void {
    this.dispatchAction(Glue42Redux.Glue42SetLoginErrorMessage(loginErrorMessage));
  }

  public getGlue42ThrottleTime(): number | undefined {
    return this.options.throttleTime;
  }

  public setGlue42ThrottleTime(throttleTime: number): void {
    this.dispatchAction(Glue42Redux.Glue42SetThrottleTime(throttleTime));
  }

  public getCurrentLiveGlue42Report(): Glue42Report | undefined {
    return undefined; // need to do this
  }

  public setGlue42AvailableOn(): void {
    this.dispatchAction(Glue42Redux.SetGlue42AvailableOn());
  }

  public setGlue42AvailableOff(): void {
    this.dispatchAction(Glue42Redux.SetGlue42AvailableOff());
  }

  public setGlue42RunningOn(): void {
    this.dispatchAction(Glue42Redux.SetGlue42RunningOn());
  }

  public setGlue42RunningOff(): void {
    this.dispatchAction(Glue42Redux.SetGlue42RunningOff());
  }

  public getGlue42Schedules(): Glue42Schedule[] {
    return this.getAdaptableState().Schedule.Glue42Schedules || [];
  }

  public startLiveData(glue42Report: Glue42Report): void {
    if (this.checkItemExists(glue42Report, glue42Report.ReportName, 'Glue42 Report')) {
      this.dispatchAction(Glue42Redux.Glue42LiveReportSet(glue42Report));

      this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
        'Glue42',
        'LiveDataStarted',
        glue42Report
      );
    }
  }

  public stopLiveData(): void {
    let currentLiveReport: Glue42Report = this.getCurrentLiveGlue42Report();

    // anything here to do with the Glue42Service should be done
    //    this.adaptable.Glue42Service.stopLiveData()

    // fire the Live Report event for Export Stopped
    this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
      'Glue42',
      'LiveDataStopped',
      currentLiveReport
    );
  }

  public showGlue42Popup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.Glue42StrategyId,
      ScreenPopups.Glue42Popup
    );
  }

  public sendSnapshotToDo(glue42Report: Glue42Report): void {
    // we need to do this as its changed....
  }
}
