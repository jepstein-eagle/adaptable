import {
  UserInterfaceState,
  PermittedColumnValues,
  EditLookUpColumn,
} from '../../PredefinedConfig/DesignTimeState/UserInterfaceState';

export interface IUserInterfaceApi {
  /**
   * Gets all the User Interface state from the Store
   */
  getUserInterfaceState(): UserInterfaceState;

  /**
   * Sets the Color Palette - when creating functions that use the [Style Object](https://api.adaptableblotter.com/interfaces/_predefinedconfig_common_istyle_.istyle.html) (e.g. Conditional Style, Format Column).
   *
   * @param colorPalette
   */
  setColorPalette(colorPalette: string[]): void;

  /**
   *
   * @param styleClassNames Make sure that you provide a Css Style of the same name in your css.
   */
  addColorsToPalette(colorPalette: string[]): void;

  addStyleClassNames(styleClassNames: string[]): void;

  /**
   * This replaces any existing permitted values for the column.  It is ​​not​​ an additive function.
   * @param column
   * @param permittedValues
   */
  setColumnPermittedValues(column: string, permittedValues: string[]): void;

  /**
   * If this function is called the column will revert to default behaviour
   * which is t show current distinct values for the column in filters, searches etc
   * @param column
   */
  clearColumnPermittedValues(column: string): void;

  getAllPermittedValues(): PermittedColumnValues[];

  getPermittedValuesForColumn(columnId: string): PermittedColumnValues;

  getAllEditLookUpColumns(): EditLookUpColumn[];

  getLookUpValuesForColumn(columnId: string): EditLookUpColumn;
}
