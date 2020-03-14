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
  tab: DashboardTab;
  toolbar: string;
  // this property is now deprecated as we no longer fire when a toolbar is hidden - only when it becomes visible
  visibility?: 'Visible' | 'Hidden';
}
