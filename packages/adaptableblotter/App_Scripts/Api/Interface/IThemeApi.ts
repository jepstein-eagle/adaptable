import { ThemeState, IUserTheme } from '../../PredefinedConfig/IUserState Interfaces/ThemeState';

export interface IThemeApi {
  getThemeState(): ThemeState;
  setTheme(theme: string): void;
  getCurrentTheme(): string;
  setSystemThemes(systemThemes: string[]): void;
  setUserThemes(userThemes: string[]): void;
  getAllSystemTheme(): string[];
  getAllUserTheme(): IUserTheme[];
}
