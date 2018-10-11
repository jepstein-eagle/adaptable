import { ITeamSharingStrategy } from './Interface/ITeamSharingStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.TeamSharingStrategyId, blotter)

    }

    protected addPopupMenuItem() {
            this.createMenuItemShowPopup(StrategyIds.TeamSharingStrategyName, ScreenPopups.TeamSharingPopup, StrategyIds.TeamSharingGlyph);
     }

    protected hasPopupMenu(): boolean{
        return  this.blotter.BlotterOptions.enableRemoteConfigServer;
    }

    protected InitState() {
        //nothing 
    }
}