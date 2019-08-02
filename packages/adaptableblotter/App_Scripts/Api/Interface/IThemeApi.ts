import { ThemeState, AdaptableBlotterTheme } from '../../PredefinedConfig/RunTimeState/ThemeState';

export interface IThemeApi {
  getThemeState(): ThemeState;
  setTheme(theme: string): void;
  getCurrentTheme(): string;
  setSystemThemes(systemThemes: AdaptableBlotterTheme[]): void;
  setUserThemes(userThemes: AdaptableBlotterTheme[]): void;
  getAllSystemTheme(): AdaptableBlotterTheme[];
  getAllUserTheme(): AdaptableBlotterTheme[];
  getAllTheme(): AdaptableBlotterTheme[];
}
