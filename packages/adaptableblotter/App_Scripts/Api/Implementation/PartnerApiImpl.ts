import { ApiBase } from './ApiBase';
import { PartnerAPI } from '../PartnerAPI';
import {
  PartnerState,
  iPushPullState,
  Glue42State,
  iPushPullDomain,
} from '../../PredefinedConfig/PartnerState';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';

export class PartnerApiImpl extends ApiBase implements PartnerAPI {
  public getPartnerState(): PartnerState {
    return this.getBlotterState().Partner || {};
  }

  public getPushPullState(): iPushPullState | undefined {
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

  public getCurrentLiveReports(): ILiveReport[] {
    return this.getBlotterState().System.CurrentLiveReports;
  }

  public getIPushPullDomainsPages(): iPushPullDomain[] {
    return this.getBlotterState().System.IPushPullDomainsPages;
  }
}
