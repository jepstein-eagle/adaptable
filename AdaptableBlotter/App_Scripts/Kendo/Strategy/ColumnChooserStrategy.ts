import {MenuItemShowPopup} from '../../Core/MenuItem'
import {AdaptableStrategyBase} from '../../Core/AdaptableStrategyBase'
import {AdaptableViewFactory} from '../../View/AdaptableViewFactory'
import * as StrategyIds from '../../Core/StrategyIds'
import {IMenuItem} from '../../Core/Interface/IStrategy';
import {IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter'

export class ColumnChooserStrategy extends AdaptableStrategyBase {
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ColumnChooserStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Column Chooser", this.Id, "ColumnChooserAction");
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}