import { PartnerConfigState, iPushPullState } from '../PredefinedConfig/PartnerConfigState';

export interface PartnerConfigAPI {
  getPartnerConfigState(): PartnerConfigState;
  getPushPullState(): iPushPullState | undefined;
  getPushPullInstance(): any;
}
