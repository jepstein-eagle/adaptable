import { AdaptableEventArgs, AdaptableEventData } from './AdaptableEvents';
import { DashboardTab } from '../../PredefinedConfig/DashboardState';

/**
 * Event Args used as part of the **on('ToolbarVisibilityChanged)** event.
 *
 * Includes the Action Column that was clicked, the row that contained the cell that was clicked (and its Primary Key value).
 */
export interface ToolbarVisibilityChangedEventArgs extends AdaptableEventArgs {
  data: ToolbarVisibilityChangedEventData[];
}

export interface ToolbarVisibilityChangedEventData extends AdaptableEventData {
  id: ToolbarVisibilityChangedInfo;
}

export interface ToolbarVisibilityChangedInfo {
  /***
   * The Dashboard Tab which 'hosts' the Toolbar that has become visible
   */
  tab: DashboardTab;

  /**
   * The name of the Toolbar which has become visible
   */
  toolbar: string;

  /**
   * This property is now deprecated as the event only fires when a toolbar becomes visible
   */
  visibility?: 'Visible' | 'Hidden';
}
