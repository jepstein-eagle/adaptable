import { CustomSortConfig } from './CustomSortConfig'
import { SmartEditAction } from './SmartEditAction'
import { ShortcutConfig } from './Shortcut/ShortcutConfig'
import { PlusMinusConfig } from './PlusMinusConfig'
import { ColumnChooserAction } from './ColumnChooserAction'
import { ExcelExportAction } from './ExcelExportAction'
import { FlashingCellsConfig } from './FlashingCells/FlashingCellsConfig'
import { CalendarsConfig } from './Calendars/CalendarsConfig'
import * as React from "react";

export const AdaptableViewFactory: IAdaptableViewFactory = {
  CustomSortConfig: CustomSortConfig,
  SmartEditAction: SmartEditAction,
  ShortcutConfig: ShortcutConfig,
  PlusMinusConfig: PlusMinusConfig,
  ColumnChooserAction: ColumnChooserAction,
  ExcelExportAction: ExcelExportAction,
  FlashingCellsConfig: FlashingCellsConfig,
  CalendarsConfig: CalendarsConfig
}


interface IAdaptableViewFactory {
  [key: string]: any;
}