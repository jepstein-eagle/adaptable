import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ITeamSharingStrategy } from './Interface/ITeamSharingStrategy';
import { AdaptableHelper } from '../Utilities/Helpers/AdaptableHelper';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class TeamSharingStrategy extends AdaptableStrategyBase implements ITeamSharingStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.TeamSharingStrategyId,
      StrategyConstants.TeamSharingStrategyFriendlyName,
      StrategyConstants.TeamSharingGlyph,
      ScreenPopups.TeamSharingPopup,
      adaptable
    );
  }

  public isStrategyAvailable(): boolean {
    return this.adaptable.api.teamSharingApi.isTeamSharingActivated();
  }
}
