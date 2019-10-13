import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { ITeamSharingStrategy } from './Interface/ITeamSharingStrategy';
import { BlotterHelper } from '../Utilities/Helpers/BlotterHelper';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.TeamSharingStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    if (BlotterHelper.isConfigServerEnabled(this.blotter.blotterOptions)) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.TeamSharingStrategyName,
        ComponentName: ScreenPopups.TeamSharingPopup,
        GlyphIcon: StrategyConstants.TeamSharingGlyph,
      });
    }
  }
}
