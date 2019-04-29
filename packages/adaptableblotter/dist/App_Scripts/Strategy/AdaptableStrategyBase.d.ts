import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IStrategy } from './Interface/IStrategy';
import { Action } from 'redux';
import { SearchChangedTrigger, StateChangedTrigger } from '../Utilities/Enums';
import { IEntitlement } from "../Utilities/Interface/IEntitlement";
import { IColumn } from '../Utilities/Interface/IColumn';
import { IUserState } from '../Redux/ActionsReducers/Interface/IState';
import { IMenuItem } from '../Utilities/Interface/IMenu';
/**
 * Base class for all strategies and does most of the work of creating menus
 * Each strategy is reponsible for managing state (through InitState())
 */
export declare abstract class AdaptableStrategyBase implements IStrategy {
    Id: string;
    protected blotter: IAdaptableBlotter;
    constructor(Id: string, blotter: IAdaptableBlotter);
    initializeWithRedux(): void;
    popupMenuItem: IMenuItem;
    protected InitState(): void;
    getPopupMenuItem(): IMenuItem;
    protected hasPopupMenu(): boolean;
    protected addPopupMenuItem(): void;
    addContextMenuItem(column: IColumn): void;
    getStrategyEntitlement(): IEntitlement;
    isVisibleStrategy(): boolean;
    isReadOnlyStrategy(): boolean;
    createMenuItemShowPopup(Label: string, ComponentName: string, GlyphIcon: string, PopupParams?: string): void;
    createContextMenuItemReduxAction(Label: string, GlyphIcon: string, Action: Action): any;
    createContextMenuItemShowPopup(Label: string, ComponentName: string, GlyphIcon: string, PopupParams?: string): void;
    private addContextMenuItemToStore;
    canCreateContextMenuItem(column: IColumn, blotter: IAdaptableBlotter, functionType?: string): boolean;
    /**
     * Each time any of the objects that make up search are changed (e.g. filters, quick search, advanced search, data sources etc.) we fire an event
     * This is primarily to help users who want to run search on the server and so need to know what has changed
     * @param searchChangedTrigger function that triggered the event
     */
    publishSearchChanged(searchChangedTrigger: SearchChangedTrigger): void;
    /**
     * An event which is triggered whenever User (as oppoesed to System) State is changed.
     * Its the responsibility of each function to fire the event when their state changes
     * @param stateChangedTrigger which function has triggered the event
     * @param state the current state of that function
     */
    publishStateChanged(stateChangedTrigger: StateChangedTrigger, state: IUserState): void;
}
