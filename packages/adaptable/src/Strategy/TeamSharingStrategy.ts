import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ITeamSharingStrategy } from './Interface/ITeamSharingStrategy';
import { AdaptableHelper } from '../Utilities/Helpers/AdaptableHelper';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.TeamSharingStrategyId, adaptable);
  }

  public isStrategyAvailable(): boolean {
    return this.adaptable.api.teamSharingApi.isTeamSharingActivated();
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.isStrategyAvailable()) {
      if (this.canCreateMenuItem('ReadOnly')) {
        return this.createMainMenuItemShowPopup({
          Label: StrategyConstants.TeamSharingStrategyFriendlyName,
          ComponentName: ScreenPopups.TeamSharingPopup,
          Icon: StrategyConstants.TeamSharingGlyph,
        });
      }
    }
  }
}
