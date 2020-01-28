import { CustomSortPopup } from './CustomSort/CustomSortPopup';
import { SmartEditPopup } from './SmartEdit/SmartEditPopup';
import { ShortcutPopup } from './Shortcut/ShortcutPopup';
import { PlusMinusPopup } from './PlusMinus/PlusMinusPopup';
import { ColumnChooserPopup } from './ColumnChooser/ColumnChooserPopup';
import { ColumnInfoPopup } from './ColumnInfo/ColumnInfoPopup';
import { ExportPopup } from './Export/ExportPopup';
import { FlashingCellsPopup } from './FlashingCells/FlashingCellsPopup';
import { UpdatedRowPopup } from './UpdatedRow/UpdatedRowPopup';
import { CalendarsPopup } from './Calendars/CalendarsPopup';
import { ConditionalStylePopup } from './ConditionalStyle/ConditionalStylePopup';
import { QuickSearchPopup } from './QuickSearch/QuickSearchPopup';
import { QuickSearchToolbarControl } from './QuickSearch/QuickSearchToolbarControl';
import { ColumnFilterToolbarControl } from './ColumnFilter/ColumnFilterToolbarControl';
import { ThemeToolbarControl } from './Theme/ThemeToolbarControl';
import { AdvancedSearchPopup } from './AdvancedSearch/AdvancedSearchPopup';
import { AdvancedSearchToolbarControl } from './AdvancedSearch/AdvancedSearchToolbarControl';
import { BulkUpdateToolbarControl } from './BulkUpdate/BulkUpdateToolbarControl';
import { SmartEditToolbarControl } from './SmartEdit/SmartEditToolbarControl';
import { IPushPullPopup } from './IPushPull/IPushPullPopup';
import { UserFilterPopup } from './UserFilter/UserFilterPopup';
import { FormatColumnPopup } from './FormatColumn/FormatColumnPopup';
import { ThemePopup } from './Theme/ThemePopup';
import { ToolPanelPopup } from './Components/ToolPanel/ToolPanelPopup';
import { CellValidationPopup } from './CellValidation/CellValidationPopup';
import { LayoutPopup } from './Layout/LayoutPopup';
import { ColumnCategoryPopup } from './ColumnCategory/ColumnCategoryPopup';
import { LayoutToolbarControl } from './Layout/LayoutToolbarControl';
import { ExportToolbarControl } from './Export/ExportToolbarControl';
import { TeamSharingPopup } from './TeamSharing/TeamSharingPopup';
import { IPushPullLoginPopup } from './IPushPull/IPushPullLoginPopup';
import { IPushPullAddPagePopup } from './IPushPull/IPushPullAddPagePopup';
import { HomeToolbarControl } from './Home/HomeToolbarControl';
import { DashboardPopup } from './Dashboard/DashboardPopup';
import { StateManagementPopup } from './StateManagement/StateManagementPopup';
import { ColumnFilterPopup } from './ColumnFilter/ColumnFilterPopup';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { CalculatedColumnPopup } from './CalculatedColumn/CalculatedColumnPopup';
import { BulkUpdatePopup } from './BulkUpdate/BulkUpdatePopup';
import { DataSourcePopup } from './DataSource/DataSourcePopup';
import { DataSourceToolbarControl } from './DataSource/DataSourceToolbarControl';
import { AlertPopup } from './Alert/AlertPopup';
import { AlertToolbarControl } from './Alert/AlertToolbarControl';
import { SystemStatusToolbarControl } from './SystemStatus/SystemStatusToolbarControl';
import { CustomToolbarControl } from './Dashboard/CustomToolbarControl';
import { FreeTextColumnPopup } from './FreeTextColumn/FreeTextColumnPopup';
import { Glue42Popup } from './Glue42/Glue42Popup';
import { PercentBarPopup } from './PercentBar/PercentBarPopup';
import { CellSummaryPopup } from './CellSummary/CellSummaryPopup';
import { CellSummaryToolbarControl } from './CellSummary/CellSummaryToolbarControl';
import { ReminderPopup } from './Reminder/ReminderPopup';
import { SchedulePopup } from './Schedule/SchedulePopup';
import { SystemStatusPopup } from './SystemStatus/SystemStatusPopup';
import { ConnectedComponent } from 'react-redux';
import { AdvancedSearchToolPanel } from './AdvancedSearch/AdvancedSearchToolPanel';
import { QuickSearchToolPanel } from './QuickSearch/QuickSearchToolPanel';
import { DashboardToolPanel } from './Dashboard/DashboardToolPanel';
import { LayoutToolPanel } from './Layout/LayoutToolPanel';
import { ThemeToolPanel } from './Theme/ThemeToolPanel';
import { ExportToolPanel } from './Export/ExportToolPanel';
import { SystemStatusToolPanel } from './SystemStatus/SystemStatusToolPanel';
import { AlertToolPanel } from './Alert/AlertToolPanel';
import { ColumnFilterToolPanel } from './ColumnFilter/ColumnFilterToolPanel';
import { CellSummaryToolPanel } from './CellSummary/CellSummaryToolPanel';
import { SmartEditToolPanel } from './SmartEdit/SmartEditToolPanel';
import { BulkUpdateToolPanel } from './BulkUpdate/BulkUpdateToolPanel';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
import { IPushPullToolbarControl } from './IPushPull/IPushPullToolbarControl';
import { Glue42ToolbarControl } from './Glue42/Glue42ToolbarControl';

export const AdaptableViewFactory: IAdaptableViewFactory = {
  AdvancedSearchPopup,
  AlertPopup,
  BulkUpdatePopup,
  CalculatedColumnPopup,
  CalendarsPopup,
  CellValidationPopup,
  ColumnChooserPopup,
  ColumnFilterPopup,
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
  Glue42Popup,
  IPushPullPopup,
  IPushPullLoginPopup,
  IPushPullAddPagePopup,
  LayoutPopup,
  ColumnCategoryPopup,
  PercentBarPopup,
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
};

// here we put the dashboard control for each strategy
export const AdaptableDashboardFactory = new Map<
  AdaptableFunctionName,
  ConnectedComponent<any, any>
>([
  [StrategyConstants.AdvancedSearchStrategyId, AdvancedSearchToolbarControl],
  [StrategyConstants.AlertStrategyId, AlertToolbarControl],
  [StrategyConstants.BulkUpdateStrategyId, BulkUpdateToolbarControl],
  [StrategyConstants.CellSummaryStrategyId, CellSummaryToolbarControl],
  [StrategyConstants.ColumnFilterStrategyId, ColumnFilterToolbarControl],
  [StrategyConstants.DataSourceStrategyId, DataSourceToolbarControl],
  [StrategyConstants.ExportStrategyId, ExportToolbarControl],
  [StrategyConstants.LayoutStrategyId, LayoutToolbarControl],
  [StrategyConstants.QuickSearchStrategyId, QuickSearchToolbarControl],
  [StrategyConstants.SmartEditStrategyId, SmartEditToolbarControl],
  [StrategyConstants.SystemStatusStrategyId, SystemStatusToolbarControl],
  [StrategyConstants.ThemeStrategyId, ThemeToolbarControl],
  [StrategyConstants.IPushPullStrategyId, IPushPullToolbarControl],
  [StrategyConstants.Glue42StrategyId, Glue42ToolbarControl],
  // this is special
  [StrategyConstants.DashboardStrategyId, CustomToolbarControl],
]);

export const AdaptableToolPanelFactory = new Map<
  AdaptableFunctionName,
  ConnectedComponent<any, any>
>([
  [StrategyConstants.AdvancedSearchStrategyId, AdvancedSearchToolPanel],
  [StrategyConstants.AlertStrategyId, AlertToolPanel],
  [StrategyConstants.BulkUpdateStrategyId, BulkUpdateToolPanel],
  [StrategyConstants.CellSummaryStrategyId, CellSummaryToolPanel],
  [StrategyConstants.ColumnFilterStrategyId, ColumnFilterToolPanel],
  [StrategyConstants.DashboardStrategyId, DashboardToolPanel],
  [StrategyConstants.ExportStrategyId, ExportToolPanel],
  [StrategyConstants.LayoutStrategyId, LayoutToolPanel],
  [StrategyConstants.QuickSearchStrategyId, QuickSearchToolPanel],
  [StrategyConstants.SmartEditStrategyId, SmartEditToolPanel],
  [StrategyConstants.SystemStatusStrategyId, SystemStatusToolPanel],
  [StrategyConstants.ThemeStrategyId, ThemeToolPanel],
]);

export const AdaptableDashboardPermanentToolbarFactory = new Map<
  string,
  ConnectedComponent<any, any>
>([[StrategyConstants.HomeStrategyId, HomeToolbarControl]]);

export interface IAdaptableViewFactory {
  [key: string]: any;
}
