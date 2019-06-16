import {
  UserFilterState,
  IUserFilter,
} from '../../PredefinedConfig/IUserState Interfaces/UserFilterState';
export interface IUserFilterApi {
  getUserFilterState(): UserFilterState;
  getAllUserFilter(): IUserFilter[];
}
