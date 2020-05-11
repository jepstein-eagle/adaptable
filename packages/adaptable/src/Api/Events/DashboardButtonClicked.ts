import { AdaptableEventArgs, AdaptableEventData, AdaptableEventInfo } from './AdaptableEvents';
import { ToolbarButton } from '../../PredefinedConfig/Common/ToolbarButton';

export interface DashboardButtonClickedEventArgs extends AdaptableEventArgs {
  data: DashboardButtonClickedEventData[];
}

export interface DashboardButtonClickedEventData extends AdaptableEventData {
  id: DashboardButtonClickedInfo;
}

export interface DashboardButtonClickedInfo extends AdaptableEventInfo {
  /**
   * The Dashboard button which has been clicked
   *
   * This will appear in the top left corner of the Dashboard
   */
  dashboardButton: ToolbarButton;
}
