import { IApplicationStrategy } from './Interface/IApplicationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';


export class ApplicationStrategy extends AdaptableStrategyBase implements IApplicationStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ApplicationStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ApplicationStrategyName, ScreenPopups.ApplicationPopup, StrategyConstants.ApplicationGlyph);
    }

    
}