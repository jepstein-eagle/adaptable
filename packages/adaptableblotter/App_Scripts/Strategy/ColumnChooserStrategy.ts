import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter'
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { IColumn } from '../api/Interface/IColumn';

export class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ColumnChooserStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ColumnChooserStrategyName, ScreenPopups.ColumnChooserPopup, StrategyConstants.ColumnChooserGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            this.createContextMenuItemReduxAction(
                "Hide Column",
                StrategyConstants.ColumnChooserGlyph,
                GridRedux.GridHideColumn(column.ColumnId))
        }
    }
}
