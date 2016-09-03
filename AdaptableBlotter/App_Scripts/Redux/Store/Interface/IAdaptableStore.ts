import {PopupState,MenuState,SmartEditState,CustomSortState,GridState } from '../../ActionsReducers/Interface/IState';
export interface AdaptableBlotterState {
    Popup: PopupState;
    Menu: MenuState;
    SmartEdit: SmartEditState;
    CustomSort: CustomSortState;
    Grid: GridState;
}

export interface IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>
}