import * as React from 'react';
import { CustomSortPopup } from './CustomSort/CustomSortPopup';
import { SmartEditPopup } from './SmartEdit/SmartEditPopup';
import { ShortcutPopup } from './Shortcut/ShortcutPopup';
import { PlusMinusPopup } from './PlusMinus/PlusMinusPopup';
import { ColumnChooserPopup } from './ColumnChooser/ColumnChooserPopup';
import { ColumnInfoPopup } from './ColumnInfo/ColumnInfoPopup';
import { ExportPopup } from './Export/ExportPopup';
import { FlashingCellsPopup } from './FlashingCells/FlashingCellsPopup';
import { CalendarsPopup } from './Calendars/CalendarsPopup';
import { ConditionalStylePopup } from './ConditionalStyle/ConditionalStylePopup';
import { QuickSearchPopup } from './QuickSearch/QuickSearchPopup';
import { QuickSearchToolbarControl } from './QuickSearch/QuickSearchToolbarControl';
import { ColumnFilterToolbarControl } from './ColumnFilter/ColumnFilterToolbarControl';
import { ThemeToolbarControl } from './Theme/ThemeToolbarControl';
import { ApplicationToolbarControl } from './Application/ApplicationToolbarControl';
import { AdvancedSearchPopup } from './AdvancedSearch/AdvancedSearchPopup';
import { AdvancedSearchToolbarControl } from './AdvancedSearch/AdvancedSearchToolbarControl';
import { BulkUpdateToolbarControl } from './BulkUpdate/BulkUpdateToolbarControl';
import { SmartEditToolbarControl } from './SmartEdit/SmartEditToolbarControl';
import { UserFilterPopup } from './UserFilter/UserFilterPopup';
import { FormatColumnPopup } from './FormatColumn/FormatColumnPopup';
import { ThemePopup } from './Theme/ThemePopup';
import { CellValidationPopup } from './CellValidation/CellValidationPopup';
import { LayoutPopup } from './Layout/LayoutPopup';
import { ColumnCategoryPopup } from './ColumnCategory/ColumnCategoryPopup';
import { LayoutToolbarControl } from './Layout/LayoutToolbarControl';
import { ExportToolbarControl } from './Export/ExportToolbarControl';
import { TeamSharingPopup } from './TeamSharing/TeamSharingPopup';
import { IPushPullLogin } from './Export/IPushPullLogin';
import { HomeToolbarControl } from './Home/HomeToolbarControl';
import { ApplicationPopup } from './Application/ApplicationPopup';
import { DashboardPopup } from './Dashboard/DashboardPopup';
import { DataManagementPopup } from './DataManagement/DataManagementPopup';
import { ColumnFilterPopup } from './ColumnFilter/ColumnFilterPopup';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { CalculatedColumnPopup } from './CalculatedColumn/CalculatedColumnPopup';
import { IPushPullDomainPageSelector } from './Export/IPushPullDomainPageSelector';
import { BulkUpdatePopup } from './BulkUpdate/BulkUpdatePopup';
import { DataSourcePopup } from './DataSource/DataSourcePopup';
import { DataSourceToolbarControl } from './DataSource/DataSourceToolbarControl';
import { AlertPopup } from './Alert/AlertPopup';
import { AlertToolbarControl } from './Alert/AlertToolbarControl';
import { ChartPopup } from './Chart/ChartPopup';
import { ChartToolbarControl } from './Chart/ChartToolbarControl';
import { FreeTextColumnPopup } from './FreeTextColumn/FreeTextColumnPopup';
import { PercentBarPopup } from './PercentBar/PercentBarPopup';
import { SparklinesColumnPopup } from './Sparklines/SparklinesColumnPopup';
import { ViewAsSparklinesPopup } from './Sparklines/ViewAsSparklinesPopup';
import { PieChartPopup } from './PieChart/PieChartPopup';
import { CellSummaryPopup } from './CellSummary/CellSummaryPopup';
import { CellSummaryToolbarControl } from './CellSummary/CellSummaryToolbarControl';
import { ChartDisplayPopup } from './Chart/ChartDisplayPopup';
import { ReminderPopup } from './Reminder/ReminderPopup';

export const AdaptableViewFactory: IAdaptableViewFactory = {
  AdvancedSearchPopup,
  AlertPopup,
  ApplicationPopup,
  BulkUpdatePopup,
  CalculatedColumnPopup,
  CalendarsPopup,
  CellValidationPopup,
  ChartPopup,
  ColumnChooserPopup,
  ColumnFilterPopup,
  ColumnInfoPopup,
  ConditionalStylePopup,
  CustomSortPopup,
  DashboardPopup,
  DataManagementPopup,
  DataSourcePopup,
  ExportPopup,
  FlashingCellsPopup,
  FormatColumnPopup,
  FreeTextColumnPopup,
  IPushPullLogin,
  IPushPullDomainPageSelector,
  LayoutPopup,
  ColumnCategoryPopup,
  PercentBarPopup,
  PieChartPopup,
  PlusMinusPopup,
  QuickSearchPopup,
  ReminderPopup,
  CellSummaryPopup,
  SmartEditPopup,
  SparklinesColumnPopup,
  ViewAsSparklinesPopup,
  ShortcutPopup,
  ThemePopup,
  TeamSharingPopup,
  UserFilterPopup,
  ChartDisplayPopup,
};

// here we put the dashboard control for each strategy
export const AdaptableDashboardViewFactory = new Map<string, React.ComponentClass<any>>([
  [StrategyConstants.AdvancedSearchStrategyId, AdvancedSearchToolbarControl],
  [StrategyConstants.DataSourceStrategyId, DataSourceToolbarControl],
  [StrategyConstants.QuickSearchStrategyId, QuickSearchToolbarControl],
  [StrategyConstants.LayoutStrategyId, LayoutToolbarControl],
  [StrategyConstants.ColumnFilterStrategyId, ColumnFilterToolbarControl],
  [StrategyConstants.ApplicationStrategyId, ApplicationToolbarControl],
  [StrategyConstants.ExportStrategyId, ExportToolbarControl],
  [StrategyConstants.BulkUpdateStrategyId, BulkUpdateToolbarControl],
  [StrategyConstants.SmartEditStrategyId, SmartEditToolbarControl],
  [StrategyConstants.CellSummaryStrategyId, CellSummaryToolbarControl],
  [StrategyConstants.AlertStrategyId, AlertToolbarControl],
  [StrategyConstants.ChartStrategyId, ChartToolbarControl],
  [StrategyConstants.ThemeStrategyId, ThemeToolbarControl],
]);

export const AdaptableDashboardPermanentToolbarFactory = new Map<string, React.ComponentClass<any>>(
  [[StrategyConstants.HomeStrategyId, HomeToolbarControl]]
);

export interface IAdaptableViewFactory {
  [key: string]: any;
}
