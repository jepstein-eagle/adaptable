import {PopupState,MenuState,SmartEditState } from '../../ActionsReducers/Interface/IState';
export interface AdaptableBlotterState {
    Popup: PopupState;
    Menu: MenuState;
    SmartEdit: SmartEditState;
}

export interface IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>
}