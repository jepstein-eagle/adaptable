import { DesignTimeState } from './DesignTimeState';
import { IStyle } from './Common/IStyle';
import { MenuInfo } from './Common/Menu';

/**
 * The Predefined Configuration for managing the User Interface
 *
 * Contains a number of properties and collections that allow users to manage the User Interface of the grid.
 *
 * These include:
 *
 * - [PermittedColumnValues](#permittedcolumnvalues): List of allowed values to show in a given column's filter (or Query Builder).
 *
 * - [RowStyles](#rowstyles): Defines how alternating (or all) rows in the Blotter should look.
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
 * **Further Resources**
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
   *  An optional list of colours that will be displayed in the Colour Picker in place of the default set that ships with the Adaptable Blotter.
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
   * An optional list of css styles(existing and available) that can be used when creating Conditional Styles or Format Columns.
   *
   * If this collection is not empty then they will be listed in a dropdown that will be visible in the Syle Creation dialog.
   *
   * This will allow you quickly choose the css style name instead of having to build the style manually.
   *
   * **You must ensure that any style name you list here is available to the Adaptable Blotter in a stylesheet that you provide**
   *
   *  **Default Value**:  Empty array
   */
  StyleClassNames?: string[];

  /**
   * An optional list of values which are permitted for a given column.
   *
   * If set, then only these values will appear in the Column Filter, Query Builder, Bulk Update dropdown etc when that column is selected.
   */
  PermittedColumnValues?: PermittedColumnValues[];

  /**
   * A list of Columns which, when edited, will automatically display a Dropdown allowing the user easily to select a value.
   *
   * You can, optionally, also provide a list of values that will appear in the Dropdown.
   *
   * If not list of LookUp Values is provided, the Adaptable Blotter will show a list of Permitted Values (if one has been provided).
   *
   * If there are no Permitted Values for the Column then the Adaptable Blotter will fetch all the distinct values in the Column and populate the Dropdown with them.
   *
   * **The column must also be marked as editable in the column schema for the Dropdown to appear.**
   *
   * ```ts
   * export default {
   *  UserInterface: {
   *     EditLookUpColumns: [
   *      {
   *        ColumnId: 'CustomerReference',
   *        LookUpValues: ['SANTG', 'LINOD','ROMEY', 'FRANK','ALFKI','REGGC']
   *      },
   *      {
   *        ColumnId: 'ContactName',
   *      },
   *      {
   *        ColumnId: 'Employee',
   *      },
   *    ],
   *  },
   * } as PredefinedConfig;
   * ```
   *
   *  **Default Value**:  Empty array
   */
  EditLookUpColumns?: EditLookUpColumn[];

  /**
   * A list of RowStyles which allow you to specifiy how the Blotter should look.
   *
   * You can choose to style All, Odd or Even rows (the last 2 are used for when wanting to have alternating row styles).
   *
   * **note if this is left empty (the default) then the row style in the Grid theme will be used**
   *
   *  **Default Value**:  Empty array
   */
  RowStyles?: RowStyle[];

  /**
   * Additional items to add to the Column Menu (the one that appears as a dropdown in each Column Header).
   *
   * You can add as many `UserMenuItem`s as you wish.  And each Menu Item can take an array of sub items.
   *
   * You can provide either a standard arry of Menu Items or a function which will return an array of MenuItems depending on the `MenuInfo`.
   *
   * If you want to control which of the shipped Adaptable Blotter Column Menu items are showns use the `showAdaptableColumnMenu` property in [General Options](_blotteroptions_generaloptions_.generaloptions.html)
   *
   * **Default Value**:  Empty array
   */
  ColumnMenuItems?: UserMenuItem[] | ((menuInfo: MenuInfo) => UserMenuItem[]);

  /**
   * Additional items to add to the Context Menu (the one that appears when you right-click a cell in the Grid).
   *
   * You can add as many `UserMenuItem`s as you wish.  And each Menu Item can take an array of sub items.
   *
   * You can provide either a standard arry of Menu Items or a function which will return an array of MenuItems depending on the `MenuInfo`.
   *
   * The function takes a [General Options](_blotteroptions_generaloptions_.generaloptions.html) object and returns an array of UserMenuItem. signature is:
   *
   *  ```ts
   * ((menuInfo: MenuInfo) => UserMenuItem[])
   *  ```
   *
   * If you want to control which of the shipped Adaptable Blotter Context Menu items are showns use the `showAdaptableContextMenu` property in [General Options](_blotteroptions_generaloptions_.generaloptions.html)
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
export interface PermittedColumnValues {
  /**
   * Which Column has the Permitted Values
   */
  ColumnId: string;

  /**
   * The Permitted Values that will be shown in the Column Filter and when building a Query.
   */
  PermittedValues: any[];
}

/**
 * Interface that allows user to stipulate if a column should show a Dropdown when in edit mode.
 *
 * Can optionally include which look up values the Dropdown will contain; if none are provided then the Adaptable Blotter will get the distinct values for the Column.
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
   * Any values to show in the Lookup.
   *
   * **note If this is left empty then the Blotter will first get any Permitted Values if any, and failiing that will get distinct values for the column dynamically**
   */
  LookUpValues?: any[];
}

/**
 * Object that allows users to pre-define styles for Rows in the Vendor Grid.
 *
 * This is particularly useful for when you create a custom theme for the Adaptable Blotter and want the grid to share the same colour scheme.
 *
 * It includes the Style - which can be just a classname or a set of properties .
 *
 * Also contains the RowType - e.g. All Rows, or Just Odd or Even (used for when requiring an Alternate Row style)
 *
 * **Row Style Example**
 *
 * ```ts
 * export default {
 *  UserInterface: {
 *    RowStyles: [
 *      {
 *     Style: {
 *       ClassName: 'evenRowStyle',
 *      },
 *      RowType: 'Even',
 *     },
 *     {
 *       Style: {
 *         ForeColor: 'lightyellow',
 *         BackColor: 'brown',
 *        FontStyle: 'Italic',
 *     },
 *     RowType: 'Odd',
 *   },
 *  ],
 * },
 * } as PredefinedConfig;
 * ```
 */
export interface RowStyle {
  /**
   * The Style to use for the Row. For more details see the [Style](_predefinedconfig_common_istyle_.istyle.html) object.
   */
  Style: IStyle;

  /**
   * Which Row should be Styled.
   *
   * We provide All (which styles the whole grid) and 'Odd' and 'Even' for where you require alternating row styles.
   *
   * **Note: if you have any 'All' RowTypes then 'Odd' and 'Even' RowTypes will be ignored.**
   */
  RowType: 'All' | 'Odd' | 'Even';
}

export interface UserMenuItem {
  Label: string;
  UserMenuItemClickedFunction?: (menuInfo: MenuInfo) => void;
  Icon?: string;
  SubMenuItems?: UserMenuItem[];
}
