import * as Redux from 'redux';
import { ThemeState } from '../../PredefinedConfig/IUserState Interfaces/ThemeState';
import { StaticThemes } from '../../themes';
import {
  LIGHT_THEME,
  EMPTY_ARRAY,
  THEME_DEFAULT_CURRENT_THEME,
} from '../../Utilities/Constants/GeneralConstants';

const THEME_SET_SYSTEM_THEMES = 'THEME_SET_SYSTEM_THEMES';
const THEME_SET_USER_THEMES = 'THEME_SET_USER_THEMES';
export const THEME_SELECT = 'THEME_SELECT';

export interface ThemeSetSystemThemesAction extends Redux.Action {
  SystemThemes: string[];
}

export interface ThemeSetUserThemesAction extends Redux.Action {
  UserThemes: string[];
}

export interface ThemeSelectAction extends Redux.Action {
  Theme: string;
}

export const ThemeSetSystemThemes = (SystemThemes: string[]): ThemeSetSystemThemesAction => ({
  type: THEME_SET_SYSTEM_THEMES,
  SystemThemes,
});

export const ThemeSetUserThemes = (UserThemes: string[]): ThemeSetUserThemesAction => ({
  type: THEME_SET_USER_THEMES,
  UserThemes,
});

export const ThemeSelect = (Theme: string): ThemeSelectAction => ({
  type: THEME_SELECT,
  Theme,
});

const initialThemeState: ThemeState = {
  CurrentTheme: THEME_DEFAULT_CURRENT_THEME,
  SystemThemes: StaticThemes,
  UserThemes: EMPTY_ARRAY,
};

export const ThemeReducer: Redux.Reducer<ThemeState> = (
  state: ThemeState = initialThemeState,
  action: Redux.Action
): ThemeState => {
  switch (action.type) {
    case THEME_SET_SYSTEM_THEMES:
      return Object.assign({}, state, {
        SystemThemes: (<ThemeSetSystemThemesAction>action).SystemThemes,
      });
    case THEME_SET_USER_THEMES:
      return Object.assign({}, state, {
        UserThemes: (<ThemeSetUserThemesAction>action).UserThemes,
      });
    case THEME_SELECT:
      return Object.assign({}, state, { CurrentTheme: (<ThemeSelectAction>action).Theme });
    default:
      return state;
  }
};
