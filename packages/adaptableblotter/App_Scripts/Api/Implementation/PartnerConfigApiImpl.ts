import { ApiBase } from './ApiBase';
import { PartnerConfigAPI } from '../PartnerConfigAPI';
import { PartnerConfigState } from '../../PredefinedConfig/PartnerConfigState';

export class PartnerConfigApiImpl extends ApiBase implements PartnerConfigAPI {
  public getPartnerConfigState(): PartnerConfigState {
    return this.getBlotterState().PartnerConfig;
  }
}
