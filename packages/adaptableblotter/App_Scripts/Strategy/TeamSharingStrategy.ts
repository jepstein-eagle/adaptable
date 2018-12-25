import { ITeamSharingStrategy } from './Interface/ITeamSharingStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.TeamSharingStrategyId, blotter)

    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.TeamSharingStrategyName, ScreenPopups.TeamSharingPopup, StrategyConstants.TeamSharingGlyph);
    }

    protected hasPopupMenu(): boolean {
        return this.blotter.BlotterOptions.remoteConfigServerOptions != null
            && this.blotter.BlotterOptions.remoteConfigServerOptions.enableRemoteConfigServer != null
            && this.blotter.BlotterOptions.remoteConfigServerOptions.enableRemoteConfigServer == true;
    }

    protected InitState() {
        //nothing 
    }
}