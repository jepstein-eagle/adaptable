import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyConstants from '../Core/StrategyConstants'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IDashboardStrategy } from '../Core/Interface/IDashboardStrategy'


export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.DashboardStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Dashboard", 'DashboardConfig', "dashboard");
    }

}