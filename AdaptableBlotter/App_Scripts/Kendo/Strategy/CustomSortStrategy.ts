import {MenuItemShowPopup} from './MenuItem'
import {AdaptableStrategyBase} from './AdaptableStrategyBase'
import {CustomSortConfig} from '../../View/CustomSortConfig'


export class CustomSortStrategy extends AdaptableStrategyBase {
    private menuItemConfig : IMenuItem;
	constructor() {
        super("CustomSortStrategy")
        this.menuItemConfig = new MenuItemShowPopup("Configure Custom Sort", this.Id,  CustomSortConfig.name );
	}

    getMenuItems() : IMenuItem[] { 
        return [this.menuItemConfig];
    }
}