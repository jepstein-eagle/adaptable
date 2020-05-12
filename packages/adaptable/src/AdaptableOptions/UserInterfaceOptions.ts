import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';

/**
 * Options for managing the User Interface Adaptable.
 *
 * Includes options for themes, menus, tool panels etc.
 *
 * ```ts
 * userInterfaceOptions = {
 *  showAdaptableToolPanel: true
 *};
 * ```
 */
export interface UserInterfaceOptions {
  /**
   * Will show custom Mac-like scrollbars in
   * browsers that support scrollbar-theming.
   *
   * Scrollbar size configurable via CSS variable `--ab-custom-scrollbar-size` - defaults to `10px`
   *
   * NOTE: on mac, when the OS scrollbar is not always visible, it will not be applied, since it detects scrollbars with a size of zero
   */
  useCustomMacLikeScrollbars?: boolean;

  /**
   * Whether or not to show an Adaptable Tool Panel on the right hand side (ag-Grid only).
   *
   * Note - the toolpanel is not yet operational and will be released in v.6 (January 2020).
   *
   * **Default Value: false**
   */
  showAdaptableToolPanel?: boolean;

  /**
   * The name to tive the AdapTable Tool Panel
   *
   * This will vertically in the Tool Panel name section.
   *
   * **Default Value: 'AdapTable'**
   */
  adaptableToolPanelTitle?: string;

  /**
   * Whether or not to show Adaptable specific Context Menu items.
   *
   * Can either be a boolean value or a function that will be called for every context menu item Adaptable provides.
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
   * Whether or not to show Adaptable specific Column Menu items.
   *
   * Can either be a boolean value or a function that will be called for every context menu item Adaptable provides.
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
