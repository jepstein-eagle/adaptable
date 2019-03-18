import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter'
import { IColumnInfoStrategy } from './Interface/IColumnInfoStrategy'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { IColumn } from '../Utilities/Interface/IColumn';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';

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