import {PopupState,MenuState,SmartEditState,CustomSortState } from '../../ActionsReducers/Interface/IState';
export interface AdaptableBlotterState {
    Popup: PopupState;
    Menu: MenuState;
    SmartEdit: SmartEditState;
    CustomSort: CustomSortState;
}

export interface IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>
}