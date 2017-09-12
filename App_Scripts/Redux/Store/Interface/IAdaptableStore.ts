import * as AdaptableBlotterStates from '../../ActionsReducers/Interface/IState';
import * as Redux from 'redux';

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
    Filter: AdaptableBlotterStates.FilterState;
    Theme: AdaptableBlotterStates.ThemeState;
    CellValidation: AdaptableBlotterStates.CellValidationState;
    Layout: AdaptableBlotterStates.LayoutState;
    Dashboard: AdaptableBlotterStates.DashboardState;
    Entitlements: AdaptableBlotterStates.EntitlementsState;
    CalculatedColumn: AdaptableBlotterStates.CalculatedColumnState;
}

export interface IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>
    Load: PromiseLike<any>
}
