import { BlotterEventArgs, AdaptableBlotterEventData } from './BlotterEvents';
import { ToolbarButton } from '../../PredefinedConfig/Common/ToolbarButton';

export interface ToolbarButtonClickedEventArgs extends BlotterEventArgs {
  data: ToolbarButtonClickedEventData[];
}

export interface ToolbarButtonClickedEventData extends AdaptableBlotterEventData {
  id: ToolbarButtonClickedInfo;
}

export interface ToolbarButtonClickedInfo {
  toolbarButton: ToolbarButton;
}
