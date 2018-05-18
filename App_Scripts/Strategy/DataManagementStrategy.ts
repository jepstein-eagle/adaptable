import { ResetUserData } from '../Redux/Store/AdaptableBlotterStore';
import { IDataManagementStrategy } from '../Strategy/Interface/IDataManagementStrategy';
import { MenuItemDoReduxAction } from '../Core/MenuItem';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IMenuItem } from '../Core/Interface/IMenu';;


export class DataManagementStrategy extends AdaptableStrategyBase implements IDataManagementStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.DataManagementStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        if ("production" == process.env.NODE_ENV) {
            return;
        }
        this.createMenuItemShowPopup(StrategyNames.DataManagementStrategyName, ScreenPopups.DataManagementPopup, StrategyGlyphs.DataManagementGlyph);
 
    }
    


}