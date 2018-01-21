import { ILayoutStrategy, ILayout } from '../Core/Interface/ILayoutStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import * as StrategyNames from '../Core/StrategyNames'
import * as StrategyGlyphs from '../Core/StrategyGlyphs'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
    public CurrentLayout: string

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.LayoutStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.LayoutStrategyName, ScreenPopups.LayoutConfigPopup, StrategyGlyphs.LayoutGlyph);
    }
 

}