/**
 * General options section of Adaptable Options.
 *
 * Essentially those options that didnt fit into an obvious group (e.g. Layout, Filter etc.) but we didnt want at root.
 *
 * Includes options for managing Primary Keys.
 *
 * ```ts
 * generalOptions = {
 *  showMissingPrimaryKeyWarning: true,
 *};
 * ```
 */
export interface GeneralOptions {
  /**
   * Whether or not to show a warning if the primary key column identified in the base Options does not exist.
   *
   * **Recommended to set to true** (default) as a wrongly applied `primaryKey` can affect many functions
   *
   * **Default Value: true**
   */
  showMissingPrimaryKeyWarning?: boolean;

  /**
   * Whether to prevent a duplicate value being entered into the Primary Key column.
   *
   * **Recommended to set to true** (default) to ensure that each cell can in the grid can be uniquely identified and referred to.
   *
   * **Default Value: true**
   */
  preventDuplicatePrimaryKeyValues?: boolean;

  /**
   * Runs a check to see if the current version of Adaptable is the latest version.
   *
   * If set to true, then a check is run when Adaptable starts up and a message is written to the Console if its not the latest version.
   *
   * **Default Value: false**
   */
  // checkIfLatestVersionOnStartup?: boolean;
}
