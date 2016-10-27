import * as AdaptableBlotterStates from '../../ActionsReducers/Interface/IState';
export interface AdaptableBlotterState {
    Popup: AdaptableBlotterStates.PopupState;
    Menu: AdaptableBlotterStates.MenuState;
    SmartEdit: AdaptableBlotterStates.SmartEditState;
    CustomSort: AdaptableBlotterStates.CustomSortState;
    Shortcut: AdaptableBlotterStates.ShortcutState;
    Grid: AdaptableBlotterStates.GridState;
    PlusMinus: AdaptableBlotterStates.PlusMinusState;
    Export: AdaptableBlotterStates.ExcelExportState;
    FlashingCell: AdaptableBlotterStates.FlashingCellState;
    Calendars: AdaptableBlotterStates.CalendarState;
}

export interface IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>
}
