import { RunTimeState } from './RunTimeState';
import { AdaptableToolPanels, AdaptableFunctionButtons } from './Common/Types';

export interface ToolPanelState extends RunTimeState {
  AvailableToolPanels?: AdaptableToolPanels;
  VisibleToolPanels?: AdaptableToolPanels;
  VisibleButtons?: AdaptableFunctionButtons;

  ShowGridInfoButton?: boolean;

  ShowFunctionsDropdown?: boolean;

  ShowColumnsDropdown?: boolean;

  ShowToolPanelsDropdown?: boolean;
}
