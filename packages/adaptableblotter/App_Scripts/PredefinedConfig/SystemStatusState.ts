import { DesignTimeState } from './DesignTimeState';

export interface SystemStatusState extends DesignTimeState {
  DefaultStatusMessage?: string;
  DefaultStatusType?: 'Info' | 'Success' | 'Warning' | 'Error';
  StatusMessage?: string;
  StatusType?: 'Info' | 'Success' | 'Warning' | 'Error';
  ShowAlert?: boolean;
  StatusFurtherInformation?: string;
}
