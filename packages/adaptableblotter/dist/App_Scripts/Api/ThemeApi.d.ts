import { ApiBase } from "./ApiBase";
import { IUserTheme } from "../Utilities/Interface/BlotterObjects/IUserTheme";
import { IThemeApi } from './Interface/IThemeApi';
export declare class ThemeApi extends ApiBase implements IThemeApi {
    SetCurrent(theme: string): void;
    GetCurrent(): string;
    SetSystemThemes(systemThemes: string[]): void;
    SetUserThemes(userThemes: string[]): void;
    GetAllSystemTheme(): string[];
    GetAllUserTheme(): IUserTheme[];
}
