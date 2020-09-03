import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ApiBase } from './ApiBase';
import { TeamSharingApi } from '../TeamSharingApi';

export class TeamSharingApiImpl extends ApiBase implements TeamSharingApi {
  public isTeamSharingActivated(): boolean {
    return (
      !this.adaptable.api.entitlementsApi.isFunctionHiddenEntitlement(
        StrategyConstants.TeamSharingStrategyId
      ) &&
      this.adaptable.adaptableOptions.teamSharingOptions &&
      this.adaptable.adaptableOptions.teamSharingOptions.enableTeamSharing &&
      !!this.adaptable.adaptableOptions.teamSharingOptions.getSharedEntities &&
      !!this.adaptable.adaptableOptions.teamSharingOptions.setSharedEntities
    );
  }

  public showTeamSharingPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.TeamSharingStrategyId,
      ScreenPopups.TeamSharingPopup
    );
  }
}
