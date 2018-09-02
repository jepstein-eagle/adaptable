import { IApplicationStrategy } from './Interface/IApplicationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { StringExtensions } from '../Core/Extensions/StringExtensions'
import { IAdaptableBlotterOptions } from '../Core/Api/Interface/IAdaptableBlotterOptions';


export class ApplicationStrategy extends AdaptableStrategyBase implements IApplicationStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ApplicationStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ApplicationStrategyName, ScreenPopups.ApplicationPopup, StrategyGlyphs.ApplicationGlyph);
    }

    
}