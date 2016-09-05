import {PopupState,MenuState,SmartEditState,CustomSortState,ShortcutState, GridState } from '../../ActionsReducers/Interface/IState';
export interface AdaptableBlotterState {
    Popup: PopupState;
    Menu: MenuState;
    SmartEdit: SmartEditState;
    CustomSort: CustomSortState;
    Shortcut: ShortcutState;
    Grid: GridState;
}

export interface IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>
}