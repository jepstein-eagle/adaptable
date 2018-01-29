import { CustomSortConfig } from './CustomSort/CustomSortConfig'
import { SmartEditAction } from './SmartEdit/SmartEditAction'
import { ShortcutConfig } from './Shortcut/ShortcutConfig'
import { PlusMinusConfig } from './PlusMinus/PlusMinusConfig'
import { ColumnChooserPopup } from './ColumnChooser/ColumnChooserPopup'
import { ColumnInfoAction } from './ColumnInfo/ColumnInfoAction'
import { ExportAction } from './Export/ExportAction'
import { FlashingCellsConfig } from './FlashingCells/FlashingCellsConfig'
import { CalendarsConfig } from './Calendars/CalendarsConfig'
import { ConditionalStyleConfig } from './ConditionalStyle/ConditionalStyleConfig'
import { QuickSearchConfig } from './QuickSearch/QuickSearchConfig'
import { QuickSearchToolbarControl } from './QuickSearch/QuickSearchToolbarControl'
import { ColumnFilterToolbarControl } from './ColumnFilter/ColumnFilterToolbarControl'
//import { FunctionsToolbarControl } from './Functions/FunctionsToolbarControl'
import { AdvancedSearchPopup } from './AdvancedSearch/AdvancedSearchPopup'
import { AdvancedSearchToolbarControl } from './AdvancedSearch/AdvancedSearchToolbarControl'
import { UserFilterConfig } from './UserFilter/UserFilterConfig'
import { FormatColumnConfig } from './FormatColumn/FormatColumnConfig'
import { ThemeConfig } from './Theme/ThemeConfig'
import { CellValidationPopup } from './CellValidation/CellValidationPopup'
import { LayoutConfig } from './Layout/LayoutConfig'
import { LayoutToolbarControl } from './Layout/LayoutToolbarControl'
import { ExportToolbarControl } from './Export/ExportToolbarControl'
import { TeamSharingAction } from './TeamSharing/TeamSharingAction'
import { IPushPullLogin } from './Export/IPushPullLogin'
import { FunctionToolbarControl } from './Functions/FunctionToolbarControl'
import { FunctionButtonsConfig } from './Functions/FunctionButtonsConfig'
import { DashboardConfig } from './Dashboard/DashboardConfig'
import { ColumnFilterPopup } from './ColumnFilter/ColumnFilterPopup'
import * as StrategyIds from '../Core/StrategyIds'
import * as React from "react";
import { CalculatedColumnPopup } from "./CalculatedColumn/CalculatedColumnPopup";
import { IPushPullDomainPageSelector } from './Export/IPushPullDomainPageSelector';

export const AdaptableViewFactory: IAdaptableViewFactory = {
  CustomSortConfig: CustomSortConfig,
  SmartEditAction: SmartEditAction,
  ShortcutConfig: ShortcutConfig,
  PlusMinusConfig: PlusMinusConfig,
  ColumnChooserPopup: ColumnChooserPopup,
  ColumnInfoAction: ColumnInfoAction,
  ExportAction: ExportAction,
  FlashingCellsConfig: FlashingCellsConfig,
  CalendarsConfig: CalendarsConfig,
  ConditionalStyleConfig: ConditionalStyleConfig,
  QuickSearchConfig: QuickSearchConfig,
  AdvancedSearchPopup: AdvancedSearchPopup,
  UserFilterConfig: UserFilterConfig,
  FormatColumnConfig: FormatColumnConfig,
  ThemeConfig: ThemeConfig,
  CellValidationPopup: CellValidationPopup,
  LayoutConfig: LayoutConfig,
  DashboardConfig: DashboardConfig,
  FunctionButtonsConfig: FunctionButtonsConfig,
  CalculatedColumnPopup: CalculatedColumnPopup,
  IPushPullLogin: IPushPullLogin,
  IPushPullDomainPageSelector : IPushPullDomainPageSelector,
  TeamSharingAction : TeamSharingAction,
  ColumnFilterPopup: ColumnFilterPopup
}

//here we put the dashboard control for each strategy
export const AdaptableDashboardViewFactory = new Map<string, React.ComponentClass<any>>([
//[StrategyConstants.FunctionsStrategyId, FunctionsToolbarControl],
  [StrategyIds.QuickSearchStrategyId, QuickSearchToolbarControl],
  [StrategyIds.AdvancedSearchStrategyId, AdvancedSearchToolbarControl],
  [StrategyIds.LayoutStrategyId, LayoutToolbarControl],
  [StrategyIds.ColumnFilterStrategyId, ColumnFilterToolbarControl],
  [StrategyIds.FunctionsStrategyId, FunctionToolbarControl],
  [StrategyIds.ExportStrategyId, ExportToolbarControl]
]);

//here we put the configuration screen of the dashboard control if it exists
//the component needs to be registered in the global view factory as well with the same key/name
//export const AdaptableDashboardConfigurationViewFactory = new Map<string, string>([
 // [StrategyIds.FunctionsStrategyId, "FunctionButtonsConfig"]
//]);

export interface IAdaptableViewFactory {
  [key: string]: any;
}