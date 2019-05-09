import * as Redux from 'redux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import { IMenuItem } from './Interface/IMenu';

export class MenuItemDoReduxAction implements IMenuItem {

    constructor(label: string,
        strategyId: string,
        action: Redux.Action,
        glyphIcon: string,
        isVisible: boolean) {
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
    public GlyphIcon: string


}


export class MenuItemShowPopup implements IMenuItem {
    constructor(label: string,
        strategyId: string,
        componentName: string,
        glyphIcon: string,
        isVisible: boolean,
        popupParams?: string,
    ) {
        this.Label = label;
        this.StrategyId = strategyId;
        this.IsVisible = isVisible;
        this.GlyphIcon = glyphIcon;
        this.Action = PopupRedux.PopupShowScreen(
            strategyId,
            componentName,
            popupParams)
    }
    public Action: Redux.Action;
    public Label: string;
    public StrategyId: string;
    public IsVisible: boolean;
    public GlyphIcon: string
}