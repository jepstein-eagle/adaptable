import { MessageType } from '../../PredefinedConfig/Common/Enums';

export interface SystemStatusUpdate {
  StatusMessage: string;
  StatusType: MessageType;
  StatusFurtherInformation?: string;
}
