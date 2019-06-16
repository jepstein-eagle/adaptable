import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface ThemeState extends RunTimeState {
  CurrentTheme?: string;
  SystemThemes?: string[];
  UserThemes?: UserTheme[];
}

export interface UserTheme extends IAdaptableBlotterObject {
  Name: string;
  Url: string;
}
