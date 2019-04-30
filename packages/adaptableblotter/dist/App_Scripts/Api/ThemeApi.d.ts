import { ApiBase } from "./ApiBase";
import { IUserTheme } from "../Utilities/Interface/BlotterObjects/IUserTheme";
import { IThemeApi } from './Interface/IThemeApi';
import { ThemeState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ThemeApi extends ApiBase implements IThemeApi {
    getThemeState(): ThemeState;
    setTheme(theme: string): void;
    getCurrentTheme(): string;
    setSystemThemes(systemThemes: string[]): void;
    setUserThemes(userThemes: string[]): void;
    getAllSystemTheme(): string[];
    getAllUserTheme(): IUserTheme[];
}
