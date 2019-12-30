import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../BlotterInterfaces/IAdaptable';
import { ITeamSharingStrategy } from './Interface/ITeamSharingStrategy';
import { AdaptableHelper } from '../Utilities/Helpers/AdaptableHelper';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
  constructor(blotter: IAdaptable) {
    super(StrategyConstants.TeamSharingStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (AdaptableHelper.isConfigServerEnabled(this.blotter.blotterOptions)) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.TeamSharingStrategyFriendlyName,
        ComponentName: ScreenPopups.TeamSharingPopup,
        Icon: StrategyConstants.TeamSharingGlyph,
      });
    }
  }
}
