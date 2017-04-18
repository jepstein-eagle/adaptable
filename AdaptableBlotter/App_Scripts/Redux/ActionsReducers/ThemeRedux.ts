import * as Redux from 'redux';
import { ThemeState } from './interface/IState'
import { StaticThemes } from '../../../themes/index'
const THEME_SELECT = 'THEME_SELECT';

export interface ThemeSelectAction extends Redux.Action {
    Theme: string;
}

export const ThemeSelect = (Theme: string): ThemeSelectAction => ({
    type: THEME_SELECT,
    Theme
})

const initialThemeState: ThemeState = {
    CurrentTheme: "Default",
    AvailableThemes: [].concat(["Default", "None"], StaticThemes)
}

export const ThemeReducer: Redux.Reducer<ThemeState> = (state: ThemeState = initialThemeState, action: Redux.Action): ThemeState => {
    switch (action.type) {
        case THEME_SELECT:
            return Object.assign({}, state, { CurrentTheme: (<ThemeSelectAction>action).Theme })
        default:
            return state
    }
}