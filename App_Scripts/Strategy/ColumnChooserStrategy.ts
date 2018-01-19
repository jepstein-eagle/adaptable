import { MenuReduxActionItem } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyConstants from '../Core/StrategyConstants'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IColumnChooserStrategy } from '../Core/Interface/IColumnChooserStrategy'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'

export class ColumnChooserStrategy extends AdaptableStrategyBase implements IColumnChooserStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ColumnChooserStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyConstants.ColumnChooserStrategyFriendlyName, ScreenPopups.ColumnChooserActionPopup,  StrategyConstants.ColumnChooserGlyph);
    }
    
    protected addColumnMenuItems(columnId: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(new MenuReduxActionItem(
                "Hide Column",
                this.Id,
                GridRedux.HideColumn(columnId),
                StrategyConstants.ColumnChooserGlyph)))
    }

}