import * as Redux from 'redux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import { AdaptableBlotterMenuItem } from './Interface/AdaptableBlotterMenu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class MenuItemDoReduxAction implements AdaptableBlotterMenuItem {
  constructor(
    label: string,
    strategyId: string,
    action: Redux.Action,
    glyphIcon: string,
    isVisible: boolean
  ) {
    this.Label = label;
    this.StrategyId = strategyId;
    this.IsVisible = isVisible;
    this.GlyphIcon = glyphIcon;
    this.Action = action;
  }

  public Action: Redux.Action;
  public Label: string;
  public StrategyId: string;
  public IsVisible: boolean;
  public GlyphIcon: string;
}

export class MenuItemShowPopup implements AdaptableBlotterMenuItem {
  constructor(
    label: string,
    strategyId: string,
    componentName: string,
    glyphIcon: string,
    isVisible: boolean,
    popupParams?: StrategyParams
  ) {
    this.Label = label;
    this.StrategyId = strategyId;
    this.IsVisible = isVisible;
    this.GlyphIcon = glyphIcon;
    this.Action = PopupRedux.PopupShowScreen(strategyId, componentName, popupParams);
  }
  public Action: Redux.Action;
  public Label: string;
  public StrategyId: string;
  public IsVisible: boolean;
  public GlyphIcon: string;
}
