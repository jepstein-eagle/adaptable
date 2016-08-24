import {MenuItemShowPopup} from '../../Core/MenuItem'
import {AdaptableStrategyBase} from '../../Core/AdaptableStrategyBase'
import {CustomSortConfig} from '../../View/CustomSortConfig'
import * as StrategyIds from '../../Core/StrategyIds'
//TODO : need to move the interface
import {IAdaptableBlotter} from '../AdaptableBlotter'

export class CustomSortStrategy extends AdaptableStrategyBase {
    private menuItemConfig : IMenuItem;
	constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CustomSortStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Custom Sort", this.Id,  CustomSortConfig.name );
	}

    getMenuItems() : IMenuItem[] { 
        return [this.menuItemConfig];
    }
}