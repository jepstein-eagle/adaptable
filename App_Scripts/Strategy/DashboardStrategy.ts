import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IDashboardStrategy } from '../Core/Interface/IDashboardStrategy'
import { MenuType } from '../Core/Enums';


export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.DashboardStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Dashboard", 'DashboardConfig', MenuType.ConfigurationPopup, "dashboard");
    }

    protected InitState() {
    }
}