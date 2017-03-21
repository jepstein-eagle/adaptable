import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IThemeStrategy } from '../Core/Interface/IThemeStrategy'
import { MenuType } from '../Core/Enums';


export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ThemeStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Theme Picker", 'ThemeConfig', MenuType.ConfigurationPopup, "leaf");
    }

}