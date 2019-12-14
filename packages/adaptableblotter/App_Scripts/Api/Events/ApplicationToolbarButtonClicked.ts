import { BlotterEventArgs, AdaptableBlotterEventData } from './BlotterEvents';
import { ApplicationToolbarButton } from '../../PredefinedConfig/ApplicationState';

export interface ApplicationToolbarButtonClickedEventArgs extends BlotterEventArgs {
  data: ApplicationToolbarButtonClickedEventData[];
}

export interface ApplicationToolbarButtonClickedEventData extends AdaptableBlotterEventData {
  id: ApplicationToolbarButtonClickedInfo;
}

export interface ApplicationToolbarButtonClickedInfo {
  applicationToolbarButton: ApplicationToolbarButton;
}
