import {MenuItemShowPopup} from './MenuItem'
import {AdaptableStrategyBase} from './AdaptableStrategyBase'
import {SmartEditAction} from '../../View/SmartEditAction'


export class SmartEditStrategy extends AdaptableStrategyBase {
    private menuItemConfig : IMenuItem;
	constructor() {
        super("SmartEditStrategy")
        this.menuItemConfig = new MenuItemShowPopup("Smart Edit", this.Id,  SmartEditAction.name );
	}

    getMenuItems() : IMenuItem[] { 
        return [this.menuItemConfig];
    }
}