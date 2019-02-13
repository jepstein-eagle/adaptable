import { CustomSortPopup } from './CustomSort/CustomSortPopup'
import { SmartEditPopup } from './SmartEdit/SmartEditPopup'
import { ShortcutPopup } from './Shortcut/ShortcutPopup'
import { PlusMinusPopup } from './PlusMinus/PlusMinusPopup'
import { ColumnChooserPopup } from './ColumnChooser/ColumnChooserPopup'
import { ColumnInfoPopup } from './ColumnInfo/ColumnInfoPopup'
import { ExportPopup } from './Export/ExportPopup'
import { FlashingCellsPopup } from './FlashingCells/FlashingCellsPopup'
import { CalendarsPopup } from './Calendars/CalendarsPopup'
import { ConditionalStylePopup } from './ConditionalStyle/ConditionalStylePopup'
import { QuickSearchPopup } from './QuickSearch/QuickSearchPopup'
import { QuickSearchToolbarControl } from './QuickSearch/QuickSearchToolbarControl'
import { ColumnFilterToolbarControl } from './ColumnFilter/ColumnFilterToolbarControl'
import { ThemeToolbarControl } from './Theme/ThemeToolbarControl'
import { ApplicationToolbarControl } from './Application/ApplicationToolbarControl'
import { AdvancedSearchPopup } from './AdvancedSearch/AdvancedSearchPopup'
import { AdvancedSearchToolbarControl } from './AdvancedSearch/AdvancedSearchToolbarControl'
import { BulkUpdateToolbarControl } from './BulkUpdate/BulkUpdateToolbarControl'
import { SmartEditToolbarControl } from './SmartEdit/SmartEditToolbarControl'
import { UserFilterPopup } from './UserFilter/UserFilterPopup'
import { FormatColumnPopup } from './FormatColumn/FormatColumnPopup'
import { ThemePopup } from './Theme/ThemePopup'
import { CellValidationPopup } from './CellValidation/CellValidationPopup'
import { LayoutPopup } from './Layout/LayoutPopup'
import { ColumnCategoryPopup } from './ColumnCategory/ColumnCategoryPopup'
import { LayoutToolbarControl } from './Layout/LayoutToolbarControl'
import { ExportToolbarControl } from './Export/ExportToolbarControl'
import { TeamSharingPopup } from './TeamSharing/TeamSharingPopup'
import { IPushPullLogin } from './Export/IPushPullLogin'
import { HomeToolbarControl } from './Home/HomeToolbarControl'
import { HomeButtonsPopup } from './Home/HomeButtonsPopup'
import { ApplicationPopup } from './Application/ApplicationPopup'
import { DashboardPopup } from './Dashboard/DashboardPopup'
import { DataManagementPopup } from './DataManagement/DataManagementPopup'
import { ColumnFilterPopup } from './ColumnFilter/ColumnFilterPopup'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as React from "react";
import { CalculatedColumnPopup } from "./CalculatedColumn/CalculatedColumnPopup";
import { IPushPullDomainPageSelector } from './Export/IPushPullDomainPageSelector';
import { BulkUpdatePopup } from './BulkUpdate/BulkUpdatePopup';
import { DataSourcePopup } from './DataSource/DataSourcePopup';
import { DataSourceToolbarControl } from './DataSource/DataSourceToolbarControl';
import { AlertPopup } from './Alert/AlertPopup';
import { AlertToolbarControl } from './Alert/AlertToolbarControl';
import { ChartPopup } from './Chart/ChartPopup';
import { ChartDisplayPopup } from './Chart/ChartDisplayPopup';
import { ChartToolbarControl } from './Chart/ChartToolbarControl';
import { FreeTextColumnPopup } from './FreeTextColumn/FreeTextColumnPopup';
import { PercentBarPopup } from './PercentBar/PercentBarPopup';
import { CellSummaryPopup } from './CellSummary/CellSummaryPopup';
import { CellSummaryToolbarControl } from './CellSummary/CellSummaryToolbarControl';

export const AdaptableViewFactory: IAdaptableViewFactory = {
  AdvancedSearchPopup: AdvancedSearchPopup,
  AlertPopup: AlertPopup,
  ApplicationPopup: ApplicationPopup,
  BulkUpdatePopup: BulkUpdatePopup,
  CalculatedColumnPopup: CalculatedColumnPopup,
  CalendarsPopup: CalendarsPopup,
  PercentBarPopup: PercentBarPopup,
  CellValidationPopup: CellValidationPopup,
  ChartPopup: ChartPopup,
  ColumnChooserPopup: ColumnChooserPopup,
  ColumnFilterPopup: ColumnFilterPopup,
  ColumnInfoPopup: ColumnInfoPopup,
  ConditionalStylePopup: ConditionalStylePopup,
  CustomSortPopup: CustomSortPopup,
  DashboardPopup: DashboardPopup,
  DataManagementPopup: DataManagementPopup,
  DataSourcePopup: DataSourcePopup,
  ExportPopup: ExportPopup,
  FlashingCellsPopup: FlashingCellsPopup,
  FormatColumnPopup: FormatColumnPopup,
  FreeTextColumnPopup: FreeTextColumnPopup,
  HomeButtonsPopup: HomeButtonsPopup,
  IPushPullLogin: IPushPullLogin,
  IPushPullDomainPageSelector: IPushPullDomainPageSelector,
  LayoutPopup: LayoutPopup,
  ColumnCategoryPopup: ColumnCategoryPopup,
  PlusMinusPopup: PlusMinusPopup,
  QuickSearchPopup: QuickSearchPopup,
  CellSummaryPopup: CellSummaryPopup,
  SmartEditPopup: SmartEditPopup,
  ShortcutPopup: ShortcutPopup,
  ThemePopup: ThemePopup,
  TeamSharingPopup: TeamSharingPopup,
  UserFilterPopup: UserFilterPopup,
  ChartDisplayPopup: ChartDisplayPopup
}

//here we put the dashboard control for each strategy
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

export const AdaptableDashboardPermanentToolbarFactory = new Map<string, React.ComponentClass<any>>([
  [StrategyConstants.HomeStrategyId, HomeToolbarControl],
]);

export interface IAdaptableViewFactory {
  [key: string]: any;
}
