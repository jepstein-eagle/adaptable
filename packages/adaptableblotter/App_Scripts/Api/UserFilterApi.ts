import { UserFilterState, UserFilter } from '../PredefinedConfig/UserFilterState';

/**
 * Provides full and comprehensive run-time access to the User Filter function and associated state.
 *
 * The User Filter function enables you to create your own custom filters that can be saved and re-used in multiple functions in the Adaptable Blotter
 */
export interface UserFilterApi {
  /**
   * Retrieves the User Filter section from the Adaptable Blotter State
   *
   */
  getUserFilterState(): UserFilterState;

  /**
   * Gets all the User Filter objects in the Adaptable Blotter State
   */
  getAllUserFilter(): UserFilter[];

  /**
   * Opens the User Filter popup screen
   */
  showUserFilterPopup(): void;
}
