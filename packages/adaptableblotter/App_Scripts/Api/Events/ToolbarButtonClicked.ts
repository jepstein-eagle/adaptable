import { AdaptableEventArgs, AdaptableEventData } from './BlotterEvents';
import { ToolbarButton } from '../../PredefinedConfig/Common/ToolbarButton';

export interface ToolbarButtonClickedEventArgs extends AdaptableEventArgs {
  data: ToolbarButtonClickedEventData[];
}

export interface ToolbarButtonClickedEventData extends AdaptableEventData {
  id: ToolbarButtonClickedInfo;
}

export interface ToolbarButtonClickedInfo {
  toolbarButton: ToolbarButton;
}
