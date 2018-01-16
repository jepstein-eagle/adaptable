import { ResetUserData } from '../Redux/Store/AdaptableBlotterStore';
import { ITeamSharingStrategy } from '../Core/Interface/ITeamSharingStrategy';
import { MenuReduxActionItem } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { MenuType } from '../Core/Enums';
import * as TeamSharingRedux from '../Redux/ActionsReducers/TeamSharingRedux'

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.TeamSharingStrategyId, blotter)
        if (blotter.BlotterOptions.enableRemoteConfigServer) {
            this.menuItemConfig = this.createMenuItemShowPopup("Team Sharing", 'TeamSharingAction', MenuType.ActionPopup, "share");
        }
    }
    protected InitState() {
    }
}