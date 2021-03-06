import { PopupState } from './PopupState';
import { GridState } from './GridState';
import { SystemState } from './SystemState';
import { AlertState } from './AlertState';
import { BulkUpdateState } from './BulkUpdateState';
import { CalculatedColumnState } from './CalculatedColumnState';
import { CalendarState } from './CalendarState';
import { CellValidationState } from './CellValidationState';
import { ChartState } from './ChartState';
import { ConditionalStyleState } from './ConditionalStyleState';
import { CustomSortState } from './CustomSortState';
import { DashboardState } from './DashboardState';
import { DataSourceState } from './DataSourceState';
import { ExportState } from './ExportState';
import { FlashingCellState } from './FlashingCellState';
import { FormatColumnState } from './FormatColumnState';
import { FreeTextColumnState } from './FreeTextColumnState';
import { LayoutState } from './LayoutState';
import { PercentBarState } from './PercentBarState';
import { ScheduleState } from './ScheduleState';
import { PlusMinusState } from './PlusMinusState';
import { QuickSearchState } from './QuickSearchState';
import { CellSummaryState } from './CellSummaryState';
import { ShortcutState } from './ShortcutState';
import { SmartEditState } from './SmartEditState';
import { TeamSharingState } from './TeamSharingState';
import { ThemeState } from './ThemeState';
import { ConfigState } from './ConfigState';
import { EntitlementState } from './EntitlementState';
import { UserInterfaceState } from './UserInterfaceState';
import { FilterState } from './FilterState';
import { ActionColumnState } from './ActionColumnState';
import { SparklineColumnState } from './SparklineColumnState';
import { ApplicationState } from './ApplicationState';
import { UpdatedRowState } from './UpdatedRowState';
import { SystemStatusState } from './SystemStatusState';
import { ToolPanelState } from './ToolPanelState';
import { GradientColumnState } from './GradientColumnState';
import { QueryState } from './QueryState';

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
  // Glue42: Glue42State;
  // IPushPull: IPushPullState;
  // OpenFin: OpenFinState;
  SparklineColumn: SparklineColumnState;
  Filter: FilterState;
  SystemStatus: SystemStatusState;
  UserInterface: UserInterfaceState;

  // not sure yet about this one - was runtie but now design?
  CellSummary: CellSummaryState;

  // Set at design time and / or run time => only state which is persisted
  Alert: AlertState;
  BulkUpdate: BulkUpdateState;
  CalculatedColumn: CalculatedColumnState;
  Calendar: CalendarState;

  CellValidation: CellValidationState;
  Chart: ChartState;
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
  Schedule: ScheduleState;
  PlusMinus: PlusMinusState;
  QuickSearch: QuickSearchState;
  Shortcut: ShortcutState;
  SmartEdit: SmartEditState;
  TeamSharing: TeamSharingState;
  Theme: ThemeState;
  ToolPanel: ToolPanelState;
  UpdatedRow: UpdatedRowState;
  Query: QueryState;
}
