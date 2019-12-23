import { RunTimeState } from './RunTimeState';
import { AdaptableToolPanels } from './Common/Types';

export interface ToolPanelState extends RunTimeState {
  AvailableToolPanels?: AdaptableToolPanels;
  VisibleToolPanels?: AdaptableToolPanels;
}
