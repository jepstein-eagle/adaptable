import { ApiBase } from './ApiBase';
import { PartnerAPI } from '../PartnerAPI';
import { PartnerState, iPushPullState, Glue42State } from '../../PredefinedConfig/PartnerState';

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
      return pushpullState.iPushPull;
    } else {
      return pushpullState;
    }
  }
}
