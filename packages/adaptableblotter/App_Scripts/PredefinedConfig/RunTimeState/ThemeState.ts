import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface ThemeState extends RunTimeState {
  CurrentTheme?: string;
  SystemThemes?: string[];
  UserThemes?: UserTheme[];
}

export interface UserTheme extends AdaptableBlotterObject {
  Name: string;
  Url: string;
}
