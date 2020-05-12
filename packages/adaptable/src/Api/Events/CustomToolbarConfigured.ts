import { AdaptableEventArgs, AdaptableEventData, AdaptableEventInfo } from './AdaptableEvents';
import { CustomToolbar } from '../../PredefinedConfig/DashboardState';

export interface CustomToolbarConfiguredEventArgs extends AdaptableEventArgs {
  data: CustomToolbarConfiguredEventData[];
}

export interface CustomToolbarConfiguredEventData extends AdaptableEventData {
  id: CustomToolbarConfiguredInfo;
}

export interface CustomToolbarConfiguredInfo extends AdaptableEventInfo {
  /**
   * The Custom Toolbar in which the *Configure* button has been clicked
   */
  customToolbar: CustomToolbar;
}
