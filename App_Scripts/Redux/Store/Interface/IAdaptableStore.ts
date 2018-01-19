import * as AdaptableBlotterStates from '../../ActionsReducers/Interface/IState';
import * as Redux from 'redux';
import { AdaptableBlotter } from '../../../Vendors/Hypergrid/AdaptableBlotter';

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
    Range: AdaptableBlotterStates.RangeState;
    UIControlConfig: AdaptableBlotterStates.UIControlConfigState;
<<<<<<< HEAD
    FormatColumn: AdaptableBlotterStates.FormatColumnState;
=======
    TeamSharing: AdaptableBlotterStates.TeamSharingState;
>>>>>>> d8124607be5295d24aac33c46b01b2409145eb0c
}

export interface IAdaptableBlotterStore {
    TheStore: Redux.Store<AdaptableBlotterState>
    Load: PromiseLike<any>
}
