import { MenuReduxActionItem } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import { AdaptableViewFactory } from '../View/AdaptableViewFactory'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IColumnChooserStrategy } from '../Core/Interface/IColumnChooserStrategy'
import { MenuType } from '../Core/Enums';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'

export class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ColumnChooserStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Column Chooser", "ColumnChooserAction", MenuType.ActionPopup, "list-alt");
    }
    protected addColumnMenuItems(columnId: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(new MenuReduxActionItem(
                "Hide Column",
                this.Id,
                GridRedux.HideColumn(columnId),
                "list-alt")))
    }

}