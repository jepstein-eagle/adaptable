import { IDataManagementStrategy } from './Interface/IDataManagementStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';

export class DataManagementStrategy extends AdaptableStrategyBase implements IDataManagementStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.DataManagementStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        if ("production" == process.env.NODE_ENV) {
            return;
        }
        this.createMenuItemShowPopup(StrategyConstants.DataManagementStrategyName, ScreenPopups.DataManagementPopup, StrategyConstants.DataManagementGlyph);
 
    }
    
}