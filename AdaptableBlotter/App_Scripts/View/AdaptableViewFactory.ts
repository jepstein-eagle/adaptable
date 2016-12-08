import { CustomSortConfig } from './CustomSort/CustomSortConfig'
import { SmartEditAction } from './SmartEdit/SmartEditAction'
import { ShortcutConfig } from './Shortcut/ShortcutConfig'
import { PlusMinusConfig } from './PlusMinus/PlusMinusConfig'
import { ColumnChooserAction } from './ColumnChooser/ColumnChooserAction'
import { ExcelExportAction } from './Export/ExcelExportAction'
import { PrintPreviewAction } from './PrintPreview/PrintPreviewAction'
import { FlashingCellsConfig } from './FlashingCells/FlashingCellsConfig'
import { CalendarsConfig } from './Calendars/CalendarsConfig'
import { ConditionalStyleConfig } from './ConditionalStyle/ConditionalStyleConfig'
import { QuickSearchAction } from './QuickSearch/QuickSearchAction'
import { AdvancedSearchAction } from './AdvancedSearch/AdvancedSearchAction'
import * as React from "react";

export const AdaptableViewFactory: IAdaptableViewFactory = {
  CustomSortConfig: CustomSortConfig,
  SmartEditAction: SmartEditAction,
  ShortcutConfig: ShortcutConfig,
  PlusMinusConfig: PlusMinusConfig,
  ColumnChooserAction: ColumnChooserAction,
  ExcelExportAction: ExcelExportAction,
  FlashingCellsConfig: FlashingCellsConfig,
  CalendarsConfig: CalendarsConfig,
  ConditionalStyleConfig: ConditionalStyleConfig,
  PrintPreviewAction: PrintPreviewAction,
  QuickSearchAction: QuickSearchAction,
  AdvancedSearchAction: AdvancedSearchAction,
}


interface IAdaptableViewFactory {
  [key: string]: any;
}