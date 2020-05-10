import { AdaptableEventArgs, AdaptableEventData, AdaptableEventInfo } from './AdaptableEvents';
import { ToolbarButton } from '../../PredefinedConfig/Common/ToolbarButton';

export interface DashboardButtonClickedEventArgs extends AdaptableEventArgs {
  data: DashboardButtonClickedEventData[];
}

export interface DashboardButtonClickedEventData extends AdaptableEventData {
  id: DashboardButtonClickedInfo;
}

export interface DashboardButtonClickedInfo extends AdaptableEventInfo {
  dashboardButton: ToolbarButton;
}
