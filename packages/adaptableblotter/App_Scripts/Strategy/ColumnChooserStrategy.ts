import { MenuItemDoReduxAction } from '../Core/MenuItem'
import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IColumnChooserStrategy } from './Interface/IColumnChooserStrategy'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { IColumn } from '../Core/Interface/IColumn';
import { ColumnHelper } from '../Core/Helpers/ColumnHelper';

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
