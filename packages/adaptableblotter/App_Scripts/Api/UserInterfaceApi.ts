import {
  UserInterfaceState,
  PermittedColumnValues,
  EditLookUpColumn,
  RowStyle,
} from '../PredefinedConfig/DesignTimeState/UserInterfaceState';

export interface UserInterfaceApi {
  /**
   * Retrieves the User Interface section from the Adaptable Blotter State
   */
  getUserInterfaceState(): UserInterfaceState;

  /**
   * Sets the Color Palette - when creating functions that use the [Style Object](https://api.adaptableblotter.com/interfaces/_predefinedconfig_common_istyle_.istyle.html) (e.g. Conditional Style, Format Column).
   *
   * @param colorPalette the colours to put in the Color Palette
   */
  setColorPalette(colorPalette: string[]): void;

  /**
   * Adds **extra colours** to the Colour Palette
   *
   * @param styleClassNames Make sure that you provide a Css Style of the same name in your css.
   */
  addColorsToPalette(colorPalette: string[]): void;

  /**
   * Adds StyleClass names to the User Interface section of the Adaptable Blotter State.
   *
   * You can then reference these style class names in functions like Conditional Style instead of having to create a Style object
   *
   * @param styleClassNames The names of the styles.  **Make sure that you provide a Css Style of the same name in your css**.
   */
  addStyleClassNames(styleClassNames: string[]): void;

  /**
   * Sets (and replaces any existing) Permitted Values for a given column
   *
   * **note:  This replaces any existing permitted values for the column.  It is ​​not​​ an additive function.**
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

  getEditLookUpColumnForColumn(columnId: string): EditLookUpColumn;

  isEditLookUpColumn(columnId: string): boolean;

  clearRowStyles(): void;

  setRowStyles(rowStyles: RowStyle[]): void;
}
