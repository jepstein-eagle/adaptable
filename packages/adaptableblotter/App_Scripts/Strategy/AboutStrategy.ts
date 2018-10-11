import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IStrategy } from './Interface/IStrategy';

export class AboutStrategy extends AdaptableStrategyBase implements IStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.AboutStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.AboutStrategyName, ScreenPopups.AboutPopup, StrategyConstants.AboutGlyph);
    }
   
}