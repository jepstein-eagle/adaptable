import { IUserTheme } from "../../Utilities/Interface/BlotterObjects/IUserTheme";
import { ThemeState } from "../../Redux/ActionsReducers/Interface/IState";

export interface IThemeApi {
  getThemeState(): ThemeState;
  setTheme(theme: string): void;
  getCurrentTheme(): string;
  setSystemThemes(systemThemes: string[]): void;
  setUserThemes(userThemes: string[]): void;
  getAllSystemTheme(): string[];
  getAllUserTheme(): IUserTheme[];
}
