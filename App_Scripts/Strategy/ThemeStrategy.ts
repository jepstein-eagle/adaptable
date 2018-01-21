import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import * as StrategyNames from '../Core/StrategyNames'
import * as StrategyGlyphs from '../Core/StrategyGlyphs'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IThemeStrategy } from '../Core/Interface/IThemeStrategy'

export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ThemeStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.ThemeStrategyName, ScreenPopups.ThemeConfig, StrategyGlyphs.ThemeGlyph);
    }
   
}