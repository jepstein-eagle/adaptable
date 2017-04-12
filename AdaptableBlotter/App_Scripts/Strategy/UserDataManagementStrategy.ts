import { ResetUserData } from '../Redux/Store/AdaptableBlotterStore';
import { IUserDataManagementStrategy } from '../Core/Interface/IUserDataManagementStrategy';
import { MenuReduxActionItem } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import { AdaptableViewFactory } from '../View/AdaptableViewFactory'
import * as StrategyIds from '../Core/StrategyIds'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType } from '../Core/Enums';
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