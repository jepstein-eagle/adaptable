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
import { EntitlementState } from './EntitlementState';
import { UserInterfaceState } from './UserInterfaceState';
import { SystemFilterState } from './SystemFilterState';
import { ActionColumnState } from './ActionColumnState';
import { SparklineColumnState } from './SparklineColumnState';
import { NamedFilterState } from './NamedFilterState';
import { IPushPullState } from './IPushPullState';
import { Glue42State } from './Glue42State';
import { ApplicationState } from './ApplicationState';
import { UpdatedRowState } from './UpdatedRowState';
import { SystemStatusState } from './SystemStatusState';
import { ToolPanelState } from './ToolPanelState';
import { GradientColumnState } from './GradientColumnState';

/**
 * The main state object that Adaptable persists
 */
export interface AdaptableState {
  [s: string]: ConfigState;

  // internal state
  Popup: PopupState;
  Grid: GridState;
  System: SystemState;
  Plugins: {
    [key: string]: any;
  };

  // Set at design time only
  ActionColumn: ActionColumnState;
  Application: ApplicationState;
  Entitlements: EntitlementState;
  NamedFilter: NamedFilterState;
  IPushPull: IPushPullState;
  Glue42: Glue42State;
  SparklineColumn: SparklineColumnState;
  SystemFilter: SystemFilterState;
  SystemStatus: SystemStatusState;
  UserInterface: UserInterfaceState;

  // not sure yet about this one - was runtie but now design?
  CellSummary: CellSummaryState;

  // Set at design time and / or run time => only state which is persisted
  AdvancedSearch: AdvancedSearchState;
  Alert: AlertState;
  BulkUpdate: BulkUpdateState;
  CalculatedColumn: CalculatedColumnState;
  Calendar: CalendarState;

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
  GradientColumn: GradientColumnState;
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
