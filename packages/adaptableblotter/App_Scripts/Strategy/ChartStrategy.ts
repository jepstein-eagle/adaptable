import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';


export class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ChartStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ChartStrategyName, ScreenPopups.ChartPopup, StrategyGlyphs.ChartGlyph);
    }

    
}