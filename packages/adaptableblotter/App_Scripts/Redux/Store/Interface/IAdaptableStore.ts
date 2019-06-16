import * as AdaptableBlotterStates from '../../../PredefinedConfig/IPredefinedConfig';
import * as Redux from 'redux';
import { PopupState } from '../../../PredefinedConfig/ISystemState/PopupState';
import { MenuState } from '../../../PredefinedConfig/ISystemState/MenuState';
import { GridState } from '../../../PredefinedConfig/ISystemState/GridState';
import { SystemState } from '../../../PredefinedConfig/ISystemState/SystemState';
import { AdvancedSearchState } from '../../../PredefinedConfig/IUserState/AdvancedSearchState';
import { AlertState } from '../../../PredefinedConfig/IUserState/AlertState';
import { BulkUpdateState } from '../../../PredefinedConfig/IUserState/BulkUpdateState';
import { CalculatedColumnState } from '../../../PredefinedConfig/IUserState/CalculatedColumnState';
import { CalendarState } from '../../../PredefinedConfig/IUserState/CalendarState';
import { CellValidationState } from '../../../PredefinedConfig/IUserState/CellValidationState';
import { ChartState } from '../../../PredefinedConfig/IUserState/ChartState';
import { ColumnFilterState } from '../../../PredefinedConfig/IUserState/ColumnFilterState';
import { ConditionalStyleState } from '../../../PredefinedConfig/IUserState/ConditionalStyleState';
import { CustomSortState } from '../../../PredefinedConfig/IUserState/CustomSortState';
import { DashboardState } from '../../../PredefinedConfig/IUserState/DashboardState';
import { DataSourceState } from '../../../PredefinedConfig/IUserState/DataSourceState';
import { ExportState } from '../../../PredefinedConfig/IUserState/ExportState';
import { FlashingCellState } from '../../../PredefinedConfig/IUserState/FlashingCellState';
import { FormatColumnState } from '../../../PredefinedConfig/IUserState/FormatColumnState';
import { FreeTextColumnState } from '../../../PredefinedConfig/IUserState/FreeTextColumnState';
import { LayoutState } from '../../../PredefinedConfig/IUserState/LayoutState';
import { ColumnCategoryState } from '../../../PredefinedConfig/IUserState/ColumnCategoryState';
import { PercentBarState } from '../../../PredefinedConfig/IUserState/PercentBarState';
import { PlusMinusState } from '../../../PredefinedConfig/IUserState/PlusMinusState';
import { QuickSearchState } from '../../../PredefinedConfig/IUserState/QuickSearchState';
import { CellSummaryState } from '../../../PredefinedConfig/IUserState/CellSummaryState';
import { ShortcutState } from '../../../PredefinedConfig/IUserState/ShortcutState';
import { SmartEditState } from '../../../PredefinedConfig/IUserState/SmartEditState';
import { TeamSharingState } from '../../../PredefinedConfig/ISystemState/TeamSharingState';
import { ThemeState } from '../../../PredefinedConfig/IUserState/ThemeState';
import { UserFilterState } from '../../../PredefinedConfig/IUserState/UserFilterState';
import { ReminderState } from '../../../PredefinedConfig/IUserState/ReminderState';
import { IState } from '../../../PredefinedConfig/IState';
import { EntitlementsState } from '../../../PredefinedConfig/IDesignTimeState/EntitlementsState';
import { UserInterfaceState } from '../../../PredefinedConfig/IDesignTimeState/UserInterfaceState';
import { SystemFilterState } from '../../../PredefinedConfig/IDesignTimeState/SystemFilterState';

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
