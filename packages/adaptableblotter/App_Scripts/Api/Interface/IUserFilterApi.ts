import { UserFilterState, UserFilter } from '../../PredefinedConfig/RunTimeState/UserFilterState';
export interface IUserFilterApi {
  getUserFilterState(): UserFilterState;
  getAllUserFilter(): UserFilter[];

  /**
   * Opens the User Filter popup screen
   */
  showUserFilterPopup(): void;
}
