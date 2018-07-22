import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
;
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
    public CurrentLayout: string

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.LayoutStrategyId, blotter)
       }
 
    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.LayoutStrategyName, ScreenPopups.LayoutPopup, StrategyGlyphs.LayoutGlyph);
    }

}