import { ILayoutStrategy, ILayout } from '../Strategy/Interface/ILayoutStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IMenuItem } from '../Core/Interface/IMenu';;
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
    public CurrentLayout: string

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.LayoutStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.LayoutStrategyName, ScreenPopups.LayoutPopup, StrategyGlyphs.LayoutGlyph);
    }
 

}