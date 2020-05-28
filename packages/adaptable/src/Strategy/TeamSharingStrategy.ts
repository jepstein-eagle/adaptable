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
    return (
      !this.adaptable.api.entitlementsApi.isFunctionHiddenEntitlement(this.Id) &&
      this.adaptable.adaptableOptions.teamSharingOptions &&
      this.adaptable.adaptableOptions.teamSharingOptions.enableTeamSharing &&
      !!this.adaptable.adaptableOptions.teamSharingOptions.getSharedEntities &&
      !!this.adaptable.adaptableOptions.teamSharingOptions.setSharedEntities
    );
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
