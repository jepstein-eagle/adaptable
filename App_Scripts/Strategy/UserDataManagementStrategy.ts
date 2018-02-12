import { ResetUserData } from '../Redux/Store/AdaptableBlotterStore';
import { IUserDataManagementStrategy } from '../Strategy/Interface/IUserDataManagementStrategy';
import { MenuItemDoReduxAction } from '../Core/MenuItem';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IMenuItem } from '../Core/Interface/IMenu';;


export class UserDataManagementStrategy extends AdaptableStrategyBase implements IUserDataManagementStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.UserDataManagementStrategyId, blotter)
        this.menuItemConfig = new MenuItemDoReduxAction("Clean User Data", this.Id, ResetUserData(), "user");
    }
   
    public getMenuItems(): IMenuItem[] {
        if ("production" == process.env.NODE_ENV) {
            return [];
        }
        return [this.menuItemConfig];
    }
}