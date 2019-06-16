import { EntitlementsState } from './DesignTimeState/EntitlementsState';
import { UserInterfaceState } from './DesignTimeState/UserInterfaceState';
import { SystemFilterState } from './DesignTimeState/SystemFilterState';
import { ApplicationState } from './DesignTimeState/ApplicationState';
import { AdvancedSearchState } from './RunTimeState/AdvancedSearchState';
import { AlertState } from './RunTimeState/AlertState';
import { BulkUpdateState } from './RunTimeState/BulkUpdateState';
import { CalculatedColumnState } from './RunTimeState/CalculatedColumnState';
import { CalendarState } from './RunTimeState/CalendarState';
import { CellSummaryState } from './RunTimeState/CellSummaryState';
import { CellValidationState } from './RunTimeState/CellValidationState';
import { ColumnCategoryState } from './RunTimeState/ColumnCategoryState';
import { ColumnFilterState } from './RunTimeState/ColumnFilterState';
import { ConditionalStyleState } from './RunTimeState/ConditionalStyleState';
import { CustomSortState } from './RunTimeState/CustomSortState';
import { DashboardState } from './RunTimeState/DashboardState';
import { DataSourceState } from './RunTimeState/DataSourceState';
import { ExportState } from './RunTimeState/ExportState';
import { FlashingCellState } from './RunTimeState/FlashingCellState';
import { FormatColumnState } from './RunTimeState/FormatColumnState';
import { FreeTextColumnState } from './RunTimeState/FreeTextColumnState';
import { LayoutState } from './RunTimeState/LayoutState';
import { PercentBarState } from './RunTimeState/PercentBarState';
import { PlusMinusState } from './RunTimeState/PlusMinusState';
import { QuickSearchState } from './RunTimeState/QuickSearchState';
import { ReminderState } from './RunTimeState/ReminderState';
import { ShortcutState } from './RunTimeState/ShortcutState';
import { SmartEditState } from './RunTimeState/SmartEditState';
import { ThemeState } from './RunTimeState/ThemeState';
import { UserFilterState } from './RunTimeState/UserFilterState';
import { ChartState } from './RunTimeState/ChartState';

/**
 * Main Predefined Config object which users will populate if they wish to ship the Adaptable Botter with initial state
 *
 * The object consists of a series of (nullable) properties that all implememt IState
 *
 */
export interface IPredefinedConfig {
  // First add the DesignTimeState properties
  Entitlement?: EntitlementsState;
  UserInterface?: UserInterfaceState;
  SystemFilter?: SystemFilterState;
  Application?: ApplicationState;

  // Now addd the RunTimeState properties
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
