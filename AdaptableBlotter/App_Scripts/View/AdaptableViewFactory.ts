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
import { QuickSearchAction } from './QuickSearch/QuickSearchAction'
import { AdvancedSearchAction } from './AdvancedSearch/AdvancedSearchAction'
import { AlertConfig } from './Alert/AlertConfig'
import { UserFilterConfig } from './UserFilter/UserFilterConfig'
import { ThemeConfig } from './Theme/ThemeConfig'
import { EditingRestrictionConfig } from './EditingRestriction/EditingRestrictionConfig'
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
  QuickSearchAction: QuickSearchAction,
  AdvancedSearchAction: AdvancedSearchAction,
  AlertConfig: AlertConfig,
  UserFilterConfig: UserFilterConfig,
  ThemeConfig: ThemeConfig,
  EditingRestrictionConfig: EditingRestrictionConfig,
}


interface IAdaptableViewFactory {
  [key: string]: any;
}