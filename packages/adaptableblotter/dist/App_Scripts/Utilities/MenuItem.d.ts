import * as Redux from 'redux';
import { IMenuItem } from './Interface/IMenu';
export declare class MenuItemDoReduxAction implements IMenuItem {
    Label: string;
    StrategyId: string;
    Action: Redux.Action;
    GlyphIcon: string;
    IsVisible: boolean;
    constructor(Label: string, StrategyId: string, Action: Redux.Action, GlyphIcon: string, IsVisible: boolean);
}
export declare class MenuItemShowPopup implements IMenuItem {
    Label: string;
    StrategyId: string;
    private ComponentName;
    GlyphIcon: string;
    IsVisible: boolean;
    private PopupParams?;
    constructor(Label: string, StrategyId: string, ComponentName: string, GlyphIcon: string, IsVisible: boolean, PopupParams?: string);
    Action: Redux.Action;
}
