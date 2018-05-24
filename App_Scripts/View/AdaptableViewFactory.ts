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

export const AdaptableViewFactory: IAdaptableViewFactory = {
  CustomSortPopup: CustomSortPopup,
  SmartEditPopup: SmartEditPopup,
  ShortcutPopup: ShortcutPopup,
  PlusMinusPopup: PlusMinusPopup,
  ColumnChooserPopup: ColumnChooserPopup,
  ColumnInfoPopup: ColumnInfoPopup,
  ExportPopup: ExportPopup,
  FlashingCellsPopup: FlashingCellsPopup,
  CalendarsPopup: CalendarsPopup,
  ConditionalStylePopup: ConditionalStylePopup,
  QuickSearchPopup: QuickSearchPopup,
  AdvancedSearchPopup: AdvancedSearchPopup,
  UserFilterPopup: UserFilterPopup,
  FormatColumnPopup: FormatColumnPopup,
  ThemePopup: ThemePopup,
  DataManagementPopup: DataManagementPopup,
  CellValidationPopup: CellValidationPopup,
  LayoutPopup: LayoutPopup,
  DashboardPopup: DashboardPopup,
  DataSourcePopup: DataSourcePopup,
  HomeButtonsPopup: HomeButtonsPopup,
  CalculatedColumnPopup: CalculatedColumnPopup,
  IPushPullLogin: IPushPullLogin,
  IPushPullDomainPageSelector: IPushPullDomainPageSelector,
  TeamSharingPopup: TeamSharingPopup,
  ColumnFilterPopup: ColumnFilterPopup,
  AboutPopup: AboutPopup,
  ApplicationPopup: ApplicationPopup,
  BulkUpdatePopup: BulkUpdatePopup,
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
  [StrategyIds.BulkUpdateStrategyId, BulkUpdateToolbarControl]
]);

export const AdaptableDashboardPermanentToolbarFactory = new Map<string, React.ComponentClass<any>>([
  [StrategyIds.HomeStrategyId, HomeToolbarControl],
]);

export interface IAdaptableViewFactory {
  [key: string]: any;
}