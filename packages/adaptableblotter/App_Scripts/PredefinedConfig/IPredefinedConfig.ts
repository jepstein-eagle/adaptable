import { EntitlementsState } from './IDesignTimeState/EntitlementsState';
import { UserInterfaceState } from './IDesignTimeState/UserInterfaceState';
import { SystemFilterState } from './IDesignTimeState/SystemFilterState';
import { ApplicationState } from './IDesignTimeState/ApplicationState';
import { AdvancedSearchState } from './IUserState/AdvancedSearchState';
import { AlertState } from './IUserState/AlertState';
import { BulkUpdateState } from './IUserState/BulkUpdateState';
import { CalculatedColumnState } from './IUserState/CalculatedColumnState';
import { CalendarState } from './IUserState/CalendarState';
import { CellSummaryState } from './IUserState/CellSummaryState';
import { CellValidationState } from './IUserState/CellValidationState';
import { ColumnCategoryState } from './IUserState/ColumnCategoryState';
import { ColumnFilterState } from './IUserState/ColumnFilterState';
import { ConditionalStyleState } from './IUserState/ConditionalStyleState';
import { CustomSortState } from './IUserState/CustomSortState';
import { DashboardState } from './IUserState/DashboardState';
import { DataSourceState } from './IUserState/DataSourceState';
import { ExportState } from './IUserState/ExportState';
import { FlashingCellState } from './IUserState/FlashingCellState';
import { FormatColumnState } from './IUserState/FormatColumnState';
import { FreeTextColumnState } from './IUserState/FreeTextColumnState';
import { LayoutState } from './IUserState/LayoutState';
import { PercentBarState } from './IUserState/PercentBarState';
import { PlusMinusState } from './IUserState/PlusMinusState';
import { QuickSearchState } from './IUserState/QuickSearchState';
import { ReminderState } from './IUserState/ReminderState';
import { ShortcutState } from './IUserState/ShortcutState';
import { SmartEditState } from './IUserState/SmartEditState';
import { ThemeState } from './IUserState/ThemeState';
import { UserFilterState } from './IUserState/UserFilterState';
import { ChartState } from './IUserState/ChartState';

/**
 * Main Predefined Config object which users will populate if they wish to ship the Adaptable Botter with initial state
 *
 * The object consists of a series of (nullable) properties that all implememt IState
 *
 */
export interface IPredefinedConfig {
  // First add the IDesignTimeState properties
  Entitlement?: EntitlementsState;
  UserInterface?: UserInterfaceState;
  SystemFilter?: SystemFilterState;
  Application?: ApplicationState;

  // Now addd the IUserState properties
  AdvancedSearch?: AdvancedSearchState;
  Alert?: AlertState;
  BulkUpdate?: BulkUpdateState;
  CalculatedColumn?: CalculatedColumnState;
  Calendar?: CalendarState;
  CellSummary?: CellSummaryState;
  CellValidation?: CellValidationState;
  Chart?: ChartState;
  ColumnCategory?: ColumnCategoryState;
  ColumnFilter?: ColumnFilterState;
  ConditionalStyle?: ConditionalStyleState;
  CustomSort?: CustomSortState;
  Dashboard?: DashboardState;
  DataSource?: DataSourceState;
  Export?: ExportState;
  FlashingCell?: FlashingCellState;
  FormatColumn?: FormatColumnState;
  FreeTextColumn?: FreeTextColumnState;
  Layout?: LayoutState;
  PercentBar?: PercentBarState;
  PlusMinus?: PlusMinusState;
  QuickSearch?: QuickSearchState;
  Reminder?: ReminderState;
  Shortcut?: ShortcutState;
  SmartEdit?: SmartEditState;
  Theme?: ThemeState;
  UserFilter?: UserFilterState;
}
