import { DesignTimeState } from './DesignTimeState';
import { IStyle } from './Common/IStyle';
import { ContextMenuInfo } from './Common/Menu';

/**
 * The Predefined Configuration for managing the User Interface
 *
 * Contains a number of properties and collections that allow users to define column lookups, colour schemes and other UI related things.
 *
 * **Further Resources**
 *
 * [User Interface Demo](https://demo.adaptableblotter.com/search/aggridadvancedsearchdemo/)
 *
 * [User Interface API](_api_userinterfaceapi_.userinterfaceapi.html)
 *
 * [Advanced Search FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360009004951-Advanced-Search-FAQ)
 **/
export interface UserInterfaceState extends DesignTimeState {
  /**
   *  An optional list of colours that will be displayed in the Colour Picker in place of the default set that ships with the Adaptable Blotter.
   *
   * This is used for those Functions that create a Style (e.g. Conditional Style, Format Column)
   *
   * **Please provide a list of hex values**
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
   */
  EditLookUpColumns?: EditLookUpColumn[];

  /**
   * A list of RowStyles which allow you to specifiy how the Blotter should look.
   *
   * You can choose to style All, Odd or Even rows (the last 2 are used for when wanting to have alternating row styles).
   *
   * **note if this is left empty (the default) then the row style in the Grid theme will be used**
   */
  RowStyles?: RowStyle[];

  ColumnMenuItems?: UserMenuItem[] | ((contextMenuInfo: ContextMenuInfo) => UserMenuItem[]);

  ContextMenuItems?: UserMenuItem[] | ((contextMenuInfo: ContextMenuInfo) => UserMenuItem[]);
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
 *  **Edit LookUp Columm Example**
 *
 * ```ts
 * export default {
 *  UserInterface: {
 *     EditLookUpColumns: [
 * {
 *    ColumnId: 'CustomerReference',
 *    LookUpValues: [
 *      'SANTG',
 *      'LINOD',
 *      'ROMEY',
 *      'FRANK',
 *      'ALFKI',
 *      'REGGC',
 *      'GODOS',
 *      'PRINI',
 *      'GREAL',
 *      'WILMK',
 *      'MAISD',
 *      'THECR',
 *      'SAVEA',
 *      'FOLKO',
 *      'RATTC',
 *    ],
 *  },
 *  {
 *    ColumnId: 'ContactName',
 *  },
 *  {
 *    ColumnId: 'Employee',
 *  },
 * ],
 * },
 * } as PredefinedConfig;
 * ```
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
  UserMenuItemClickedFunction?: (contextMenuInfo: ContextMenuInfo) => void;
  Icon?: string;
  SubMenuItems?: UserMenuItem[];
}
