import { MenuReduxActionItem } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyConstants from '../Core/StrategyConstants'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IColumnInfoStrategy } from '../Core/Interface/IColumnInfoStrategy'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'

export class ColumnInfoStrategy extends AdaptableStrategyBase implements IColumnInfoStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ColumnInfoStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyConstants.ColumnInfoStrategyFriendlyName, ScreenPopups.ColumnInfoActionPopup, StrategyConstants.ColumnInfoGlyph);
    }


    protected addColumnMenuItems(columnId: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(this.createMenuItemShowPopup(
                StrategyConstants.ColumnInfoStrategyFriendlyName,
                ScreenPopups.ColumnInfoActionPopup,
                StrategyConstants.ColumnInfoGlyph,
                columnId)))
    }

}