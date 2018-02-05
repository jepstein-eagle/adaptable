import { ResetUserData } from '../Redux/Store/AdaptableBlotterStore';
import { ITeamSharingStrategy } from '../Strategy/Interface/ITeamSharingStrategy';
import { MenuReduxActionItem } from '../Core/MenuItem';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import * as TeamSharingRedux from '../Redux/ActionsReducers/TeamSharingRedux'

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.TeamSharingStrategyId, blotter)
        if (blotter.BlotterOptions.enableRemoteConfigServer) {
            this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.TeamSharingStrategyName, ScreenPopups.TeamSharingPopup, StrategyGlyphs.TeamSharingGlyph);
        }
    }
    protected InitState() {
        //nothing 
    }
}