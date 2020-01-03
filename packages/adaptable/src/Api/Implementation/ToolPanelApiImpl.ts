import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import * as ApplicationRedux from '../../Redux/ActionsReducers/ApplicationRedux';
import { ApiBase } from './ApiBase';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import { ToolPanelApi } from '../ToolPanelApi';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import {
  AdaptableFunctionButtons,
  AdaptableToolPanels,
  AdaptableToolPanel,
} from '../../PredefinedConfig/Common/Types';
import { ToolPanelState } from '../../PredefinedConfig/ToolPanelState';

export class ToolPanelApiImpl extends ApiBase implements ToolPanelApi {
  public GetToolPanelState(): ToolPanelState {
    return this.getAdaptableState().ToolPanel;
  }
  /*
  public SetAvailableToolbars(availableToolbars: AdaptableToolPanels): void {
  //  this.dispatchAction(ToolPanelRedux.ToolPanelSetAvailableToolbars(availableToolbars));
  }

  public SetVisibleToolbars(visibleToolbars: AdaptableToolPanels): void {
  //  visibleToolbars.forEach((vt: AdaptableToolPanelToolbar) => {
  //    this.ShowToolbar(vt);
  //  });
  }

  public ShowToolbar(visibleToolbar: AdaptableToolPanel): void {
  //  this.dispatchAction(ToolPanelRedux.ToolPanelShowToolbar(visibleToolbar));
  }

  public HideToolbar(visibleToolbar: AdaptableToolPanel): void {
  //  this.dispatchAction(ToolPanelRedux.ToolPanelHideToolbar(visibleToolbar));
  }

  public SetVisibleButtons(functionButtons: AdaptableFunctionButtons): void {
   // this.dispatchAction(ToolPanelRedux.ToolPanelSetFunctionButtons(functionButtons));
  }

  public SetVisibility(ToolPanelVisibility: 'Minimised' | 'Visible' | 'Hidden'): void {
  //  this.dispatchAction(ToolPanelRedux.ToolPanelSetVisibility(ToolPanelVisibility as Visibility));
  }

  public Show(): void {
 //   this.SetVisibility(Visibility.Visible);
  }

  public Hide(): void {
  //  this.SetVisibility(Visibility.Hidden);
  }


  public ShowFunctionsDropdown(): void {
    // this.dispatchAction(ToolPanelRedux.ToolPanelShowFunctionsDropdown());
  }

  public HideFunctionsDropdown(): void {
    // this.dispatchAction(ToolPanelRedux.ToolPanelHideFunctionsDropdown());
  }

  public ShowToolbarsDropdown(): void {
    //  this.dispatchAction(ToolPanelRedux.ToolPanelShowToolbarsDropdown());
  }

  public HideToolbarsDropdown(): void {
    //  this.dispatchAction(ToolPanelRedux.ToolPanelHideToolbarsDropdown());
  }
*/
  public showToolPanelPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ToolPanelId,
      ScreenPopups.ToolPanelPopup
    );
  }
}
