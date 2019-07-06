import { DesignTimeState } from './DesignTimeState';

/**
 * The Predefined Configuration for managing the User Interface
 *
 * Contains a number of properties and collections that allow users to define column lookups, colour schemes and other UI related things.
 *
 * **Further Resources**
 *
 * [User Interface Demo](https://demo.adaptableblotter.com/search/aggridadvancedsearchdemo/)
 *
 * [User Interface API](_api_interface_iuserinterfaceapi_.iuserinterfaceapi.html)
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
   * This will allow you quicly choose the css style name instead of having to build the style manually.
   * 
   * **You must ensure that any style name you list here is available to the Adaptable Blotter in a stylesheet that you provide**

   */
  StyleClassNames?: string[];

  /**
   * An optional list of values which are permitted for the given column.
   *
   * If set, then only these values will appear in the Query Builder, Bulk Update dropdown etc when that column is selected.
   */
  PermittedColumnValues?: PermittedColumnValues[];

  /**
   * An optional list of Columns which when edited will automatically display a Dropdown allowing the user easily to select a value.
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
}

/**
 * Interface that allows users to stipulate which values are allowed for a particular column.
 *
 * The values listed are those that will be shown in any Dropdown, in the filter for the Column and when using that Column in a Query.
 */
export interface PermittedColumnValues {
  ColumnId: string;
  PermittedValues: any[];
}

/**
 * Interface that allows user to stipulate if a column should show a Dropdown when in edit mode.
 *
 * Can optionally include which look up values the Dropdown will contain; if none are provided then the Adaptable Blotter will get the distinct values for the Column.
 *
 * However if Permitted Values have been set for that column then they will be displayed in the Dropdown instead.
 */
export interface EditLookUpColumn {
  ColumnId: string;
  LookUpValues?: any[];
}
