import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IUserFilterApi } from './Interface/IUserFilterApi';
import { UserFilterState, UserFilter } from '../PredefinedConfig/RunTimeState/UserFilterState';
import { ApiBase } from './ApiBase';

export class UserFilterApi extends ApiBase implements IUserFilterApi {
  public getUserFilterState(): UserFilterState {
    return this.getBlotterState().UserFilter;
  }

  public getAllUserFilter(): UserFilter[] {
    return this.getUserFilterState().UserFilters;
  }

  public showUserFilterPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.UserFilterStrategyId,
      ScreenPopups.UserFilterPopup
    );
  }
}
