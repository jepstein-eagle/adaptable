import * as AdaptableBlotterStates from '../../ActionsReducers/Interface/IState';
import * as Redux from 'redux';

export interface AdaptableBlotterState {
  [s: string]: AdaptableBlotterStates.IState;

  // internal state
  Popup: AdaptableBlotterStates.PopupState;
  Menu: AdaptableBlotterStates.MenuState;
  Grid: AdaptableBlotterStates.GridState;
  System: AdaptableBlotterStates.SystemState;

  // Set at design time only
  Entitlements: AdaptableBlotterStates.EntitlementsState;
  UserInterface: AdaptableBlotterStates.UserInterfaceState;
  SystemFilter: AdaptableBlotterStates.SystemFilterState;

  // Set at design time and / or run time => only state is persisted
  AdvancedSearch: AdaptableBlotterStates.AdvancedSearchState;
  Alert: AdaptableBlotterStates.AlertState;
  BulkUpdate: AdaptableBlotterStates.BulkUpdateState;
  CalculatedColumn: AdaptableBlotterStates.CalculatedColumnState;
  Calendar: AdaptableBlotterStates.CalendarState;
  CellValidation: AdaptableBlotterStates.CellValidationState;
  Chart: AdaptableBlotterStates.ChartState;
  ColumnFilter: AdaptableBlotterStates.ColumnFilterState;
  ConditionalStyle: AdaptableBlotterStates.ConditionalStyleState;
  CustomSort: AdaptableBlotterStates.CustomSortState;
  Dashboard: AdaptableBlotterStates.DashboardState;
  DataSource: AdaptableBlotterStates.DataSourceState;
  Export: AdaptableBlotterStates.ExportState;
  FlashingCell: AdaptableBlotterStates.FlashingCellState;
  FormatColumn: AdaptableBlotterStates.FormatColumnState;
  FreeTextColumn: AdaptableBlotterStates.FreeTextColumnState;
  Layout: AdaptableBlotterStates.LayoutState;
  ColumnCategory: AdaptableBlotterStates.ColumnCategoryState;
  PercentBar: AdaptableBlotterStates.PercentBarState;
  PlusMinus: AdaptableBlotterStates.PlusMinusState;
  QuickSearch: AdaptableBlotterStates.QuickSearchState;
  CellSummary: AdaptableBlotterStates.CellSummaryState;
  Shortcut: AdaptableBlotterStates.ShortcutState;
  SmartEdit: AdaptableBlotterStates.SmartEditState;
  TeamSharing: AdaptableBlotterStates.TeamSharingState;
  Theme: AdaptableBlotterStates.ThemeState;
  UserFilter: AdaptableBlotterStates.UserFilterState;
  Reminder: AdaptableBlotterStates.ReminderState;
}

export interface IAdaptableBlotterStore {
  TheStore: Redux.Store<AdaptableBlotterState>;
  Load: PromiseLike<any>;
}
