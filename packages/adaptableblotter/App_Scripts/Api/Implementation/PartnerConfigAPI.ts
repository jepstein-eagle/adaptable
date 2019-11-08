import { ApiBase } from './ApiBase';
import { IPartnerConfigAPI } from '../Interface/IPartnerConfigAPI';
import { PartnerConfigState } from '../../PredefinedConfig/DesignTimeState/PartnerConfigState';

export class PartnerConfigAPI extends ApiBase implements IPartnerConfigAPI {
  public getPartnerConfigState(): PartnerConfigState {
    return this.getBlotterState().PartnerConfig;
  }
}
