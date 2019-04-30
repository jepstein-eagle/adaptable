import { ApiBase } from "./ApiBase";
import { IUserInterfaceApi } from './Interface/IUserInterfaceApi';
import { IPermittedColumnValues } from "../Utilities/Interface/IPermittedColumnValues";
import { UserInterfaceState } from '../Redux/ActionsReducers/Interface/IState';
export declare class UserInterfaceApi extends ApiBase implements IUserInterfaceApi {
    getUserInterfaceState(): UserInterfaceState;
    setColorPalette(colorPalette: string[]): void;
    addColorsToPalette(colorPalette: string[]): void;
    addStyleClassNames(styleClassNames: string[]): void;
    getAllPermittedValues(): IPermittedColumnValues[];
    getPermittedValuesForColumn(columnId: string): IPermittedColumnValues;
    setColumnPermittedValues(column: string, permittedValues: string[]): void;
    clearColumnPermittedValues(column: string): void;
}
