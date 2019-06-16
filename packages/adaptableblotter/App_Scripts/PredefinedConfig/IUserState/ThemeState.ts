import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface ThemeState extends IUserState {
  CurrentTheme?: string;
  SystemThemes?: string[];
  UserThemes?: IUserTheme[];
}

export interface IUserTheme extends IAdaptableBlotterObject {
  Name: string;
  Url: string;
}
