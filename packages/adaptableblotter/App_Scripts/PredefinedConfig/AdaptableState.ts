import { PopupState } from './PopupState';
import { GridState } from './GridState';
import { SystemState } from './SystemState';
import { AdvancedSearchState } from './AdvancedSearchState';
import { AlertState } from './AlertState';
import { BulkUpdateState } from './BulkUpdateState';
import { CalculatedColumnState } from './CalculatedColumnState';
import { CalendarState } from './CalendarState';
import { CellValidationState } from './CellValidationState';
import { ChartState } from './ChartState';
import { ColumnFilterState } from './ColumnFilterState';
import { ConditionalStyleState } from './ConditionalStyleState';
import { CustomSortState } from './CustomSortState';
import { DashboardState } from './DashboardState';
import { DataSourceState } from './DataSourceState';
import { ExportState } from './ExportState';
import { FlashingCellState } from './FlashingCellState';
import { FormatColumnState } from './FormatColumnState';
import { FreeTextColumnState } from './FreeTextColumnState';
import { LayoutState } from './LayoutState';
import { ColumnCategoryState } from './ColumnCategoryState';
import { PercentBarState } from './PercentBarState';
import { PlusMinusState } from './PlusMinusState';
import { QuickSearchState } from './QuickSearchState';
import { CellSummaryState } from './CellSummaryState';
import { ShortcutState } from './ShortcutState';
import { SmartEditState } from './SmartEditState';
import { TeamSharingState } from './TeamSharingState';
import { ThemeState } from './ThemeState';
import { UserFilterState } from './UserFilterState';
import { ReminderState } from './ReminderState';
import { ConfigState } from './ConfigState';
import { EntitlementsState } from './EntitlementsState';
import { UserInterfaceState } from './UserInterfaceState';
import { SystemFilterState } from './SystemFilterState';
import { ActionColumnState } from './ActionColumnState';
import { SparklineColumnState } from './SparklineColumnState';
import { NamedFilterState } from './NamedFilterState';
import { PartnerState } from './PartnerState';
import { ApplicationState } from './ApplicationState';
import { UpdatedRowState } from './UpdatedRowState';
import { SystemStatusState } from './SystemStatusState';
import { ToolPanelState } from './ToolPanelState';

/**
 * The main state object that the Adaptable persists
 */
export interface AdaptableState {
  [s: string]: ConfigState;

  // internal state
  Popup: PopupState;
  Grid: GridState;
  System: SystemState;

  // Set at design time only
  ActionColumn: ActionColumnState;
  Entitlements: EntitlementsState;
  Partner: PartnerState;
  NamedFilter: NamedFilterState;
  SparklineColumn: SparklineColumnState;
  SystemFilter: SystemFilterState;
  SystemStatus: SystemStatusState;
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
  ToolPanel: ToolPanelState;
  UpdatedRow: UpdatedRowState;
  UserFilter: UserFilterState;
}
