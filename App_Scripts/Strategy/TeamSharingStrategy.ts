import { ResetUserData } from '../Redux/Store/AdaptableBlotterStore';
import { ITeamSharingStrategy } from '../Core/Interface/ITeamSharingStrategy';
import { MenuReduxActionItem } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IMenuItem, IUIError } from '../Core/Interface/IStrategy';
import { MenuType } from '../Core/Enums';
import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'


const teamSharing: string = "teamSharing"

const error: IUIError = {
    ErrorMsg: "Team Sharing is not available in this demo"
}

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.TeamSharingStrategyId, blotter)
        this.menuItemConfig = new MenuReduxActionItem("Team Sharing", this.Id, PopupRedux.PopupShowError(error), "share");
    }
    protected InitState() {
    }
}