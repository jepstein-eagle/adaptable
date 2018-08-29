"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
class MenuItemDoReduxAction {
    constructor(Label, StrategyId, Action, GlyphIcon, IsReadOnly, IsVisible) {
        this.Label = Label;
        this.StrategyId = StrategyId;
        this.Action = Action;
        this.GlyphIcon = GlyphIcon;
        this.IsReadOnly = IsReadOnly;
        this.IsVisible = IsVisible;
    }
    ;
}
exports.MenuItemDoReduxAction = MenuItemDoReduxAction;
class MenuItemShowPopup {
    constructor(Label, StrategyId, ComponentName, GlyphIcon, IsReadOnly, IsVisible, PopupParams) {
        this.Label = Label;
        this.StrategyId = StrategyId;
        this.ComponentName = ComponentName;
        this.GlyphIcon = GlyphIcon;
        this.IsReadOnly = IsReadOnly;
        this.IsVisible = IsVisible;
        this.PopupParams = PopupParams;
        this.Action = PopupRedux.PopupShowScreen(ComponentName, this.IsReadOnly, this.PopupParams);
    }
}
exports.MenuItemShowPopup = MenuItemShowPopup;
