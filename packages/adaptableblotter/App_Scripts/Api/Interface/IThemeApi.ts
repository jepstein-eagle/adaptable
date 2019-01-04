import { IUserTheme } from './IAdaptableBlotterObjects';

export interface IThemeApi {
  SetCurrent(theme: string): void;
  GetCurrent(): string;
  SetSystemThemes(systemThemes: string[]): void;
  SetUserThemes(userThemes: string[]): void;
  SystemThemeGetAll(): string[];
  UserThemeGetAll(): IUserTheme[];
}
