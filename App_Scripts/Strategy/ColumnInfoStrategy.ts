import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IColumnInfoStrategy } from '../Strategy/Interface/IColumnInfoStrategy'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class ColumnInfoStrategy extends AdaptableStrategyBase implements IColumnInfoStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ColumnInfoStrategyId, blotter)
      }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ColumnInfoStrategyName, ScreenPopups.ColumnInfoPopup, StrategyGlyphs.ColumnInfoGlyph);
    }

    protected addColumnMenuItem(columnId: string): void {
        this.createContextMenuItemShowPopup(
            StrategyNames.ColumnInfoStrategyName,
            ScreenPopups.ColumnInfoPopup,
            StrategyGlyphs.ColumnInfoGlyph,
            columnId)
    }
}