import { ThemeState, UserTheme } from '../../PredefinedConfig/IUserState/ThemeState';

export interface IThemeApi {
  getThemeState(): ThemeState;
  setTheme(theme: string): void;
  getCurrentTheme(): string;
  setSystemThemes(systemThemes: string[]): void;
  setUserThemes(userThemes: string[]): void;
  getAllSystemTheme(): string[];
  getAllUserTheme(): UserTheme[];
}
