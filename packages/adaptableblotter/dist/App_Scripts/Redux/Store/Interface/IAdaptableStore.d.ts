import * as AdaptableBlotterStates from '../../ActionsReducers/Interface/IState';
import * as Redux from 'redux';
export interface AdaptableBlotterState {
    Popup: AdaptableBlotterStates.PopupState;
    Menu: AdaptableBlotterStates.MenuState;
    Grid: AdaptableBlotterStates.GridState;
    Entitlements: AdaptableBlotterStates.EntitlementsState;
    UserInterface: AdaptableBlotterStates.UserInterfaceState;
    About: AdaptableBlotterStates.AboutState;
    AdvancedSearch: AdaptableBlotterStates.AdvancedSearchState;
    Alert: AdaptableBlotterStates.AlertState;
    BulkUpdate: AdaptableBlotterStates.BulkUpdateState;
    CalculatedColumn: AdaptableBlotterStates.CalculatedColumnState;
    Calendar: AdaptableBlotterStates.CalendarState;
    CellValidation: AdaptableBlotterStates.CellValidationState;
    Chart: AdaptableBlotterStates.ChartState;
    ConditionalStyle: AdaptableBlotterStates.ConditionalStyleState;
    CustomSort: AdaptableBlotterStates.CustomSortState;
    Dashboard: AdaptableBlotterStates.DashboardState;
    DataSource: AdaptableBlotterStates.DataSourceState;
    Export: AdaptableBlotterStates.ExportState;
    Filter: AdaptableBlotterStates.FilterState;
    FlashingCell: AdaptableBlotterStates.FlashingCellState;
    FormatColumn: AdaptableBlotterStates.FormatColumnState;
    Layout: AdaptableBlotterStates.LayoutState;
    PlusMinus: AdaptableBlotterStates.PlusMinusState;
    QuickSearch: AdaptableBlotterStates.QuickSearchState;
    SelectedCells: AdaptableBlotterStates.SelectedCellsState;
    Shortcut: AdaptableBlotterStates.ShortcutState;
    SmartEdit: AdaptableBlotterStates.SmartEditState;
    TeamSharing: AdaptableBlotterStates.TeamSharingState;
    Theme: AdaptableBlotterStates.ThemeState;
}
export interface IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>;
    Load: PromiseLike<any>;
}
