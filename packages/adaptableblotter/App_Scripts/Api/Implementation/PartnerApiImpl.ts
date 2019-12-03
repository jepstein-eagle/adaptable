import { ApiBase } from './ApiBase';
import { PartnerAPI } from '../PartnerAPI';
import { PartnerState, iPushPullState } from '../../PredefinedConfig/PartnerState';

export class PartnerApiImpl extends ApiBase implements PartnerAPI {
  public getPartnerState(): PartnerState {
    return this.getBlotterState().Partner || {};
  }

  public getPushPullState(): iPushPullState | undefined {
    return this.getPartnerState().iPushPull;
  }

  public getPushPullInstance(): any {
    let pushpullState = this.getPushPullState();
    if (pushpullState != undefined) {
      return pushpullState.iPushPullConfig;
    } else {
      return pushpullState;
    }
  }
}
