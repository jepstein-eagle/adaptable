import { ApiBase } from "./ApiBase";
export interface IUserInterfaceApi {
    SetColorPalette(colorPalette: string[]): void;
    AddColorsToPalette(colorPalette: string[]): void;
    AddStyleClassNames(styleClassNames: string[]): void;
    SetColumnPermittedValues(column: string, permittedValues: string[]): void;
    ClearColumnPermittedValues(column: string): void;
}
export declare class UserInterfaceApi extends ApiBase implements IUserInterfaceApi {
    SetColorPalette(colorPalette: string[]): void;
    AddColorsToPalette(colorPalette: string[]): void;
    AddStyleClassNames(styleClassNames: string[]): void;
    SetColumnPermittedValues(column: string, permittedValues: string[]): void;
    ClearColumnPermittedValues(column: string): void;
}
