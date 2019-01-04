import { ApiBase } from "./ApiBase";
import { IUserInterfaceApi } from './Interface/IUserInterfaceApi';
export declare class UserInterfaceApi extends ApiBase implements IUserInterfaceApi {
    SetColorPalette(colorPalette: string[]): void;
    AddColorsToPalette(colorPalette: string[]): void;
    AddStyleClassNames(styleClassNames: string[]): void;
    SetColumnPermittedValues(column: string, permittedValues: string[]): void;
    ClearColumnPermittedValues(column: string): void;
}
