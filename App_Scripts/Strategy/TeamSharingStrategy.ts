import { ResetUserData } from '../Redux/Store/AdaptableBlotterStore';
import { ITeamSharingStrategy } from '../Core/Interface/ITeamSharingStrategy';
import { MenuReduxActionItem } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import * as StrategyNames from '../Core/StrategyNames'
import * as StrategyGlyphs from '../Core/StrategyGlyphs'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import * as TeamSharingRedux from '../Redux/ActionsReducers/TeamSharingRedux'

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.TeamSharingStrategyId, blotter)
        if (blotter.BlotterOptions.enableRemoteConfigServer) {
            this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.TeamSharingStrategyName, ScreenPopups.TeamSharingAction, StrategyGlyphs.TeamSharingGlyph);
        }
    }
    protected InitState() {
        //nothing 
    }
}