import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ExportState, Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import { PartnerConfigState } from '../../PredefinedConfig/DesignTimeState/PartnerConfigState';

export interface IPartnerConfigAPI {
  getPartnerConfigState(): PartnerConfigState;
}
