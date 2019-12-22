import * as Redux from 'redux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { AdaptableFunctionName } from '../Api/ConfigApi';
import { func } from 'prop-types';

// A menu item which performs a Redux Action when it is clicke
export class MenuItemDoReduxAction implements AdaptableMenuItem {
  constructor(
    label: string,
    functionName: AdaptableFunctionName,
    reduxAaction: Redux.Action,
    icon: string,
    isVisible: boolean
  ) {
    this.Label = label;
    this.FunctionName = functionName;
    this.IsVisible = isVisible;
    this.Icon = icon;
    this.ReduxAction = reduxAaction;
  }

  public ReduxAction: Redux.Action;
  public Label: string;
  public FunctionName: AdaptableFunctionName;
  public IsVisible: boolean;
  public Icon: string;
}

export class MenuItemDoClickFunction implements AdaptableMenuItem {
  constructor(
    label: string,
    functionName: AdaptableFunctionName,
    clickFunction: () => void,
    icon: string,
    isVisible: boolean
  ) {
    this.Label = label;
    this.FunctionName = functionName;
    this.IsVisible = isVisible;
    this.Icon = icon;
    this.ClickFunction = clickFunction;
  }

  public ClickFunction: () => void;
  public Label: string;
  public FunctionName: AdaptableFunctionName;
  public IsVisible: boolean;
  public Icon: string;
}

// A menu item which shows a popup screen when it is clieked
export class MenuItemShowPopup implements AdaptableMenuItem {
  constructor(
    label: string,
    functionName: AdaptableFunctionName,
    componentName: string,
    icon: string,
    isVisible: boolean,
    popupParams?: StrategyParams
  ) {
    this.Label = label;
    this.FunctionName = functionName;
    this.IsVisible = isVisible;
    this.Icon = icon;
    this.ReduxAction = PopupRedux.PopupShowScreen(functionName, componentName, popupParams);
  }
  public ReduxAction: Redux.Action;
  public Label: string;
  public FunctionName: AdaptableFunctionName;
  public IsVisible: boolean;
  public Icon: string;
}
