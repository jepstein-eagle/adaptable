import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import * as StrategyNames from '../Core/StrategyNames'
import * as StrategyGlyphs from '../Core/StrategyGlyphs'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IMenuItem } from '../Strategy/Interface/IStrategy'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IDashboardStrategy } from '../Strategy/Interface/IDashboardStrategy'


export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.DashboardStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.DashboardStrategyName, ScreenPopups.DashboardPopup, StrategyGlyphs.DashboardGlyph);
    }

}