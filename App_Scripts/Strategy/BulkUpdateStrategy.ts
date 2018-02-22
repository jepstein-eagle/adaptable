import { IBulkUpdateStrategy } from './Interface/IBulkUpdateStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter, IAdaptableBlotterOptions } from '../Core/Interface/IAdaptableBlotter';
import { StringExtensions } from '../Core/Extensions/StringExtensions'

export class BulkUpdateStrategy extends AdaptableStrategyBase implements IBulkUpdateStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.BulkUpdateStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.BulkUpdateStrategyName, ScreenPopups.BulkUpdatePopup, StrategyGlyphs.BulkUpdateGlyph);
    }

    
}