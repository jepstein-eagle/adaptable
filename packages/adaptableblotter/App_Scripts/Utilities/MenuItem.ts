import * as Redux from 'redux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/AdaptableBlotterMenuItem';

// A menu item which performs a Redux Action when it is clicke
export class MenuItemDoReduxAction implements AdaptableBlotterMenuItem {
  constructor(
    label: string,
    strategyId: string,
    action: Redux.Action,
    icon: string,
    isVisible: boolean
  ) {
    this.Label = label;
    this.StrategyId = strategyId;
    this.IsVisible = isVisible;
    this.Icon = icon;
    this.Action = action;
  }

  public Action: Redux.Action;
  public Label: string;
  public StrategyId: string;
  public IsVisible: boolean;
  public Icon: string;
}

// A menu item which shows a popup screen when it is clieked
export class MenuItemShowPopup implements AdaptableBlotterMenuItem {
  constructor(
    label: string,
    strategyId: string,
    componentName: string,
    icon: string,
    isVisible: boolean,
    popupParams?: StrategyParams
  ) {
    this.Label = label;
    this.StrategyId = strategyId;
    this.IsVisible = isVisible;
    this.Icon = icon;
    this.Action = PopupRedux.PopupShowScreen(strategyId, componentName, popupParams);
  }
  public Action: Redux.Action;
  public Label: string;
  public StrategyId: string;
  public IsVisible: boolean;
  public Icon: string;
}
