import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IThemeStrategy } from '../Core/Interface/IThemeStrategy'
import { MenuType } from '../Core/Enums';


export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ThemeStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Theme Picker", this.Id, 'ThemeConfig', MenuType.Configuration, "leaf");
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}