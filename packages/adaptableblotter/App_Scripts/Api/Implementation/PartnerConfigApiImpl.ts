import { ApiBase } from './ApiBase';
import { PartnerConfigAPI } from '../PartnerConfigAPI';
import { PartnerConfigState, iPushPullState } from '../../PredefinedConfig/PartnerConfigState';

export class PartnerConfigApiImpl extends ApiBase implements PartnerConfigAPI {
  public getPartnerConfigState(): PartnerConfigState {
    return this.getBlotterState().PartnerConfig || {};
  }

  public getPushPullState(): iPushPullState | undefined {
    return this.getPartnerConfigState().ipushpull;
  }

  public getPushPullInstance(): any {
    let pushpullState = this.getPushPullState();
    if (pushpullState != undefined) {
      return pushpullState.ipushpullConfig;
    } else {
      return pushpullState;
    }
  }
}
