import { IApplicationStrategy } from './Interface/IApplicationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';


export class ApplicationStrategy extends AdaptableStrategyBase implements IApplicationStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ApplicationStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ApplicationStrategyName, ScreenPopups.ApplicationPopup, StrategyConstants.ApplicationGlyph);
    }

}