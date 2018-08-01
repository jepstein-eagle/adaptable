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
import { LayoutToolbarControl } from './Layout/LayoutToolbarControl'
import { ExportToolbarControl } from './Export/ExportToolbarControl'
import { TeamSharingPopup } from './TeamSharing/TeamSharingPopup'
import { IPushPullLogin } from './Export/IPushPullLogin'
import { HomeToolbarControl } from './Home/HomeToolbarControl'
import { HomeButtonsPopup } from './Home/HomeButtonsPopup'
import { AboutPopup } from './About/AboutPopup'
import { ApplicationPopup } from './Application/ApplicationPopup'
import { DashboardPopup } from './Dashboard/DashboardPopup'
import { DataManagementPopup } from './DataManagement/DataManagementPopup'
import { ColumnFilterPopup } from './ColumnFilter/ColumnFilterPopup'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as React from "react";
import { CalculatedColumnPopup } from "./CalculatedColumn/CalculatedColumnPopup";
import { IPushPullDomainPageSelector } from './Export/IPushPullDomainPageSelector';
import { BulkUpdatePopup } from './BulkUpdate/BulkUpdatePopup';
import { DataSourcePopup } from './DataSource/DataSourcePopup';
import { DataSourceToolbarControl } from './DataSource/DataSourceToolbarControl';
import { SelectedCellsPopup } from './SelectedCells/SelectedCellsPopup';
import { SelectedCellsToolbarControl } from './SelectedCells/SelectedCellsToolbarControl';
import { AlertPopup } from './Alert/AlertPopup';
import { AlertToolbarControl } from './Alert/AlertToolbarControl';
import { ChartsPopup } from './Charts/ChartsPopup';

export const AdaptableViewFactory: IAdaptableViewFactory = {
  AboutPopup: AboutPopup,
  AdvancedSearchPopup: AdvancedSearchPopup,
  AlertPopup: AlertPopup,
  ApplicationPopup: ApplicationPopup,
  BulkUpdatePopup: BulkUpdatePopup,
  CalculatedColumnPopup: CalculatedColumnPopup,
  CalendarsPopup: CalendarsPopup,
  CellValidationPopup: CellValidationPopup,
  ChartsPopup: ChartsPopup,
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
  HomeButtonsPopup: HomeButtonsPopup,
  IPushPullLogin: IPushPullLogin,
  IPushPullDomainPageSelector: IPushPullDomainPageSelector,
  LayoutPopup: LayoutPopup,
  PlusMinusPopup: PlusMinusPopup,
  QuickSearchPopup: QuickSearchPopup,
  SelectedCellsPopup: SelectedCellsPopup,
  SmartEditPopup: SmartEditPopup,
  ShortcutPopup: ShortcutPopup,
  ThemePopup: ThemePopup,
  TeamSharingPopup: TeamSharingPopup,
  UserFilterPopup: UserFilterPopup,
}

//here we put the dashboard control for each strategy
export const AdaptableDashboardViewFactory = new Map<string, React.ComponentClass<any>>([
  [StrategyIds.AdvancedSearchStrategyId, AdvancedSearchToolbarControl],
  [StrategyIds.DataSourceStrategyId, DataSourceToolbarControl],
  [StrategyIds.QuickSearchStrategyId, QuickSearchToolbarControl],
  [StrategyIds.LayoutStrategyId, LayoutToolbarControl],
  [StrategyIds.ColumnFilterStrategyId, ColumnFilterToolbarControl],
  [StrategyIds.ApplicationStrategyId, ApplicationToolbarControl],
  [StrategyIds.ExportStrategyId, ExportToolbarControl],
  [StrategyIds.BulkUpdateStrategyId, BulkUpdateToolbarControl],
  [StrategyIds.SmartEditStrategyId, SmartEditToolbarControl],
  [StrategyIds.SelectedCellsStrategyId, SelectedCellsToolbarControl],
  [StrategyIds.AlertStrategyId, AlertToolbarControl],
]);

export const AdaptableDashboardPermanentToolbarFactory = new Map<string, React.ComponentClass<any>>([
  [StrategyIds.HomeStrategyId, HomeToolbarControl],
]);

export interface IAdaptableViewFactory {
  [key: string]: any;
}