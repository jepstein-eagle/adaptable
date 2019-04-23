import { IUserTheme } from "../../Utilities/Interface/BlotterObjects/IUserTheme";
import { ThemeState } from "../../Redux/ActionsReducers/Interface/IState";

export interface IThemeApi {
  GetState(): ThemeState;
   SetCurrent(theme: string): void;
  GetCurrent(): string;
  SetSystemThemes(systemThemes: string[]): void;
  SetUserThemes(userThemes: string[]): void;
  GetAllSystemTheme(): string[];
  GetAllUserTheme(): IUserTheme[];
}
