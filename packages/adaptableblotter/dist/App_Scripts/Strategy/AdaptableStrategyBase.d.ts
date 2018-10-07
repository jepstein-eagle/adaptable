import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IStrategy } from './Interface/IStrategy';
import { IMenuItem } from '../Core/Interface/IMenu';
import { Action } from 'redux';
import { IEntitlement } from '../Core/Interface/Interfaces';
import { SearchChangedTrigger, StateChangedTrigger } from '../Core/Enums';
import { IRunTimeState } from '../Redux/ActionsReducers/Interface/IState';
export declare abstract class AdaptableStrategyBase implements IStrategy {
    Id: string;
    protected blotter: IAdaptableBlotter;
    constructor(Id: string, blotter: IAdaptableBlotter);
    InitializeWithRedux(): void;
    popupMenuItem: IMenuItem;
    protected InitState(): void;
    getPopupMenuItem(): IMenuItem;
    protected hasPopupMenu(): boolean;
    protected addPopupMenuItem(): void;
    addContextMenuItem(columnId: string): void;
    getStrategyEntitlement(): IEntitlement;
    isVisibleStrategy(): boolean;
    isReadOnlyStrategy(): boolean;
    createMenuItemShowPopup(Label: string, ComponentName: string, GlyphIcon: string, PopupParams?: string): void;
    createContextMenuItemReduxAction(Label: string, GlyphIcon: string, Action: Action): any;
    createContextMenuItemShowPopup(Label: string, ComponentName: string, GlyphIcon: string, PopupParams?: string): void;
    addContextMenuItemToStore(menuItem: IMenuItem): void;
    canCreateContextMenuItem(columnId: string, blotter: IAdaptableBlotter, functionType?: string): boolean;
    publishSearchChanged(searchChangedTrigger: SearchChangedTrigger): void;
    publishStateChanged(stateChangedTrigger: StateChangedTrigger, state: IRunTimeState): void;
}
