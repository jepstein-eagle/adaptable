import { ToolPanelState } from '../PredefinedConfig/ToolPanelState';

export interface ToolPanelApi {
  GetToolPanelState(): ToolPanelState;

  showToolPanelPopup(): void;
}
