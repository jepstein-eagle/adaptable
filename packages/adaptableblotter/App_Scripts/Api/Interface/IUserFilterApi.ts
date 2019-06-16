import { UserFilterState, UserFilter } from '../../PredefinedConfig/RunTimeState/UserFilterState';
export interface IUserFilterApi {
  getUserFilterState(): UserFilterState;
  getAllUserFilter(): UserFilter[];
}
