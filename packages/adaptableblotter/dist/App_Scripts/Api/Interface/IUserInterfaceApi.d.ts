import { IPermittedColumnValues } from "../../Utilities/Interface/IPermittedColumnValues";
import { UserInterfaceState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IUserInterfaceApi {
    getUserInterfaceState(): UserInterfaceState;
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
    getAllPermittedValues(): IPermittedColumnValues[];
    getPermittedValuesForColumn(columnId: string): IPermittedColumnValues;
}
