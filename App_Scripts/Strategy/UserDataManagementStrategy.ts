import { ResetUserData } from '../Redux/Store/AdaptableBlotterStore';
import { IUserDataManagementStrategy } from '../Strategy/Interface/IUserDataManagementStrategy';
import { MenuReduxActionItem } from '../Core/MenuItem';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IMenuItem } from '../Strategy/Interface/IStrategy';
import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux'

const cleanUserData: string = "CleanUserData"

export class UserDataManagementStrategy extends AdaptableStrategyBase implements IUserDataManagementStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.UserDataManagementStrategyId, blotter)
        this.menuItemConfig = new MenuReduxActionItem("Clean User Data", this.Id, ResetUserData(), "user");
    }
   
    public getMenuItems(): IMenuItem[] {
        if ("production" == process.env.NODE_ENV) {
            return [];
        }
        return [this.menuItemConfig];
    }
}