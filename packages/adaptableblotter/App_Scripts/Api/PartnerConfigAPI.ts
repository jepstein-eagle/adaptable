import { PartnerConfigState } from '../PredefinedConfig/DesignTimeState/PartnerConfigState';

export interface PartnerConfigAPI {
  getPartnerConfigState(): PartnerConfigState;
}
