import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';

/**
 * Options for managing the User Interface Adaptable.
 *
 * Includes options for themes, menus, tool panels etc.
 *
 * ```ts
 * userInterfaceOptions = {
 *  showAdaptableToolPanel: true
 *  useDefaultVendorGridThemes: false
 *};
 * ```
 */
export interface UserInterfaceOptions {
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
   * Whether or not to show an Adaptable Tool Panel on the right hand side (ag-Grid only).
   *
   * Note - the toolpanel is not yet operational and will be released in v.6 (January 2020).
   *
   * **Default Value: false**
   */
  showAdaptableToolPanel?: boolean;

  /**
   * Whether or not to show the Adaptable specific Context Menu items.
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
   * Whether or not to show the Adaptable specific Column Menu items.
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
}
