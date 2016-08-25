interface AdaptableBlotterState {
    Popup: PopupState;
    Menu: MenuState;
    SmartEdit: SmartEditState;
}

interface IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>
}