import { BlotterEventArgs, AdaptableBlotterEventData } from './BlotterEvents';
import { ToolbarButton } from '../../PredefinedConfig/Common/ToolbarButton';

export interface ApplicationToolbarButtonClickedEventArgs extends BlotterEventArgs {
  data: ApplicationToolbarButtonClickedEventData[];
}

export interface ApplicationToolbarButtonClickedEventData extends AdaptableBlotterEventData {
  id: ApplicationToolbarButtonClickedInfo;
}

export interface ApplicationToolbarButtonClickedInfo {
  applicationToolbarButton: ToolbarButton;
}
