import { ApiBase } from './ApiBase';
import { PartnerAPI } from '../PartnerAPI';
import * as PartnerRedux from '../../Redux/ActionsReducers/PartnerRedux';
import {
  PartnerState,
  IPushPullState,
  Glue42State,
  IPushPullDomain,
} from '../../PredefinedConfig/PartnerState';
import { LiveReport } from '../Events/LiveReportUpdated';

export class PartnerApiImpl extends ApiBase implements PartnerAPI {
  public getPartnerState(): PartnerState {
    return this.getAdaptableState().Partner || {};
  }

  public getIPushPullState(): IPushPullState | undefined {
    return this.getPartnerState().iPushPull;
  }

  public getGlue42State(): Glue42State | undefined {
    return this.getPartnerState().Glue42;
  }

  public getIPushPullInstance(): any {
    let pushpullState = this.getIPushPullState();
    if (pushpullState != undefined) {
      return pushpullState.iPushPullInstance;
    } else {
      return pushpullState;
    }
  }

  public isGlue42RunLiveData(): boolean {
    let glue42State: Glue42State = this.getGlue42State();
    if (glue42State) {
      return glue42State.RunLiveData;
    }
    return false;
  }

  public isGlue42Available(): boolean {
    return this.getAdaptableState().Grid.IsGlue42Available;
  }

  public isLiveReportRunning(): boolean {
    return this.getAdaptableState().Grid.IsLiveReportRunning;
  }

  public isIPushPullAvailable(): boolean {
    return this.getAdaptableState().Grid.IsIPushPullAvailable;
  }
  public isOpenFinAvailable(): boolean {
    return false; // TODO
  }

  public getCurrentLiveReports(): LiveReport[] {
    return this.getAdaptableState().System.CurrentLiveReports;
  }

  public getIPushPullDomainsPages(): IPushPullDomain[] {
    return this.getAdaptableState().System.IPushPullDomainsPages;
  }

  public getIPushPullThrottleTime(): number | undefined {
    return this.getIPushPullState().ThrottleTime;
  }

  public setIPushPullThrottleTime(throttleTime: number): void {
    this.dispatchAction(PartnerRedux.IPushPullSetThrottleTime(throttleTime));
  }

  public getGlue42ThrottleTime(): number | undefined {
    return this.getGlue42State().ThrottleTime;
  }

  public setGlue42ThrottleTime(throttleTime: number): void {
    this.dispatchAction(PartnerRedux.Glue42SetThrottleTime(throttleTime));
  }
}
