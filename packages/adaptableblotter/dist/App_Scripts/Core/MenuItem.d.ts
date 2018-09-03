import { IMenuItem } from './Interface/IMenu';
import * as Redux from 'redux';
export declare class MenuItemDoReduxAction implements IMenuItem {
    Label: string;
    StrategyId: string;
    Action: Redux.Action;
    GlyphIcon: string;
    IsReadOnly: boolean;
    IsVisible: boolean;
    constructor(Label: string, StrategyId: string, Action: Redux.Action, GlyphIcon: string, IsReadOnly: boolean, IsVisible: boolean);
}
export declare class MenuItemShowPopup implements IMenuItem {
    Label: string;
    StrategyId: string;
    private ComponentName;
    GlyphIcon: string;
    IsReadOnly: boolean;
    IsVisible: boolean;
    private PopupParams?;
    constructor(Label: string, StrategyId: string, ComponentName: string, GlyphIcon: string, IsReadOnly: boolean, IsVisible: boolean, PopupParams?: string);
    Action: Redux.Action;
}
