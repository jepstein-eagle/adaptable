import * as AdaptableBlotterStates from '../../../PredefinedConfig/IPredefinedConfig';
import * as Redux from 'redux';
import { PopupState } from '../../../PredefinedConfig/ISystemState Interfaces/PopupState';
import { MenuState } from '../../../PredefinedConfig/ISystemState Interfaces/MenuState';
import { GridState } from '../../../PredefinedConfig/ISystemState Interfaces/GridState';
import { SystemState } from '../../../PredefinedConfig/ISystemState Interfaces/SystemState';
import { EntitlementsState } from '../../../PredefinedConfig/IDesignTime State Interfaces/EntitlementsState';
import { UserInterfaceState } from '../../../PredefinedConfig/IDesignTime State Interfaces/UserInterfaceState';
import { SystemFilterState } from '../../../PredefinedConfig/IDesignTime State Interfaces/SystemFilterState';
import { AdvancedSearchState } from '../../../PredefinedConfig/IUserState Interfaces/AdvancedSearchState';
import { AlertState } from '../../../PredefinedConfig/IUserState Interfaces/AlertState';
import { BulkUpdateState } from '../../../PredefinedConfig/IUserState Interfaces/BulkUpdateState';
import { CalculatedColumnState } from '../../../PredefinedConfig/IUserState Interfaces/CalculatedColumnState';
import { CalendarState } from '../../../PredefinedConfig/IUserState Interfaces/CalendarState';
import { CellValidationState } from '../../../PredefinedConfig/IUserState Interfaces/CellValidationState';
import { ChartState } from '../../../PredefinedConfig/IUserState Interfaces/ChartState';
import { ColumnFilterState } from '../../../PredefinedConfig/IUserState Interfaces/ColumnFilterState';
import { ConditionalStyleState } from '../../../PredefinedConfig/IUserState Interfaces/ConditionalStyleState';
import { CustomSortState } from '../../../PredefinedConfig/IUserState Interfaces/CustomSortState';
import { DashboardState } from '../../../PredefinedConfig/IUserState Interfaces/DashboardState';
import { DataSourceState } from '../../../PredefinedConfig/IUserState Interfaces/DataSourceState';
import { ExportState } from '../../../PredefinedConfig/IUserState Interfaces/ExportState';
import { FlashingCellState } from '../../../PredefinedConfig/IUserState Interfaces/FlashingCellState';
import { FormatColumnState } from '../../../PredefinedConfig/IUserState Interfaces/FormatColumnState';
import { FreeTextColumnState } from '../../../PredefinedConfig/IUserState Interfaces/FreeTextColumnState';
import { LayoutState } from '../../../PredefinedConfig/IUserState Interfaces/LayoutState';
import { ColumnCategoryState } from '../../../PredefinedConfig/IUserState Interfaces/ColumnCategoryState';
import { PercentBarState } from '../../../PredefinedConfig/IUserState Interfaces/PercentBarState';
import { PlusMinusState } from '../../../PredefinedConfig/IUserState Interfaces/PlusMinusState';
import { QuickSearchState } from '../../../PredefinedConfig/IUserState Interfaces/QuickSearchState';
import { CellSummaryState } from '../../../PredefinedConfig/IUserState Interfaces/CellSummaryState';
import { ShortcutState } from '../../../PredefinedConfig/IUserState Interfaces/ShortcutState';
import { SmartEditState } from '../../../PredefinedConfig/IUserState Interfaces/SmartEditState';
import { TeamSharingState } from '../../../PredefinedConfig/ISystemState Interfaces/TeamSharingState';
import { ThemeState } from '../../../PredefinedConfig/IUserState Interfaces/ThemeState';
import { UserFilterState } from '../../../PredefinedConfig/IUserState Interfaces/UserFilterState';
import { ReminderState } from '../../../PredefinedConfig/IUserState Interfaces/ReminderState';
import { IState } from '../../../PredefinedConfig/Interfaces/IState';

export interface AdaptableBlotterState {
  [s: string]: IState;

  // internal state
  Popup: PopupState;
  Menu: MenuState;
  Grid: GridState;
  System: SystemState;

  // Set at design time only
  Entitlements: EntitlementsState;
  UserInterface: UserInterfaceState;
  SystemFilter: SystemFilterState;

  // Set at design time and / or run time => only state is persisted
  AdvancedSearch: AdvancedSearchState;
  Alert: AlertState;
  BulkUpdate: BulkUpdateState;
  CalculatedColumn: CalculatedColumnState;
  Calendar: CalendarState;
  CellValidation: CellValidationState;
  Chart: ChartState;
  ColumnFilter: ColumnFilterState;
  ConditionalStyle: ConditionalStyleState;
  CustomSort: CustomSortState;
  Dashboard: DashboardState;
  DataSource: DataSourceState;
  Export: ExportState;
  FlashingCell: FlashingCellState;
  FormatColumn: FormatColumnState;
  FreeTextColumn: FreeTextColumnState;
  Layout: LayoutState;
  ColumnCategory: ColumnCategoryState;
  PercentBar: PercentBarState;
  PlusMinus: PlusMinusState;
  QuickSearch: QuickSearchState;
  CellSummary: CellSummaryState;
  Shortcut: ShortcutState;
  SmartEdit: SmartEditState;
  TeamSharing: TeamSharingState;
  Theme: ThemeState;
  UserFilter: UserFilterState;
  Reminder: ReminderState;
}

export interface IAdaptableBlotterStore {
  TheStore: Redux.Store<AdaptableBlotterState>;
  Load: PromiseLike<any>;
}
