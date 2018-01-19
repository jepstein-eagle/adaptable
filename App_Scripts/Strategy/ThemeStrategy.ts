import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyConstants from '../Core/StrategyConstants'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IThemeStrategy } from '../Core/Interface/IThemeStrategy'

export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ThemeStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Theme Picker", 'ThemeConfig', "leaf");
    }
   
}