import * as Redux from 'redux';
import { ThemeState } from './Interface/IState';
export interface ThemeSetSystemThemesAction extends Redux.Action {
    SystemThemes: string[];
}
export interface ThemeSetUserThemesAction extends Redux.Action {
    UserThemes: string[];
}
export interface ThemeSelectAction extends Redux.Action {
    Theme: string;
}
export declare const ThemeSetSystemThemes: (SystemThemes: string[]) => ThemeSetSystemThemesAction;
export declare const ThemeSetUserThemes: (UserThemes: string[]) => ThemeSetUserThemesAction;
export declare const ThemeSelect: (Theme: string) => ThemeSelectAction;
export declare const ThemeReducer: Redux.Reducer<ThemeState>;
