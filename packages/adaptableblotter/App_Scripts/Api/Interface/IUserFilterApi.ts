import { UserFilterState, UserFilter } from '../../PredefinedConfig/IUserState/UserFilterState';
export interface IUserFilterApi {
  getUserFilterState(): UserFilterState;
  getAllUserFilter(): UserFilter[];
}
