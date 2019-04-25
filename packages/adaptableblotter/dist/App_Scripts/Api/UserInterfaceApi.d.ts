import { ApiBase } from "./ApiBase";
import { IUserInterfaceApi } from './Interface/IUserInterfaceApi';
import { IPermittedColumnValues } from "../Utilities/Interface/IPermittedColumnValues";
import { UserInterfaceState } from '../Redux/ActionsReducers/Interface/IState';
export declare class UserInterfaceApi extends ApiBase implements IUserInterfaceApi {
    GetState(): UserInterfaceState;
    SetColorPalette(colorPalette: string[]): void;
    AddColorsToPalette(colorPalette: string[]): void;
    AddStyleClassNames(styleClassNames: string[]): void;
    GetAllPermittedValues(): IPermittedColumnValues[];
    GetPermittedValuesForColumn(columnId: string): IPermittedColumnValues;
    SetColumnPermittedValues(column: string, permittedValues: string[]): void;
    ClearColumnPermittedValues(column: string): void;
}
