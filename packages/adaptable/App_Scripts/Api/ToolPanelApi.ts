import { ToolPanelState } from '../PredefinedConfig/ToolPanelState';
import {
  AdaptableToolPanels,
  AdaptableToolPanel,
  AdaptableFunctionButtons,
} from '../PredefinedConfig/Common/Types';

export interface ToolPanelApi {
  GetToolPanelState(): ToolPanelState;
  // SetAvailableToolbars(availableToolbars: AdaptableToolPanels): void;
  // SetVisibleToolbars(visibleToolbars: AdaptableToolPanels): void;
  //  ShowToolbar(visibleToolbar: AdaptableToolPanel): void;
  //  HideToolbar(visibleToolbar: AdaptableToolPanel): void;
  //  SetVisibleButtons(functionButtons: AdaptableFunctionButtons): void;
  //  SetVisibility(ToolPanelVisibility: 'Minimised' | 'Visible' | 'Hidden'): void;
  //  Show(): void;
  //  Hide(): void;
  //  ShowFunctionsDropdown(): void;
  //  HideFunctionsDropdown(): void;
  //  ShowToolbarsDropdown(): void;
  //  HideToolbarsDropdown(): void;
  showToolPanelPopup(): void;
}
