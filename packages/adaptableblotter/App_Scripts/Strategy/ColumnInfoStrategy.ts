import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IColumnInfoStrategy } from './Interface/IColumnInfoStrategy'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { IColumn } from '../Core/Interface/IColumn';
import { ColumnHelper } from '../Core/Helpers/ColumnHelper';

export class ColumnInfoStrategy extends AdaptableStrategyBase implements IColumnInfoStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ColumnInfoStrategyId, blotter)
      }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ColumnInfoStrategyName, ScreenPopups.ColumnInfoPopup, StrategyConstants.ColumnInfoGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            this.createContextMenuItemShowPopup(
            StrategyConstants.ColumnInfoStrategyName,
            ScreenPopups.ColumnInfoPopup,
            StrategyConstants.ColumnInfoGlyph,
            column.ColumnId)
    }
}
}