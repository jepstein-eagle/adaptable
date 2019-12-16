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
    return this.getBlotterState().Partner || {};
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

  public isGlue42Running(): boolean {
    return this.getBlotterState().Grid.IsGlue42Running;
  }

  public isGlue42RunLiveData(): boolean {
    return this.getGlue42State().RunLiveData;
  }

  public isIPushPullRunning(): boolean {
    return this.getBlotterState().Grid.IsIPushPullRunning;
  }
  public isOpenFinRunning(): boolean {
    return false; // TODO
  }

  public getCurrentLiveReports(): LiveReport[] {
    return this.getBlotterState().System.CurrentLiveReports;
  }

  public getIPushPullDomainsPages(): IPushPullDomain[] {
    return this.getBlotterState().System.IPushPullDomainsPages;
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
