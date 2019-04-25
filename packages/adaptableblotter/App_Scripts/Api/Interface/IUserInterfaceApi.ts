import { IPermittedColumnValues } from "../../Utilities/Interface/IPermittedColumnValues";
import { UserInterfaceState } from "../../Redux/ActionsReducers/Interface/IState";

export interface IUserInterfaceApi {
  GetState(): UserInterfaceState;
   SetColorPalette(colorPalette: string[]): void;
  /**
   *
   * @param styleClassNames Make sure that you provide a Css Style of the same name in your css.
   */
  AddColorsToPalette(colorPalette: string[]): void;
  AddStyleClassNames(styleClassNames: string[]): void;
  /**
   * This replaces any existing permitted values for the column.  It is ​​not​​ an additive function.
   * @param column
   * @param permittedValues
   */
  SetColumnPermittedValues(column: string, permittedValues: string[]): void;
  /**
    * If this function is called the column will revert to default behaviour
    * which is t show current distinct values for the column in filters, searches etc
    * @param column
    */
  ClearColumnPermittedValues(column: string): void;

  GetAllPermittedValues(): IPermittedColumnValues[];
  
  GetPermittedValuesForColumn(columnId: string): IPermittedColumnValues;
}
