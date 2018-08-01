import { IChartsStrategy } from './Interface/IChartsStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';


export class ChartsStrategy extends AdaptableStrategyBase implements IChartsStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ChartsStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ChartsStrategyName, ScreenPopups.ChartsPopup, StrategyGlyphs.ChartsGlyph);
    }

    
}