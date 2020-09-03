import { CustomSortPopup } from './CustomSort/CustomSortPopup';
import { SmartEditPopup } from './SmartEdit/SmartEditPopup';
import { ShortcutPopup } from './Shortcut/ShortcutPopup';
import { PlusMinusPopup } from './PlusMinus/PlusMinusPopup';
import { ColumnInfoPopup } from './ColumnInfo/ColumnInfoPopup';
import { ExportPopup } from './Export/ExportPopup';
import { FlashingCellsPopup } from './FlashingCells/FlashingCellsPopup';
import { UpdatedRowPopup } from './UpdatedRow/UpdatedRowPopup';
import { CalendarsPopup } from './Calendars/CalendarsPopup';
import { FilterPopup } from './Filter/FilterPopup';
import { ConditionalStylePopup } from './ConditionalStyle/ConditionalStylePopup';
import { QuickSearchPopup } from './QuickSearch/QuickSearchPopup';
import { QueryPopup } from './Query/QueryPopup';
import { QuickSearchToolbarControl } from './QuickSearch/QuickSearchToolbarControl';
import { ExpandedQueryPopup } from './Query/ExpandedQueryPopup';
import { BulkUpdateToolbarControl } from './BulkUpdate/BulkUpdateToolbarControl';
import { SmartEditToolbarControl } from './SmartEdit/SmartEditToolbarControl';
import { UserFilterPopup } from './UserFilter/UserFilterPopup';
import { FormatColumnPopup } from './FormatColumn/FormatColumnPopup';
import { ThemePopup } from './Theme/ThemePopup';
import { ToolPanelPopup } from './Components/ToolPanel/ToolPanelPopup';
import { CellValidationPopup } from './CellValidation/CellValidationPopup';
import { GradientColumnPopup } from './GradientColumn/GradientColumnPopup';
import { LayoutPopup } from './Layout/LayoutPopup';
import { GridInfoPopup } from './GridInfo/GridInfoPopup';
import { LayoutToolbarControl } from './Layout/LayoutToolbarControl';
import { ExportToolbarControl } from './Export/ExportToolbarControl';
import { TeamSharingPopup } from './TeamSharing/TeamSharingPopup';
import { DashboardPopup } from './Dashboard/DashboardPopup';
import { StateManagementPopup } from './StateManagement/StateManagementPopup';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { CalculatedColumnPopup } from './CalculatedColumn/CalculatedColumnPopup';
import { BulkUpdatePopup } from './BulkUpdate/BulkUpdatePopup';
import { DataSourcePopup } from './DataSource/DataSourcePopup';
import { DataSourceToolbarControl } from './DataSource/DataSourceToolbarControl';
import { FilterToolbarControl } from './Filter/FilterToolbarControl';
import { ThemeToolbarControl } from './Theme/ThemeToolbarControl';
import { AlertPopup } from './Alert/AlertPopup';
import { AlertToolbarControl } from './Alert/AlertToolbarControl';
import { SystemStatusToolbarControl } from './SystemStatus/SystemStatusToolbarControl';
import { CustomToolbarControl } from './Dashboard/CustomToolbarControl';
import { FreeTextColumnPopup } from './FreeTextColumn/FreeTextColumnPopup';
import { PercentBarPopup } from './PercentBar/PercentBarPopup';
import { CellSummaryPopup } from './CellSummary/CellSummaryPopup';
import { CellSummaryToolbarControl } from './CellSummary/CellSummaryToolbarControl';
import { ReminderPopup } from './Reminder/ReminderPopup';
import { SchedulePopup } from './Schedule/SchedulePopup';
import { SystemStatusPopup } from './SystemStatus/SystemStatusPopup';
import { ConnectedComponent } from 'react-redux';
import { QuickSearchToolPanel } from './QuickSearch/QuickSearchToolPanel';
import { DashboardToolPanel } from './Dashboard/DashboardToolPanel';
import { LayoutToolPanel } from './Layout/LayoutToolPanel';
import { ThemeToolPanel } from './Theme/ThemeToolPanel';
import { ExportToolPanel } from './Export/ExportToolPanel';
import { SystemStatusToolPanel } from './SystemStatus/SystemStatusToolPanel';
import { AlertToolPanel } from './Alert/AlertToolPanel';
import { CellSummaryToolPanel } from './CellSummary/CellSummaryToolPanel';
import { FilterToolPanel } from './Filter/FilterToolPanel';
import { SmartEditToolPanel } from './SmartEdit/SmartEditToolPanel';
import { BulkUpdateToolPanel } from './BulkUpdate/BulkUpdateToolPanel';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
import { QueryToolbarControl } from './Query/QueryToolbarControl';
import { QueryToolPanel } from './Query/QueryToolPanel';

export const AdaptableViewFactory: IAdaptableViewFactory = {
  ExpandedQueryPopup,
  AlertPopup,
  BulkUpdatePopup,
  CalculatedColumnPopup,
  CalendarsPopup,
  CellValidationPopup,
  FilterPopup,
  ColumnInfoPopup,
  ConditionalStylePopup,
  CustomSortPopup,
  DashboardPopup,
  StateManagementPopup,
  DataSourcePopup,
  ExportPopup,
  FlashingCellsPopup,
  UpdatedRowPopup,
  FormatColumnPopup,
  FreeTextColumnPopup,
  GridInfoPopup,
  LayoutPopup,
  PercentBarPopup,
  GradientColumnPopup,
  PlusMinusPopup,
  QuickSearchPopup,
  ReminderPopup,
  SchedulePopup,
  CellSummaryPopup,
  SmartEditPopup,
  ShortcutPopup,
  ThemePopup,
  TeamSharingPopup,
  ToolPanelPopup,
  SystemStatusPopup,
  UserFilterPopup,
  QueryPopup,
};

// here we put the dashboard control for each strategy
export const AdaptableDashboardFactory = new Map<
  AdaptableFunctionName,
  ConnectedComponent<any, any>
>([
  [StrategyConstants.QueryStrategyId, QueryToolbarControl],
  [StrategyConstants.AlertStrategyId, AlertToolbarControl],
  [StrategyConstants.BulkUpdateStrategyId, BulkUpdateToolbarControl],
  [StrategyConstants.CellSummaryStrategyId, CellSummaryToolbarControl],
  [StrategyConstants.FilterStrategyId, FilterToolbarControl],
  [StrategyConstants.DataSourceStrategyId, DataSourceToolbarControl],
  [StrategyConstants.ExportStrategyId, ExportToolbarControl],
  [StrategyConstants.LayoutStrategyId, LayoutToolbarControl],
  [StrategyConstants.QuickSearchStrategyId, QuickSearchToolbarControl],
  [StrategyConstants.SmartEditStrategyId, SmartEditToolbarControl],
  [StrategyConstants.SystemStatusStrategyId, SystemStatusToolbarControl],
  [StrategyConstants.ThemeStrategyId, ThemeToolbarControl],
  // this is special
  [StrategyConstants.DashboardStrategyId, CustomToolbarControl],
]);

export const AdaptableToolPanelFactory = new Map<
  AdaptableFunctionName,
  ConnectedComponent<any, any>
>([
  // [StrategyConstants.QueryStrategyId, QueryToolPanel],
  [StrategyConstants.AlertStrategyId, AlertToolPanel],
  [StrategyConstants.BulkUpdateStrategyId, BulkUpdateToolPanel],
  [StrategyConstants.CellSummaryStrategyId, CellSummaryToolPanel],
  [StrategyConstants.FilterStrategyId, FilterToolPanel],
  [StrategyConstants.DashboardStrategyId, DashboardToolPanel],
  [StrategyConstants.ExportStrategyId, ExportToolPanel],
  [StrategyConstants.LayoutStrategyId, LayoutToolPanel],
  [StrategyConstants.QuickSearchStrategyId, QuickSearchToolPanel],
  [StrategyConstants.SmartEditStrategyId, SmartEditToolPanel],
  [StrategyConstants.SystemStatusStrategyId, SystemStatusToolPanel],
  [StrategyConstants.ThemeStrategyId, ThemeToolPanel],
]);

export interface IAdaptableViewFactory {
  [key: string]: any;
}
