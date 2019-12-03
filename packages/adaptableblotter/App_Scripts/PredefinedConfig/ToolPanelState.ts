import { RunTimeState } from './RunTimeState';
export interface ToolPanelState extends RunTimeState {
  AvailableToolPanels?: string[];
  VisibleToolPanels?: string[];
}
