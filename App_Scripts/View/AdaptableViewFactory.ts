import { CustomSortConfig } from './CustomSort/CustomSortConfig'
import { SmartEditAction } from './SmartEdit/SmartEditAction'
import { ShortcutConfig } from './Shortcut/ShortcutConfig'
import { PlusMinusConfig } from './PlusMinus/PlusMinusConfig'
import { ColumnChooserAction } from './ColumnChooser/ColumnChooserAction'
import { ExportAction } from './Export/ExportAction'
import { FlashingCellsConfig } from './FlashingCells/FlashingCellsConfig'
import { CalendarsConfig } from './Calendars/CalendarsConfig'
import { ConditionalStyleConfig } from './ConditionalStyle/ConditionalStyleConfig'
import { QuickSearchConfig } from './QuickSearch/QuickSearchConfig'
import { QuickSearchToolbarControl } from './QuickSearch/QuickSearchToolbarControl'
import { FilterToolbarControl } from './UserFilter/FilterToolbarControl'
import { FunctionsToolbarControl } from './Functions/FunctionsToolbarControl'
import { AdvancedSearchAction } from './AdvancedSearch/AdvancedSearchAction'
import { AdvancedSearchToolbarControl } from './AdvancedSearch/AdvancedSearchToolbarControl'
import { UserFilterConfig } from './UserFilter/UserFilterConfig'
import { ThemeConfig } from './Theme/ThemeConfig'
import { CellValidationConfig } from './CellValidation/CellValidationConfig'
import { LayoutConfig } from './Layout/LayoutConfig'
import { LayoutToolbarControl } from './Layout/LayoutToolbarControl'
import { ExportToolbarControl } from './Export/ExportToolbarControl'
import { TeamSharingAction } from './TeamSharing/TeamSharingAction'
import { IPushPullLogin } from './Export/IPushPullLogin'
import { DashboardShortcutsToolbarControl } from './DashboardShortcuts/DashboardShortcutsToolbarControl'
import { DashboardShortcutsToolbarControlConfig } from './DashboardShortcuts/DashboardShortcutsToolbarControlConfig'
import { DashboardConfig } from './Dashboard/DashboardConfig'
import { AdvancedSearchStrategyId, QuickSearchStrategyId, LayoutStrategyId } from '../Core/StrategyIds'
import * as StrategyIds from '../Core/StrategyIds'
import * as React from "react";
import { CalculatedColumnConfig } from "./CalculatedColumn/CalculatedColumnConfig";
import { IPushPullDomainPageSelector } from './Export/IPushPullDomainPageSelector';

export const AdaptableViewFactory: IAdaptableViewFactory = {
  CustomSortConfig: CustomSortConfig,
  SmartEditAction: SmartEditAction,
  ShortcutConfig: ShortcutConfig,
  PlusMinusConfig: PlusMinusConfig,
  ColumnChooserAction: ColumnChooserAction,
  ExportAction: ExportAction,
  FlashingCellsConfig: FlashingCellsConfig,
  CalendarsConfig: CalendarsConfig,
  ConditionalStyleConfig: ConditionalStyleConfig,
  QuickSearchConfig: QuickSearchConfig,
  AdvancedSearchAction: AdvancedSearchAction,
  UserFilterConfig: UserFilterConfig,
  ThemeConfig: ThemeConfig,
  CellValidationConfig: CellValidationConfig,
  LayoutConfig: LayoutConfig,
  DashboardConfig: DashboardConfig,
  DashboardShortcutsToolbarControlConfig: DashboardShortcutsToolbarControlConfig,
  CalculatedColumnConfig: CalculatedColumnConfig,
  IPushPullLogin: IPushPullLogin,
  IPushPullDomainPageSelector : IPushPullDomainPageSelector,
  TeamSharingAction : TeamSharingAction
}

//here we put the dashboard control for each strategy
export const AdaptableDashboardViewFactory = new Map<string, React.ComponentClass<any>>([
  [StrategyIds.FunctionsStrategyId, FunctionsToolbarControl],
  [StrategyIds.QuickSearchStrategyId, QuickSearchToolbarControl],
  [StrategyIds.AdvancedSearchStrategyId, AdvancedSearchToolbarControl],
  [StrategyIds.LayoutStrategyId, LayoutToolbarControl],
  [StrategyIds.FilterStrategyId, FilterToolbarControl],
  [StrategyIds.DashboardShortcutsStrategyId, DashboardShortcutsToolbarControl],
  [StrategyIds.ExportStrategyId, ExportToolbarControl]
]);

//here we put the configuration screen of the dashboard control if it exists
//the component needs to be registered in the global view factory as well with the same key/name
export const AdaptableDashboardConfigurationViewFactory = new Map<string, string>([
  [StrategyIds.DashboardShortcutsStrategyId, "DashboardShortcutsToolbarControlConfig"]
]);

export interface IAdaptableViewFactory {
  [key: string]: any;
}