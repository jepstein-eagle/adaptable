import { ResetUserData } from '../Redux/Store/AdaptableBlotterStore';
import { ITeamSharingStrategy } from '../Core/Interface/ITeamSharingStrategy';
import { MenuItem } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import { AdaptableViewFactory } from '../View/AdaptableViewFactory'
import * as StrategyIds from '../Core/StrategyIds'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IMenuItem, IUIError } from '../Core/Interface/IStrategy';
import { MenuType } from '../Core/Enums';
import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'


const teamSharing: string = "teamSharing"

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.TeamSharingStrategyId, blotter)
        this.menuItemConfig = new MenuItem("Team Sharing", this.Id, teamSharing, MenuType.Action, "share");
    }

    public onAction(action: string) {
        if (action == teamSharing) {

            let errorMessage: string = "Team Sharing is not available in this demo";
            let error: IUIError = {
                ErrorMsg: errorMessage
            }
            this.blotter.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowErrorAction>(PopupRedux.PopupShowError(error));


        }
    }
}