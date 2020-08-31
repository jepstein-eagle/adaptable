import { ConfigState } from './ConfigState';
import { AdaptableStyle } from './Common/AdaptableStyle';
import { MenuInfo } from './Common/Menu';
import { AdaptableColumn } from './Common/AdaptableColumn';
import { BaseUserFunction } from '../AdaptableOptions/UserFunctions';
import { Scope } from './Common/Scope';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The **User Interface section** of Predefined Configuration
 *
 * Contains a number of properties and collections that allow users to manage the User Interface of Adaptable and the underlying grid.
 *
 * These include:
 *
 * - [PermittedValuesItems](#permittedvaluesitems): List of allowed values to show in a given column's filter (or Query Builder).
 *
 * - [RowStyles](#rowstyles): Defines how alternating (or all) rows in Adaptable should look.
 *
 * - [EditLookupItems](#editlookupitems): Columns which will display a Dropdown when being edited.
 *
 * - [ColorPalette](#colorpalette): Colours available by default im style-related functions (e.g. Conditional Style)
 *
 * - [ColumnMenuItems](#columnmenuitems): Additional items to add to the Column Header menu
 *
 * - [ContextMenuItems](#contextmenuitems): Additional items to add to the Context menu
 *
 * - [StyleClassNames](#styleclassnames): List of (existing and available) CSS styles to be used in styling functions.
 *
 * See each section below for further details and a code example.
 *
 * **Further AdapTable Help Resources**
 *
 * - [Column Menu Demo](https://demo.adaptabletools.com/userinterface/aggridcolumnmenudemo/)
 *
 * - [Context Menu Demo](https://demo.adaptabletools.com/userinterface/aggridcontextmenudemo/)
 *
 * - {@link UserInterfaceApi|User Interface Api}
 *
 * - [Getting Started Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-getting-started-guide.md)
 **/
export interface UserInterfaceState extends ConfigState {
  /**
   *  An optional list of colours that will be displayed in the Colour Picker in place of the default set that ships with Adaptable.
   *
   * This is used in Functions which create a Style (e.g. Conditional Style, Format Column, Flashing Cells etc.)
   *
   * **Please provide a list of hex values**
   *
   * ```ts
   * export default {
   *   UserInterface: {
   *      ColorPalette: ['660033', 'CCFFFF', 'FFCCFF', 'B2FF66', 'FF3333', 'FFFFFF'],
   *   },
   * } as PredefinedConfig;
   * ```
   *
   *  **Default Value**:  Empty array
   * */

  ColorPalette?: string[];

  /**
   * An optional list of css styles (existing and available) that can be used when creating styles in Adaptable (e.g. in the Conditional Styles, Format Column and other functions that use an `AdaptableStyle`).
   *
   * This allows you quickly to select the css style name instead of having to build a style manually.
   *
   * When this collection is not empty the Syle Creation dialog will include a 'Use Style Class Name' checkbox.
   *
   * If that checkbox is checked, the dialog will displa a dropdown containing the contents of this collection.
   *
   * ```ts
   * export default {
   *  UserInterface: {
   *     StyleClassNames: ['evenRowStyle', 'oddRowStyle', 'allRowStyle '],
   *  },
   * } as PredefinedConfig;
   *
   *  ........
   *
   * // in css file
   *  .evenRowStyle {
   *    background: lightgrey !important;
   *    font-weight: normal !important;
   *    font-style: italic !important;
   *  }
   *
   * .oddRowStyle {
   *    background: lightgreen !important;
   *    font-weight: normal !important;
   *    font-style: italic !important;
   *  }
   * .allRowStyle {
   *    background: pink !important;
   *    font-weight: normal !important;
   *    font-style: italic !important;
   *  }
   *
   *  ........
   *
   * ```
   *
   * **You must ensure that any style name you list here is available to Adaptable in a stylesheet that you provide**
   *
   *  **Default Value**:  Empty array
   */
  StyleClassNames?: string[];

  /**
   * An optional list of values which are permitted for a given column.
   *
   * If set, then only these values will appear in the Column Filter, Query Builder, Bulk Update dropdown etc when that column is selected.
   *
   * ```ts
   * export default {
   *  UserInterface: {
   *     PermittedValuesColumns: [
   *     {
   *        ColumnId: 'status',
   *        PermittedValues: ['Rejected', 'Pending'],
   *     },
   *     {
   *        ColumnId: 'counterparty',
   *        PermittedValues: (column: AdaptableColumn) => {
   *          return ['BAML', 'Nomura', 'UBS'];
   *        },
   *     },
   *   ],
   *  },
   * } as PredefinedConfig;
   * ```
   *
   * In this example we have set Permitted Values for the 'Status' and 'Counterparty' columns using a hard-coded list and a function respectively.
   *
   * August: Note the order of evaluation of Scope is first ColumnIds and then DataType.
   *
   */
  PermittedValuesItems?: PermittedValuesItem[];

  /**
   * A list of Columns which, when being edited, will automatically display a Dropdown allowing the user easily to select a value.
   *
   * The values which will be displayed in the dropdown will be shown according to the following logic:
   *
   * 1. **LookUpValues**: You can provide a list of `LookUpValues` that will be displayed in the Dropdown.  This list can be either 'hardcoded' or returned from a function.
   *
   * 2. **PermittedValues**:  If no LookUpValues are provided, Adaptable will show a list of [PermittedValues](#permittedvalues) (if one has been provided).
   *
   * 3. **Distinct Column Values**: Otherwise, Adaptable will fetch all the distinct values in the Column and populate the Dropdown with them.
   *
   * **The column must also be marked as editable in the column schema for the Dropdown to appear.**
   *
   * ```ts
   * export default {
   *  UserInterface: {
   *     EditLookUpItems: [
   *     {
   *        ColumnId: 'country',
   *        LookUpValues: ['UK', 'France', 'Italy', 'Germany'],
   *     },
   *     {
   *        ColumnId: 'counterparty',
   *        LookUpValues: (column: AdaptableColumn) => {
   *          return ['BAML', 'Nomura', 'UBS'];
   *        },
   *     },
   *     {
   *        ColumnId: 'status',
   *     },
   *     {
   *        ColumnId: 'currency',
   *     },
   *   ],
   *   PermittedValuesColumns: [
   *   {
   *        ColumnId: 'status',
   *        PermittedValues: ['Rejected', 'Pending'],
   *    },
   *   ],
   *  },
   * } as PredefinedConfig;
   * ```
   *
   * In this example 4 columns wil display dropdowns when being edited with the logic as follows:
   *
   * - 'country': using the hardcoded values we provide in `LookUpValues`
   *
   * - 'counterparty': using the values we return from the `LookUpValues` function
   *
   * - 'status': using the `PermittedColumnValues` list that we also supply to the User Interface state
   *
   * - 'currency': using the distinct values in that column
   *
   *  **Default Value**:  Empty array
   */
  EditLookUpItems?: EditLookUpItem[];

  /**
   * A list of RowStyles which allow you to specifiy how Adaptable should look.
   *
   * You can choose to style All, Odd or Even rows (the last 2 are used for when wanting to have alternating row styles).
   *
   * This is particularly useful for when you create a custom theme for Adaptable and want the grid to share the same colour scheme.
   *
   * The `RowStyle` object contains 2 properties:
   *
   * - *Style*: the `AdaptableStyle` object can be either a classname or a set of style-related properties.
   *
   * - *RowType*: specifies which rows the Style will be applied on - can be 'All', 'Odd' or 'Even'
   *
   * **note** if this property is left empty (the default) then the row style in the Grid theme will be used
   *
   * **Row Style Example**
   *
   * ```ts
   * export default {
   *  UserInterface: {
   *    RowStyles: [
   *      {
   *        Style: {
   *          ClassName: 'evenRowStyle',
   *        },
   *        RowType: 'Even',
   *     },
   *     {
   *        Style: {
   *          ForeColor: 'lightyellow',
   *          BackColor: 'brown',
   *          FontStyle: 'Italic',
   *          FontWeight: 'Bold',
   *        },
   *        RowType: 'Odd',
   *      },
   *    ],
   * },
   * } as PredefinedConfig;
   *
   *  ........
   *
   * // in css file
   *  .evenRowStyle {
   *    background: lightgrey !important;
   *    font-weight: normal !important;
   *    font-style: italic !important;
   *  }
   *
   *  ........
   *
   * ```
   *
   * In this example we have created Even and Odd Row styles.
   *
   * The Even Row style uses the `ClassName` property of `AdaptableStyle` to leverage a Style provided in CSS (its your repsonsiblity to ensure the named style is there).
   *
   * The Odd Row style is created in line with the `ForeColor`, `BackColor`, `FontStyle`, and `FontWeight` properties all set.
   *
   *  **Default Value**:  Empty array
   */
  RowStyles?: RowStyle[];

  /**
   * A collection of `UserMenuItem` objects to be added to the Column Header Menu (the one that appears as a dropdown in each Column Header).
   *
   * You can add as many `UserMenuItem` as you wish.
   *
   * A `UserMenuItem` contains the following properties:
   *
   *  - **Label** The text that will appear in the Menu Item
   *
   *  - **UserMenuItemClickedFunction** The function which runs when a menu item is clicked
   *
   *  - **UserMenuItemShowPredicate** A function which return whether to display the menu item
   *
   *  - **Icon** An icon for the menu item
   *
   *  - **SubMenuItems** an array of `UserMenuItem`
   *
   *  --------------
   *
   * **Column Menu Item Example**
   *
   * ```ts
   *
   * // Predefined Config
   * export default {
   *  UserInterface: {
   *    ColumnMenuItems: [
   *    {
   *        Label: 'Mimise Dashboard',
   *        UserMenuItemClickedFunction: 'minimizeDashboard',
   *      },
   *      {
   *        Label: 'Set System Status',
   *        SubMenuItems: [
   *          {
   *            Label: 'Set Error',
   *            UserMenuItemShowPredicate: 'isSortable',
   *            UserMenuItemClickedFunction: 'setError',
   *          },
   *          {
   *            Label: 'Set Warning',
   *            UserMenuItemShowPredicate: 'isSortable',
   *            UserMenuItemClickedFunction: 'setWarning',
   *          },
   *          {
   *            Label: 'Set Success',
   *            UserMenuItemShowPredicate: 'isSortable',
   *            UserMenuItemClickedFunction: 'setSuccess',
   *          },
   *          {
   *            Label: 'Set Info',
   *            UserMenuItemShowPredicate: 'isSortable',
   *            UserMenuItemClickedFunction: 'setInfo',
   *          },
   *        ],
   *      },
   *    ],
   *  },
   * } as PredefinedConfig;
   *
   *
   * // Adaptable Options
   * const adaptableOptions: AdaptableOptions = {
   * ......
   *  userFunctions: [
   *       {
   *      type: 'UserMenuItemClickedFunction',
   *       name: 'minimizeDashboard',
   *       handler() {
   *          adaptableApi.dashboardApi.minimise();
   *        },
   *      },
   *      {
   *        type: 'UserMenuItemClickedFunction',
   *        name: 'setError',
   *        handler() {
   *          adaptableApi.systemStatusApi.setErrorSystemStatus('System Down');
   *        },
   *      },
   *      {
   *        type: 'UserMenuItemClickedFunction',
   *        name: 'setWarning',
   *        handler() {
   *          adaptableApi.systemStatusApi.setWarningSystemStatus('System Slow');
   *        },
   *      },
   *      {
   *        type: 'UserMenuItemClickedFunction',
   *        name: 'setSuccess',
   *        handler() {
   *          adaptableApi.systemStatusApi.setSuccessSystemStatus('System Fine');
   *        },
   *      },
   *      {
   *        type: 'UserMenuItemClickedFunction',
   *        name: 'setInfo',
   *        handler() {
   *          adaptableApi.systemStatusApi.setInfoSystemStatus('Demos working fine');
   *        },
   *      },
   *      {
   *        type: 'UserMenuItemShowPredicate',
   *        name: 'isSortable',
   *        handler(menuInfo) {
   *          return menuInfo.Column.Sortable;
   *        },
   *      },
   *    ],
   * ```
   *
   *  If you want to control which, if any, of the pre-shipped Adaptable Column Menu items are displayed use the [showAdaptableColumnMenu](_src_adaptableoptions_userinterfaceoptions_.userinterfaceoptions.html#showadaptablecolumnmenu) property in UserInterfaceOptions.
   *
   * **Default Value**:  Empty array
   */
  ColumnMenuItems?: UserMenuItem[];

  /**
   * A collection of `UserMenuItem` objects to be added to the Context Menu (the one that appears when you right-click on a cell, or cells, in the Grid).
   *
   * You can add as many `UserMenuItem` as you wish.
   *
   * A `UserMenuItem` contains the following properties:
   *
   *  - **Label** The text that will appear in the Menu Item
   *
   *  - **UserMenuItemClickedFunction** The function which runs when a menu item is clicked
   *
   *  - **UserMenuItemShowPredicate** A function which return whether to display the menu item
   *
   *  - **Icon** An icon for the menu item
   *
   *  - **SubMenuItems** an array of `UserMenuItem`
   *
   *  --------------
   *
   * **Context Menu Item Example**
   *
   * ```ts
   *
   * // Predefined Config
   * export default {
   *  UserInterface: {
   *    ContextMenuItems: [
   *    {
   *        Label: 'Mimise Dashboard',
   *        UserMenuItemClickedFunction: 'minimizeDashboard',
   *      },
   *      {
   *        Label: 'Set System Status',
   *        SubMenuItems: [
   *          {
   *            Label: 'Set Error',
   *            UserMenuItemShowPredicate: 'isSortable',
   *            UserMenuItemClickedFunction: 'setError',
   *          },
   *          {
   *            Label: 'Set Warning',
   *            UserMenuItemShowPredicate: 'isSortable',
   *            UserMenuItemClickedFunction: 'setWarning',
   *          },
   *          {
   *            Label: 'Set Success',
   *            UserMenuItemShowPredicate: 'isSortable',
   *            UserMenuItemClickedFunction: 'setSuccess',
   *          },
   *          {
   *            Label: 'Set Info',
   *            UserMenuItemShowPredicate: 'isSortable',
   *            UserMenuItemClickedFunction: 'setInfo',
   *          },
   *        ],
   *      },
   *    ],
   *  },
   * } as PredefinedConfig;
   *
   *
   * // Adaptable Options
   * const adaptableOptions: AdaptableOptions = {
   * ......
   *  userFunctions: [
   *       {
   *      type: 'UserMenuItemClickedFunction',
   *       name: 'minimizeDashboard',
   *       handler() {
   *          adaptableApi.dashboardApi.minimise();
   *        },
   *      },
   *      {
   *        type: 'UserMenuItemClickedFunction',
   *        name: 'setError',
   *        handler() {
   *          adaptableApi.systemStatusApi.setErrorSystemStatus('System Down');
   *        },
   *      },
   *      {
   *        type: 'UserMenuItemClickedFunction',
   *        name: 'setWarning',
   *        handler() {
   *          adaptableApi.systemStatusApi.setWarningSystemStatus('System Slow');
   *        },
   *      },
   *      {
   *        type: 'UserMenuItemClickedFunction',
   *        name: 'setSuccess',
   *        handler() {
   *          adaptableApi.systemStatusApi.setSuccessSystemStatus('System Fine');
   *        },
   *      },
   *      {
   *        type: 'UserMenuItemClickedFunction',
   *        name: 'setInfo',
   *        handler() {
   *          adaptableApi.systemStatusApi.setInfoSystemStatus('Demos working fine');
   *        },
   *      },
   *      {
   *        type: 'UserMenuItemShowPredicate',
   *        name: 'isSortable',
   *        handler(menuInfo) {
   *          return menuInfo.Column.Sortable;
   *        },
   *      },
   *    ],
   * ```
   *
   *  If you want to control which, if any, of the pre-shipped Adaptable Context Menu items are displayed use the [showAdaptableContextMenu](_src_adaptableoptions_userinterfaceoptions_.userinterfaceoptions.html#showadaptableContextMenu) property in UserInterfaceOptions.
   *
   * **Default Value**:  Empty array
   */
  ContextMenuItems?: UserMenuItem[];
}

/**
 * Interface that allows users to stipulate which values are allowed for a particular set of columns.
 *
 * Uses the `Scope` object to work out which columns are included.
 *
 * The values listed are those that will be shown in any Dropdown, in the filter for the Column and when using that Column in a Query.
 */
export interface PermittedValuesItem extends AdaptableObject {
  /**
   * The Scope
   */
  Scope: Scope;

  /**
   * Hardcoded list of Permitted Values that will be shown in the Column Filter and when building a Query.
   */
  PermittedValues?: any[];

  /**
   * The name of the function which will run each time Permitted values are required.
   *
   * The implementation of the function will be provided in UserFunctions
   */
  GetColumnValuesFunction?: string;
}

/**
 * Interface that allows user to stipulate if a column should show a Dropdown when in edit mode.
 *
 * Can optionally include which look up values the Dropdown will contain; if none are provided then Adaptable will get the distinct values for the Column.
 *
 * However if Permitted Values have been set for that column then they will be displayed in the Dropdown instead.
 *
 */
export interface EditLookUpItem {
  /**
   * Which Column(s) will show the Edit Lookup - those match Scope
   */
  Scope: Scope;

  /**
   * Any particular values to show in the Lookup - the list can be either hard-coded or returned by a function.
   *
   * If this is left empty then Adaptable will first get any Permitted Values if any, and failiing that will dynamically get the distinct values for the column.
   */
  LookUpValues?: any[];

  /**
   * The name of the function which will run each time Look Up Values are required.
   *
   * The implementation of the function will be provided in UserFunctions
   */
  GetColumnValuesFunction?: string;
}

/**
 * Object that allows users to pre-define styles for Rows in the Vendor Grid.
 *
 * This is particularly useful for when you create a custom theme for Adaptable and want the grid to share the same colour scheme.
 *
 * It includes the Style - which can be just a classname or a set of properties .
 *
 * Also contains the RowType - e.g. All Rows, or Just Odd or Even (used for when requiring an Alternate Row style)
 *
 */
export interface RowStyle {
  /**
   * The `AdaptableStyle` to use for the Row. For more details see the [Style](_src_predefinedconfig_common_istyle_.istyle.html) object.
   */
  Style: AdaptableStyle;

  /**
   * Which Row should be Styled.
   *
   * We provide All (which styles the whole grid) and 'Odd' and 'Even' for where you require alternating row styles.
   *
   * **Note: if you have any 'All' RowTypes then 'Odd' and 'Even' RowTypes will be ignored.**
   */
  RowType: 'All' | 'Odd' | 'Even';
}

/**
 * Defines a Menu Item created at design-time
 *
 * A Menu Item can be added to either the Adaptable Column Header Menu or the Adaptable Context Menu.
 *
 * Each Menu Item contains a label and optional glyph.
 *
 * You can also provide an implementation for the `UserMenuItemClickedFunction` for when the menu item is clicked.
 *
 * Each Menu Item can contain an array of Menu Items to allow you to create sub menus.
 */
export interface UserMenuItem {
  /**
   * The text that will appear in the Menu Item
   *
   * Can be either a hard-coded value or the name of a `UserMenuItemLabelFunction` (with the implementation provided in Usser Functions)
   */
  Label: string;

  /**
   * Function that will run when the Menu Item is selected by the User
   *
   * The **name** of the function is provided here and then an implementation with the same name should be included in UserFunctions section of AdaptableOptions.
   *
   * The function itself contains a `MenuInfo` class which provides full information of the column / cell where the menu is being run.
   *
   * The Signature of the function is:
   *
   * ```ts
   * ((menuInfo: MenuInfo) => UserMenuItem[])
   *  ```
   */
  UserMenuItemClickedFunction?: string;

  /**
   * Function that can run before a Menu Item is displayed to ascertain whether it should show or not.
   *
   * The **name** of the function is provided here and then an implementation with the same name should be included in UserFunctions section of AdaptableOptions.
   *
   * The actual predicate itself contains a `MenuInfo` class which provides full information of the column / cell where the menu is being run.
   *
   * The Signature of the function is:
   *
   * ```ts
   * ((menuInfo: MenuInfo) => UserMenuItem[])
   *  ```
   */
  UserMenuItemShowPredicate?: string;

  /**
   * An optional icon to show in the Menu Item
   */
  Icon?: string;

  /**
   * An array of Menu Items - this allows you to create sub menus.
   *
   * You can create sub menus as many levels deep as you require.
   */
  SubMenuItems?: UserMenuItem[];
}

/**
 * A Function which will run each time a User Menu Item is clicked.
 *
 * This is for both Column Menus and Context Menus.
 *
 * Each time it runs it is given a `MenuInfo` class which provides full information of the column / cell where the menu is being displayed.
 *
 * Note: The implementation of this function is inserted into the UserFunctions section of AdaptableOptions, with a named reference to it in the `UserInterface` section of Predefined Config.
 */
export interface UserMenuItemClickedFunction extends BaseUserFunction {
  type: 'UserMenuItemClickedFunction';
  name: string;
  handler: (menuInfo: MenuInfo) => void;
}

/**
 * A Predicate Function which will run each time a menu is opened to decide whether a User Menu Item should be displayed.
 *
 * This is for both Column Menus and Context Menus.
 *
 * Each time it runs it is given a `MenuInfo` class which provides full information of the column / cell where the menu is being displayed.
 *
 * Note: The implementation of this function is inserted into the UserFunctions section of AdaptableOptions, with a named reference to it in the `UserInterface` section of Predefined Config.
 */
export interface UserMenuItemShowPredicate extends BaseUserFunction {
  type: 'UserMenuItemShowPredicate';
  name: string;
  handler: (menuInfo: MenuInfo) => boolean;
}

/**
 * A Function which will run each time a menu item is about to displayed and will return the Label for that menu item.
 *
 * This is for both Column Menus and Context Menus.
 *
 * Each time it runs it is given a `MenuInfo` class which provides full information of the column / cell where the menu is being displayed.
 *
 * Note: The implementation of this function is inserted into the UserFunctions section of AdaptableOptions, with a named reference to it in the `UserInterface` section of Predefined Config.
 */ export interface UserMenuItemLabelFunction extends BaseUserFunction {
  type: 'UserMenuItemLabelFunction';
  name: string;
  handler: (menuInfo: MenuInfo) => string;
}

export interface GetColumnValuesFunction extends BaseUserFunction {
  type: 'GetColumnValuesFunction';
  name: string;
  handler: (column: AdaptableColumn) => any[];
}
