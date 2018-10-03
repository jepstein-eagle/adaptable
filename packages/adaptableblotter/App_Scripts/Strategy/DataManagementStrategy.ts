import { IDataManagementStrategy } from './Interface/IDataManagementStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';

export class DataManagementStrategy extends AdaptableStrategyBase implements IDataManagementStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.DataManagementStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        if ("production" == process.env.NODE_ENV) {
            return;
        }
        this.createMenuItemShowPopup(StrategyIds.DataManagementStrategyName, ScreenPopups.DataManagementPopup, StrategyIds.DataManagementGlyph);
 
    }
    
}