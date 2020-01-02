import { DesignTimeState } from './DesignTimeState';
import { AdaptableStyle } from './Common/AdaptableStyle';
import { MenuInfo } from './Common/Menu';
import { AdaptableColumn } from './Common/AdaptableColumn';

/**
 * The **User Interface section** of Predefined Configuration
 *
 * Contains a number of properties and collections that allow users to manage the User Interface of Adaptable and the underlying grid.
 *
 * These include:
 *
 * - [PermittedColumnValues](#permittedcolumnvalues): List of allowed values to show in a given column's filter (or Query Builder).
 *
 * - [RowStyles](#rowstyles): Defines how alternating (or all) rows in Adaptable should look.
 *
 * - [EditLookupColumns](#editlookupcolumns): Columns which will display a Dropdown when being edited.
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
 * **Further Adaptable Help Resources**
 *
 * - [Column Menu Demo](https://demo.adaptableblotter.com/userinterface/aggridcolumnmenudemo/)
 *
 * - [Context Menu Demo](https://demo.adaptableblotter.com/userinterface/aggridcontextmenudemo/)
 *
 * - [User Interface API](_api_userinterfaceapi_.userinterfaceapi.html)
 *
 * - [User Interface FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360009004751-Look-and-Feel-FAQ)
 **/
export interface UserInterfaceState extends DesignTimeState {
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
   */
  PermittedValuesColumns?: PermittedValuesColumn[];

  /**
   * A list of Columns which, when being edited, will automatically display a Dropdown allowing the user easily to select a value.
   *
   * The values which will be displayed in the dropdown will be shown according to the following logic:
   *
   * 1. **LookUpValues**: You can, optionally, provide a list of `LookUpValues` that will be displayed in the Dropdown.  This list can be either 'hardcoded' or returned from a function.
   *
   * 2. **PermittedColumnValues**:  If no LookUpValues are provided, Adaptable will show a list of [PermittedColumnValues](#permittedcolumnvalues) (if one has been provided).
   *
   * 3. **Distinct Column Values**: Otherwise, Adaptable will fetch all the distinct values in the Column and populate the Dropdown with them.
   *
   * **The column must also be marked as editable in the column schema for the Dropdown to appear.**
   *
   * ```ts
   * export default {
   *  UserInterface: {
   *     EditLookUpColumns: [
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
  EditLookUpColumns?: EditLookUpColumn[];

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
   * You can add as many `UserMenuItem` as you wish.  And each UserMenuItem can itself include an array of sub UserMenuItems.
   *
   * The property allows you to provide either a standard array of UserMenuItem or a function which will return the array`.
   *
   * The function takes a [`MenuInfo`](_predefinedconfig_common_menu_.menuinfo.html) object and returns an array of `UserMenuItem`. signature is:
   *
   * If you want to control which, if any, of the pre-shipped Adaptable Column Menu items are displayed use the [showAdaptableColumnMenu](_adaptableoptions_userinterfaceoptions_.userinterfaceoptions.html#showadaptablecolumnmenu) property in UserInterfaceOptions.
   *
   * **Column Menu Item Example (using Array)**
   *
   * ```ts
   * export default {
   *  UserInterface: {
   *     ColumnMenuItems: [
   *     {
   *        Label: 'Mimise Dashboard',
   *        UserMenuItemClickedFunction: () => {
   *            adaptableApi.dashboardApi.Minimise();
   *        },
   *     },
   *     {
   *        Label: 'Set System Status',
   *        SubMenuItems: [
   *        {
   *          Label: 'Set Error',
   *          UserMenuItemClickedFunction: () => {
   *            adaptableApi.systemStatusApi.setErrorSystemStatus('System Down');
   *          },
   *        },
   *        {
   *          Label: 'Set Warning',
   *          UserMenuItemClickedFunction: () => {
   *            adaptableApi.systemStatusApi.setWarningSystemStatus('System Slow');
   *          },
   *        },
   *        {
   *          Label: 'Set Success',
   *          UserMenuItemClickedFunction: () => {
   *            adaptableApi.systemStatusApi.setSuccessSystemStatus('System Fine');
   *        },
   *        },
   *        {
   *          Label: 'Set Info',
   *          UserMenuItemClickedFunction: () => {
   *            adaptableApi.systemStatusApi.setInfoSystemStatus('Demos working fine');
   *        },
   *      },
   *    ],
   *  },
   *  ],
   * },
   * } as PredefinedConfig;
   *
   * ```
   *
   * **Column Menu Item Example (using Function)**
   *
   * ```ts
   *
   * export default {
   *  UserInterface: {
   * ColumnMenuItems: (menuinfo: MenuInfo) => {
   *    return menuinfo.Column.Sortable
   *      ? [
   *          {
   *            Label: 'Sort Column',
   *            Icon: '<img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/000000/sort.png">',
   *            UserMenuItemClickedFunction: () => {
   *              let customSort: ColumnSort = {
   *                Column: menuinfo.Column.ColumnId,
   *                SortOrder: 'Ascending',
   *              };
   *              adaptableApi.gridApi.sortAdaptable([customSort]);
   *            },
   *          },
   *        ]
   *     : [];
   * },
   * } as PredefinedConfig;
   *
   * ```
   *
   * **Default Value**:  Empty array
   */
  ColumnMenuItems?: UserMenuItem[] | ((menuInfo: MenuInfo) => UserMenuItem[]);

  /**
   * Additional items to add to the Context Menu (the one that appears when you right-click a cell in the Grid).
   *
   * You can add as many `UserMenuItem` as you wish.  And each Menu Item can take an array of sub items.
   *
   * The property allows you to provide either a standard array of UserMenuItem or a function which will return the array.
   *
   * The function takes a [`MenuInfo`](_predefinedconfig_common_menu_.menuinfo.html) object and returns an array of `UserMenuItem`. signature is:
   *
   *  ```ts
   * ((menuInfo: MenuInfo) => UserMenuItem[])
   *  ```
   *
   * If you want to control which, if any, of the shipped Adaptable Context Menu items are displayed use the `showAdaptableContextMenu` property in [General Options](_adaptableOptions_generaloptions_.generaloptions.html)
   *
   * **Context Menu Item Example (using Array)**
   *
   * ```ts
   * export default {
   *  UserInterface: {
   *     ContextMenuItems: [
   *     {
   *        Label: 'Mimise Dashboard',
   *        UserMenuItemClickedFunction: () => {
   *            adaptableApi.dashboardApi.Minimise();
   *        },
   *     },
   *     {
   *        Label: 'Set System Status',
   *        SubMenuItems: [
   *        {
   *          Label: 'Set Error',
   *          UserMenuItemClickedFunction: () => {
   *            adaptableApi.systemStatusApi.setErrorSystemStatus('System Down');
   *          },
   *        },
   *        {
   *          Label: 'Set Warning',
   *          UserMenuItemClickedFunction: () => {
   *            adaptableApi.systemStatusApi.setWarningSystemStatus('System Slow');
   *          },
   *        },
   *        {
   *          Label: 'Set Success',
   *          UserMenuItemClickedFunction: () => {
   *            adaptableApi.systemStatusApi.setSuccessSystemStatus('System Fine');
   *        },
   *        },
   *        {
   *          Label: 'Set Info',
   *          UserMenuItemClickedFunction: () => {
   *            adaptableApi.systemStatusApi.setInfoSystemStatus('Demos working fine');
   *        },
   *      },
   *    ],
   *  },
   *  ],
   * },
   * } as PredefinedConfig;
   *
   * ```
   *
   * **Context Menu Item Example (Using function)**
   *
   * export default {
   *  UserInterface: {
   *    ContextMenuItems: (menuinfo: MenuInfo) => {
   *      return menuinfo.Column.Sortable
   *      ? [
   *          {
   *            Label: 'Sort Column',
   *            Icon: '<img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/000000/sort.png">',
   *            UserMenuItemClickedFunction: () => {
   *              let customSort: ColumnSort = {
   *                Column: menuinfo.Column.ColumnId,
   *                SortOrder: 'Ascending',
   *              };
   *              adaptableApi.gridApi.sortAdaptable([customSort]);
   *            },
   *          },
   *        ]
   *     : [];
   * },
   * } as PredefinedConfig;
   *
   * ```
   *
   * **Default Value**:  Empty array
   */
  ContextMenuItems?: UserMenuItem[] | ((menuInfo: MenuInfo) => UserMenuItem[]);
}

/**
 * Interface that allows users to stipulate which values are allowed for a particular column.
 *
 * The values listed are those that will be shown in any Dropdown, in the filter for the Column and when using that Column in a Query.
 */
export interface PermittedValuesColumn {
  /**
   * Which Column has the Permitted Values
   */
  ColumnId: string;

  /**
   * The Permitted Values that will be shown in the Column Filter and when building a Query.
   */
  PermittedValues?: any[] | ((column: AdaptableColumn) => any[]);
}

/**
 * Interface that allows user to stipulate if a column should show a Dropdown when in edit mode.
 *
 * Can optionally include which look up values the Dropdown will contain; if none are provided then Adaptable will get the distinct values for the Column.
 *
 * However if Permitted Values have been set for that column then they will be displayed in the Dropdown instead.
 *
 */
export interface EditLookUpColumn {
  /**
   * Which Column will show the Edit Lookup
   */
  ColumnId: string;

  /**
   * Any particular values to show in the Lookup - the list can be either hard-coded or returned by a function.
   *
   * If this is left empty then Adaptable will first get any Permitted Values if any, and failiing that will dynamically get the distinct values for the column.
   */
  LookUpValues?: any[] | ((column: AdaptableColumn) => any[]);
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
   * The `AdaptableStyle` to use for the Row. For more details see the [Style](_predefinedconfig_common_istyle_.istyle.html) object.
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
   */
  Label: string;
  /**
   * Function to run when the Menu Item is selected by the User
   *
   * The `MenuInfo` class provides full information of the column / cell where the menu is being run
   */
  UserMenuItemClickedFunction?: (menuInfo: MenuInfo) => void;

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
