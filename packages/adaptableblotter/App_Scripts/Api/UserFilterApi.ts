import { IUserFilterApi } from './Interface/IUserFilterApi';
import {
  UserFilterState,
  IUserFilter,
} from '../PredefinedConfig/IUserState Interfaces/UserFilterState';
import { ApiBase } from './ApiBase';

export class UserFilterApi extends ApiBase implements IUserFilterApi {
  public getUserFilterState(): UserFilterState {
    return this.getBlotterState().UserFilter;
  }

  public getAllUserFilter(): IUserFilter[] {
    return this.getUserFilterState().UserFilters;
  }
}
