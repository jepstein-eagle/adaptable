import { PartnerConfigState } from '../PredefinedConfig/PartnerConfigState';

export interface PartnerConfigAPI {
  getPartnerConfigState(): PartnerConfigState;
  getPushPullInstance(): any;
}
