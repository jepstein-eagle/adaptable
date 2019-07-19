/**
 * General options section of Adaptable Blotter Options.
 *
 * Essentially those options that didnt fit into an obvious group (e.g. Layout, Filter etc.) but we didnt want at root.
 *
 * Includes options for Server Searching, Themes and managing Primary Keys.
 *
 * ```ts
 * generalOptions = {
 *  serverSearchOption: 'AdvancedSearch',
 *  useDefaultVendorGridThemes: false
 *};
 * ```
 */
export interface GeneralOptions {
  /**
   * Which searching and filtering options, if any, should take place on the server.
   *
   * Leave unset (default is 'None') to perform everything on the client.
   *
   * This allows you to perform a mixture e.g. do Column Filters on the client but Advanced Seearch on the server.
   *
   * **Default Value: None**
   */
  serverSearchOption?: 'None' | 'AdvancedSearch' | 'AllSearch' | 'AllSearchandSort';

  /**
   * Use the default theme that we provide for the vendor grid.
   *
   * There is one each for 'Light Theme' and 'Dark Theme'.
   *
   * **Default Value: true**
   *
   */
  useDefaultVendorGridThemes?: boolean;

  /**
   * Whether or not to show a warning if the primary key column identified in the base Options does not exist.
   *
   * **Recommended to set to true** (default) as a wrongly applied primary key can affect many functions
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
   * Whether or not to show a Blotter Tool Panel on the right hand side (ag-Grid only).
   *
   * Recommended to set to true (default) to give users access.
   *
   * Note - the toolpanel is not yet operational and will be released in the Summer of 2019.
   *
   * **Default Value: false**
   */
  showAdaptableBlotterToolPanel?: boolean;
}

export interface UserFunction {
  /**
   * Sends the Audit Messages to an (internal) HTTP channel for you to listen to.
   *
   * This is the most popular option though requires you to use your internal, listening software (like the Elastic stack) to wire it up.
   *
   * **Default Value: false**
   */
  auditToHttpChannel?: boolean;

  /**
   * Sends the Audit Message to the Console.
   *
   * Primarily used by developers as a useful design-time or debugging tool when building the application.
   *
   * But can also be used by Support when investigating user behaviour or Blotter activity.
   *
   * **Default Value: false**
   */
  auditToConsole?: boolean;

  /**
   * Fires the Audit Message as an Audit Log (AuditLogEventArgs) event.
   *
   * You listen to this Event the same way that you do all other Adaptable Blotter events.
   *
   * **Default Value: false**
   */
  auditAsEvent?: boolean;

  /**
   * Fires the Audit Message as an Alert.
   *
   * This Alert will appear in the Alert toolbar and, optionally, also as a popup (based on the value of the *alertShowAsPopup* property).
   *
   * **Default Value: false**
   */
  auditAsAlert?: boolean;
}
