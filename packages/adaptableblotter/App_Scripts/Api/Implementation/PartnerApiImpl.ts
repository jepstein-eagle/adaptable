import { ApiBase } from './ApiBase';
import { PartnerAPI } from '../PartnerAPI';
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

  public getPushPullState(): IPushPullState | undefined {
    return this.getPartnerState().iPushPull;
  }

  public getGlue42State(): Glue42State | undefined {
    return this.getPartnerState().Glue42;
  }

  public getPushPullInstance(): any {
    let pushpullState = this.getPushPullState();
    if (pushpullState != undefined) {
      return pushpullState.iPushPullInstance;
    } else {
      return pushpullState;
    }
  }

  public isGlue42Runing(): boolean {
    return this.getBlotterState().Grid.IsGlue42Running;
  }

  public isIPushPullRunning(): boolean {
    return this.getBlotterState().Grid.IsIPushPullRunning;
  }

  public getCurrentLiveReports(): LiveReport[] {
    return this.getBlotterState().System.CurrentLiveReports;
  }

  public getIPushPullDomainsPages(): IPushPullDomain[] {
    return this.getBlotterState().System.IPushPullDomainsPages;
  }
}
