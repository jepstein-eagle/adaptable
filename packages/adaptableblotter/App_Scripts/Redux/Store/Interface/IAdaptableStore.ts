import * as AdaptableBlotterStates from '../../../PredefinedConfig/IPredefinedConfig';
import * as Redux from 'redux';
import { PopupState } from '../../../PredefinedConfig/InternalState/PopupState';
import { MenuState } from '../../../PredefinedConfig/InternalState/MenuState';
import { GridState } from '../../../PredefinedConfig/InternalState/GridState';
import { SystemState } from '../../../PredefinedConfig/InternalState/SystemState';
import { AdvancedSearchState } from '../../../PredefinedConfig/RunTimeState/AdvancedSearchState';
import { AlertState } from '../../../PredefinedConfig/RunTimeState/AlertState';
import { BulkUpdateState } from '../../../PredefinedConfig/RunTimeState/BulkUpdateState';
import { CalculatedColumnState } from '../../../PredefinedConfig/RunTimeState/CalculatedColumnState';
import { CalendarState } from '../../../PredefinedConfig/RunTimeState/CalendarState';
import { CellValidationState } from '../../../PredefinedConfig/RunTimeState/CellValidationState';
import { ChartState } from '../../../PredefinedConfig/RunTimeState/ChartState';
import { ColumnFilterState } from '../../../PredefinedConfig/RunTimeState/ColumnFilterState';
import { ConditionalStyleState } from '../../../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { CustomSortState } from '../../../PredefinedConfig/RunTimeState/CustomSortState';
import { DashboardState } from '../../../PredefinedConfig/RunTimeState/DashboardState';
import { DataSourceState } from '../../../PredefinedConfig/RunTimeState/DataSourceState';
import { ExportState } from '../../../PredefinedConfig/RunTimeState/ExportState';
import { FlashingCellState } from '../../../PredefinedConfig/RunTimeState/FlashingCellState';
import { FormatColumnState } from '../../../PredefinedConfig/RunTimeState/FormatColumnState';
import { FreeTextColumnState } from '../../../PredefinedConfig/RunTimeState/FreeTextColumnState';
import { LayoutState } from '../../../PredefinedConfig/RunTimeState/LayoutState';
import { ColumnCategoryState } from '../../../PredefinedConfig/RunTimeState/ColumnCategoryState';
import { PercentBarState } from '../../../PredefinedConfig/RunTimeState/PercentBarState';
import { PlusMinusState } from '../../../PredefinedConfig/RunTimeState/PlusMinusState';
import { QuickSearchState } from '../../../PredefinedConfig/RunTimeState/QuickSearchState';
import { CellSummaryState } from '../../../PredefinedConfig/RunTimeState/CellSummaryState';
import { ShortcutState } from '../../../PredefinedConfig/RunTimeState/ShortcutState';
import { SmartEditState } from '../../../PredefinedConfig/RunTimeState/SmartEditState';
import { TeamSharingState } from '../../../PredefinedConfig/InternalState/TeamSharingState';
import { ThemeState } from '../../../PredefinedConfig/RunTimeState/ThemeState';
import { UserFilterState } from '../../../PredefinedConfig/RunTimeState/UserFilterState';
import { ReminderState } from '../../../PredefinedConfig/RunTimeState/ReminderState';
import { IState } from '../../../PredefinedConfig/IState';
import { EntitlementsState } from '../../../PredefinedConfig/DesignTimeState/EntitlementsState';
import { UserInterfaceState } from '../../../PredefinedConfig/DesignTimeState/UserInterfaceState';
import { SystemFilterState } from '../../../PredefinedConfig/DesignTimeState/SystemFilterState';

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
