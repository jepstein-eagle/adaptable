import { IUserTheme } from "../../Utilities/Interface/BlotterObjects/IUserTheme";
export interface IThemeApi {
    SetCurrent(theme: string): void;
    GetCurrent(): string;
    SetSystemThemes(systemThemes: string[]): void;
    SetUserThemes(userThemes: string[]): void;
    GetAllSystemTheme(): string[];
    GetAllUserTheme(): IUserTheme[];
}
