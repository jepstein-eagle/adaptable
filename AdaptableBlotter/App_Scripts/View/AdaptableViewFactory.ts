import { CustomSortConfig } from './CustomSort/CustomSortConfig'
import { SmartEditAction } from './SmartEdit/SmartEditAction'
import { ShortcutConfig } from './Shortcut/ShortcutConfig'
import { PlusMinusConfig } from './PlusMinus/PlusMinusConfig'
import { ColumnChooserAction } from './ColumnChooser/ColumnChooserAction'
import { ExportAction } from './Export/ExportAction'
import { PrintPreviewAction } from './PrintPreview/PrintPreviewAction'
import { FlashingCellsConfig } from './FlashingCells/FlashingCellsConfig'
import { CalendarsConfig } from './Calendars/CalendarsConfig'
import { ConditionalStyleConfig } from './ConditionalStyle/ConditionalStyleConfig'
import { QuickSearchConfig } from './QuickSearch/QuickSearchConfig'
import { QuickSearchToolbarControl } from './QuickSearch/QuickSearchToolbarControl'
import { AdvancedSearchAction } from './AdvancedSearch/AdvancedSearchAction'
import { AdvancedSearchToolbarControl } from './AdvancedSearch/AdvancedSearchToolbarControl'
import { UserFilterConfig } from './UserFilter/UserFilterConfig'
import { ThemeConfig } from './Theme/ThemeConfig'
import { CellValidationConfig } from './CellValidation/CellValidationConfig'
import { LayoutConfig } from './Layout/LayoutConfig'
import { LayoutToolbarControl } from './Layout/LayoutToolbarControl'
import { DashboardConfig } from './Dashboard/DashboardConfig'
import { AdvancedSearchStrategyId, QuickSearchStrategyId, LayoutStrategyId } from '../Core/StrategyIds'
import * as StrategyIds from '../Core/StrategyIds'
import * as React from "react";

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
  PrintPreviewAction: PrintPreviewAction,
  QuickSearchConfig: QuickSearchConfig,
  AdvancedSearchAction: AdvancedSearchAction,
  UserFilterConfig: UserFilterConfig,
  ThemeConfig: ThemeConfig,
  CellValidationConfig: CellValidationConfig,
  LayoutConfig: LayoutConfig,
  DashboardConfig: DashboardConfig,
}

export const AdaptableDashboardViewFactory = new Map<string, React.ComponentClass<any>>([
  [StrategyIds.QuickSearchStrategyId, QuickSearchToolbarControl],
  [StrategyIds.AdvancedSearchStrategyId, AdvancedSearchToolbarControl],
  [StrategyIds.LayoutStrategyId, LayoutToolbarControl]
]);


interface IAdaptableViewFactory {
  [key: string]: any;
}