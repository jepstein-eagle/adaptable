import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';

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
   * There is one each for 'Light' and 'Dark'.
   *
   * **Default Value: true**
   *
   */
  useDefaultVendorGridThemes?: boolean;

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
   * Whether or not to show an Adaptable Tool Panel on the right hand side (ag-Grid only).
   *
   * Note - the toolpanel is not yet operational and will be released in v.6 (January 2020).
   *
   * **Default Value: false**
   */
  showAdaptableToolPanel?: boolean;

  /**
   * Whether or not to show the Adaptable Blotter specific Context Menu items.
   *
   * Can either be a boolean value or a function that will be called for every context menu item the Blotter provides.
   *
   * The two params to the function are:
   *
   * -  an `AdaptableMenuItem`
   *
   * -  the `MenuInfo` (row, column etc.)
   *
   * **Default Value: true**
   */
  showAdaptableContextMenu?:
    | boolean
    | ((menuItem: AdaptableMenuItem, menuInfo: MenuInfo) => boolean);

  /**
   * Whether or not to show the Adaptable Blotter specific Column Menu items.
   *
   * Can either be a boolean value or a function that will be called for every context menu item the Blotter provides.
   *
   * The two params to the function are:
   *
   * -  an `AdaptableMenuItem`
   *
   * -  the `MenuInfo` (row, column etc.)
   *
   * **Default Value: true**
   */
  showAdaptableColumnMenu?:
    | boolean
    | ((menuItem: AdaptableMenuItem, menuInfo: MenuInfo) => boolean);

  /**
   * Runs a check to see if the current version of the Adaptable Blotter is the latest version.
   *
   * If set to true, then a check is run when the Blotter starts up and a message is written to the Console if its not the latest version.
   *
   * **Default Value: false**
   */
  // checkIfLatestVersionOnStartup?: boolean;
}
