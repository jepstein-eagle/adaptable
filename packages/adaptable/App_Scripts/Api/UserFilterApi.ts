import { UserFilterState, UserFilter } from '../PredefinedConfig/UserFilterState';

/**
 * Provides full and comprehensive run-time access to the User Filter function and associated state.
 *
 * The User Filter function enables you to create your own custom filters that can be saved and re-used in multiple functions in Adaptable
 */
export interface UserFilterApi {
  /**
   * Retrieves the User Filter section from Adaptable State
   *
   */
  getUserFilterState(): UserFilterState;

  /**
   * Gets all the User Filter objects in Adaptable State
   */
  getAllUserFilter(): UserFilter[];

  /**
   * Opens the User Filter popup screen
   */
  showUserFilterPopup(): void;
}
