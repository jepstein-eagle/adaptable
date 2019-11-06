import { PartnerConfigState } from '../../PredefinedConfig/DesignTimeState/PartnerConfigState';

export interface IPartnerConfigAPI {
  getPartnerConfigState(): PartnerConfigState;
}
