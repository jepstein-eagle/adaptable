import { UserFilterState, IUserFilter } from '../../PredefinedConfig/IUserState/UserFilterState';
export interface IUserFilterApi {
  getUserFilterState(): UserFilterState;
  getAllUserFilter(): IUserFilter[];
}
