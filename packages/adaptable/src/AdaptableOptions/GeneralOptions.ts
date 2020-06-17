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
   * Whether or not to show a warning if AdapTable cannot find a column.
   *
   * Not required in most circumstances but in some rare use cases (e.g. if columns get added to the grid piecemeal) then AdapTable can send unnecessary warnings.
   *
   * **Default Value: false**
   */
  showMissingColumnsWarning?: boolean;

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

  /**
   * Whether to show an aggregated totals rows at the top of the Grid when running row grouping.
   *
   * This is primarily for ag-Grid users who want to see totals, as currently that option is only available as a footer.
   *
   * Setting this property to true wil display a pinned grouped total row at the top of the Grid. [See this demo](https://demo.adaptabletools.com/aggridfeatures/aggridrowgroupingdemo)
   *
   * **Default Value: false**
   */
  showGroupingTotalsAsHeader?: boolean;
}
