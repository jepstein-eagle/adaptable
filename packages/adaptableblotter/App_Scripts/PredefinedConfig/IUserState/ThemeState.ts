import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface ThemeState extends IUserState {
  CurrentTheme?: string;
  SystemThemes?: string[];
  UserThemes?: UserTheme[];
}

export interface UserTheme extends IAdaptableBlotterObject {
  Name: string;
  Url: string;
}
