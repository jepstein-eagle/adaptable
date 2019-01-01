import { ApiBase } from "./ApiBase";
import { IUserTheme } from './Interface/IAdaptableBlotterObjects';
export interface IThemeApi {
    SetCurrent(theme: string): void;
    GetCurrent(): string;
    SetSystemThemes(systemThemes: string[]): void;
    SetUserThemes(userThemes: string[]): void;
    SystemThemeGetAll(): string[];
    UserThemeGetAll(): IUserTheme[];
}
export declare class ThemeApi extends ApiBase implements IThemeApi {
    SetCurrent(theme: string): void;
    GetCurrent(): string;
    SetSystemThemes(systemThemes: string[]): void;
    SetUserThemes(userThemes: string[]): void;
    SystemThemeGetAll(): string[];
    UserThemeGetAll(): IUserTheme[];
}
