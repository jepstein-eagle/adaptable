import { ApiBase } from "./ApiBase";
import { IUserTheme } from "../Utilities/Interface/BlotterObjects/IUserTheme";
import { IThemeApi } from './Interface/IThemeApi';
import { ThemeState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ThemeApi extends ApiBase implements IThemeApi {
    GetState(): ThemeState;
    SetCurrent(theme: string): void;
    GetCurrent(): string;
    SetSystemThemes(systemThemes: string[]): void;
    SetUserThemes(userThemes: string[]): void;
    GetAllSystemTheme(): string[];
    GetAllUserTheme(): IUserTheme[];
}
