import * as Redux from 'redux';
import { PopupState } from '../../../PredefinedConfig/PopupState';
import { GridState } from '../../../PredefinedConfig/GridState';
import { SystemState } from '../../../PredefinedConfig/SystemState';
import { AdvancedSearchState } from '../../../PredefinedConfig/AdvancedSearchState';
import { AlertState } from '../../../PredefinedConfig/AlertState';
import { BulkUpdateState } from '../../../PredefinedConfig/BulkUpdateState';
import { CalculatedColumnState } from '../../../PredefinedConfig/CalculatedColumnState';
import { CalendarState } from '../../../PredefinedConfig/CalendarState';
import { CellValidationState } from '../../../PredefinedConfig/CellValidationState';
import { ChartState } from '../../../PredefinedConfig/ChartState';
import { ColumnFilterState } from '../../../PredefinedConfig/ColumnFilterState';
import { ConditionalStyleState } from '../../../PredefinedConfig/ConditionalStyleState';
import { CustomSortState } from '../../../PredefinedConfig/CustomSortState';
import { DashboardState } from '../../../PredefinedConfig/DashboardState';
import { DataSourceState } from '../../../PredefinedConfig/DataSourceState';
import { ExportState } from '../../../PredefinedConfig/ExportState';
import { FlashingCellState } from '../../../PredefinedConfig/FlashingCellState';
import { FormatColumnState } from '../../../PredefinedConfig/FormatColumnState';
import { FreeTextColumnState } from '../../../PredefinedConfig/FreeTextColumnState';
import { LayoutState } from '../../../PredefinedConfig/LayoutState';
import { ColumnCategoryState } from '../../../PredefinedConfig/ColumnCategoryState';
import { PercentBarState } from '../../../PredefinedConfig/PercentBarState';
import { PlusMinusState } from '../../../PredefinedConfig/PlusMinusState';
import { QuickSearchState } from '../../../PredefinedConfig/QuickSearchState';
import { CellSummaryState } from '../../../PredefinedConfig/CellSummaryState';
import { ShortcutState } from '../../../PredefinedConfig/ShortcutState';
import { SmartEditState } from '../../../PredefinedConfig/SmartEditState';
import { TeamSharingState } from '../../../PredefinedConfig/TeamSharingState';
import { ThemeState } from '../../../PredefinedConfig/ThemeState';
import { UserFilterState } from '../../../PredefinedConfig/UserFilterState';
import { ReminderState } from '../../../PredefinedConfig/ReminderState';
import { ConfigState } from '../../../PredefinedConfig/ConfigState';
import { EntitlementsState } from '../../../PredefinedConfig/EntitlementsState';
import { UserInterfaceState } from '../../../PredefinedConfig/UserInterfaceState';
import { SystemFilterState } from '../../../PredefinedConfig/SystemFilterState';
import { ActionColumnState } from '../../../PredefinedConfig/ActionColumnState';
import { SparklineColumnState } from '../../../PredefinedConfig/SparklineColumnState';
import { NamedFilterState } from '../../../PredefinedConfig/NamedFilterState';
import { PartnerConfigState } from '../../../PredefinedConfig/PartnerConfigState';
import { ApplicationState } from '../../../PredefinedConfig/ApplicationState';
import { UpdatedRowState } from '../../../PredefinedConfig/UpdatedRowState';

export interface AdaptableBlotterState {
  [s: string]: ConfigState;

  // internal state
  Popup: PopupState;
  Grid: GridState;
  System: SystemState;

  // Set at design time only

  ActionColumn: ActionColumnState;
  Entitlements: EntitlementsState;
  PartnerConfig: PartnerConfigState;
  NamedFilter: NamedFilterState;
  SparklineColumn: SparklineColumnState;
  SystemFilter: SystemFilterState;
  UserInterface: UserInterfaceState;

  // Set at design time and / or run time => only state is persisted
  Application: ApplicationState;
  AdvancedSearch: AdvancedSearchState;
  Alert: AlertState;
  BulkUpdate: BulkUpdateState;
  CalculatedColumn: CalculatedColumnState;
  Calendar: CalendarState;
  CellSummary: CellSummaryState;
  CellValidation: CellValidationState;
  Chart: ChartState;
  ColumnCategory: ColumnCategoryState;
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
  PercentBar: PercentBarState;
  PlusMinus: PlusMinusState;
  QuickSearch: QuickSearchState;
  Reminder: ReminderState;
  Shortcut: ShortcutState;
  SmartEdit: SmartEditState;
  TeamSharing: TeamSharingState;
  Theme: ThemeState;
  UpdatedRow: UpdatedRowState;
  UserFilter: UserFilterState;
}

export interface IAdaptableBlotterStore {
  TheStore: Redux.Store<AdaptableBlotterState>;
  Load: PromiseLike<any>;

  on: (eventName: string, callback: (data?: any) => any) => () => void;
  onAny: (callback: (data?: any) => any) => () => void;
  emit: (eventName: string, data: any) => Promise<any>;
}
