import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { UserFilterApi } from '../UserFilterApi';
import { UserFilterState, UserFilter } from '../../PredefinedConfig/UserFilterState';
import { ApiBase } from './ApiBase';

export class UserFilterApiImpl extends ApiBase implements UserFilterApi {
  public getUserFilterState(): UserFilterState {
    return this.getAdaptableState().UserFilter;
  }

  public getAllUserFilter(): UserFilter[] {
    return this.getUserFilterState().UserFilters;
  }

  public showUserFilterPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.UserFilterStrategyId,
      ScreenPopups.UserFilterPopup
    );
  }
}
