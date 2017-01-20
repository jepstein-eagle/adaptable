import * as AdaptableBlotterStates from '../../ActionsReducers/Interface/IState';
export interface AdaptableBlotterState {
    Popup: AdaptableBlotterStates.PopupState;
    Menu: AdaptableBlotterStates.MenuState;
    SmartEdit: AdaptableBlotterStates.SmartEditState;
    CustomSort: AdaptableBlotterStates.CustomSortState;
    Shortcut: AdaptableBlotterStates.ShortcutState;
    Grid: AdaptableBlotterStates.GridState;
    PlusMinus: AdaptableBlotterStates.PlusMinusState;
    ConditionalStyle: AdaptableBlotterStates.ConditionalStyleState;
    Export: AdaptableBlotterStates.ExportState;
    FlashingCell: AdaptableBlotterStates.FlashingCellState;
    Calendars: AdaptableBlotterStates.CalendarState;
    QuickSearch: AdaptableBlotterStates.QuickSearchState;
    AdvancedSearch: AdaptableBlotterStates.AdvancedSearchState;
    Alert: AdaptableBlotterStates.AlertState;
    UserFilter: AdaptableBlotterStates.UserFilterState;
    ColumnFilter: AdaptableBlotterStates.ColumnFilterState;
    Theme: AdaptableBlotterStates.ThemeState;
}

export interface IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>
}
