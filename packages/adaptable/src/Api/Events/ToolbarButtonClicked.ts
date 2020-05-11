import { AdaptableEventArgs, AdaptableEventData, AdaptableEventInfo } from './AdaptableEvents';
import { ToolbarButton } from '../../PredefinedConfig/Common/ToolbarButton';
import { CustomToolbar } from '../../PredefinedConfig/DashboardState';

export interface ToolbarButtonClickedEventArgs extends AdaptableEventArgs {
  data: ToolbarButtonClickedEventData[];
}

export interface ToolbarButtonClickedEventData extends AdaptableEventData {
  id: ToolbarButtonClickedInfo;
}

export interface ToolbarButtonClickedInfo extends AdaptableEventInfo {
  /**
   * The Toolbar Button which has been clicked by the User
   */
  toolbarButton: ToolbarButton;

  /**
   * The Custom Toolbar which contains the button that has been clicked
   */
  customToolbar: CustomToolbar;
}
