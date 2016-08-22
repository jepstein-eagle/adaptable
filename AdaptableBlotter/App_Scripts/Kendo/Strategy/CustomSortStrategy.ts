import {MenuItemShowPopup} from '../../Core/MenuItem'
import {AdaptableStrategyBase} from '../../Core/AdaptableStrategyBase'
import {CustomSortConfig} from '../../View/CustomSortConfig'



export class CustomSortStrategy extends AdaptableStrategyBase {
    private menuItemConfig : IMenuItem;
	constructor() {
        super("CustomSort")
        this.menuItemConfig = new MenuItemShowPopup("Configure Custom Sort", this.Id,  CustomSortConfig.name );
	}

    getMenuItems() : IMenuItem[] { 
        return [this.menuItemConfig];
    }
}