import { ApiBase } from './ApiBase';
import { ToolPanelApi } from '../ToolPanelApi';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ToolPanelState } from '../../PredefinedConfig/ToolPanelState';

export class ToolPanelApiImpl extends ApiBase implements ToolPanelApi {
  public GetToolPanelState(): ToolPanelState {
    return this.getAdaptableState().ToolPanel;
  }

  public showToolPanelPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ToolPanelStrategyId,
      ScreenPopups.ToolPanelPopup
    );
  }
}
