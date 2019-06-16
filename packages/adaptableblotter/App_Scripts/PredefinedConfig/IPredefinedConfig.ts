import { EntitlementsState } from './IDesignTime State Interfaces/EntitlementsState';
import { UserInterfaceState } from './IDesignTime State Interfaces/UserInterfaceState';
import { SystemFilterState } from './IDesignTime State Interfaces/SystemFilterState';
import { ApplicationState } from './IDesignTime State Interfaces/ApplicationState';
import { AdvancedSearchState } from './IUserState Interfaces/AdvancedSearchState';
import { AlertState } from './IUserState Interfaces/AlertState';
import { BulkUpdateState } from './IUserState Interfaces/BulkUpdateState';
import { CalculatedColumnState } from './IUserState Interfaces/CalculatedColumnState';
import { CalendarState } from './IUserState Interfaces/CalendarState';
import { CellSummaryState } from './IUserState Interfaces/CellSummaryState';
import { CellValidationState } from './IUserState Interfaces/CellValidationState';
import { ColumnCategoryState } from './IUserState Interfaces/ColumnCategoryState';
import { ColumnFilterState } from './IUserState Interfaces/ColumnFilterState';
import { ConditionalStyleState } from './IUserState Interfaces/ConditionalStyleState';
import { CustomSortState } from './IUserState Interfaces/CustomSortState';
import { DashboardState } from './IUserState Interfaces/DashboardState';
import { DataSourceState } from './IUserState Interfaces/DataSourceState';
import { ExportState } from './IUserState Interfaces/ExportState';
import { FlashingCellState } from './IUserState Interfaces/FlashingCellState';
import { FormatColumnState } from './IUserState Interfaces/FormatColumnState';
import { FreeTextColumnState } from './IUserState Interfaces/FreeTextColumnState';
import { LayoutState } from './IUserState Interfaces/LayoutState';
import { PercentBarState } from './IUserState Interfaces/PercentBarState';
import { PlusMinusState } from './IUserState Interfaces/PlusMinusState';
import { QuickSearchState } from './IUserState Interfaces/QuickSearchState';
import { ReminderState } from './IUserState Interfaces/ReminderState';
import { ShortcutState } from './IUserState Interfaces/ShortcutState';
import { SmartEditState } from './IUserState Interfaces/SmartEditState';
import { ThemeState } from './IUserState Interfaces/ThemeState';
import { UserFilterState } from './IUserState Interfaces/UserFilterState';
import { ChartState } from './IUserState Interfaces/ChartState';

/**
 * Main Predefined Config object
 * Made up a sereis of nullable IState objects
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
