import { RunTimeState } from './RunTimeState';
import { AdaptableToolPanels, AdaptableFunctionButtons } from './Common/Types';

export interface ToolPanelState extends RunTimeState {
  AvailableToolPanels?: AdaptableToolPanels;
  VisibleToolPanels?: AdaptableToolPanels;
  VisibleButtons?: AdaptableFunctionButtons;
}
