import { ITeamSharingStrategy } from './Interface/ITeamSharingStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { BlotterHelper } from '../Utilities/Helpers/BlotterHelper';

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.TeamSharingStrategyId, blotter)

    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.TeamSharingStrategyName, ScreenPopups.TeamSharingPopup, StrategyConstants.TeamSharingGlyph);
    }

    protected hasPopupMenu(): boolean {
        return BlotterHelper.IsConfigServerEnabled(this.blotter.BlotterOptions)
    }

    protected InitState() {
        //nothing 
    }
}