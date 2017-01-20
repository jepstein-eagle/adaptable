/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { ThemeState } from './interface/IState'
import { StaticThemes } from '../../../themes/index'
const SET_CURRENT_THEME = 'SET_CURRENT_THEME';

export interface SetCurrentThemeAction extends Redux.Action {
    Theme: string;
}

export const SetCurrentTheme = (Theme: string): SetCurrentThemeAction => ({
    type: SET_CURRENT_THEME,
    Theme
})

const initialThemeState: ThemeState = {
    CurrentTheme: "Default",
    AvailableThemes: [].concat(["Default", "None"], StaticThemes)
}

export const MenuReducer: Redux.Reducer<ThemeState> = (state: ThemeState = initialThemeState, action: Redux.Action): ThemeState => {
    switch (action.type) {
        case SET_CURRENT_THEME:
            return Object.assign({}, state, { CurrentTheme: (<SetCurrentThemeAction>action).Theme })
        default:
            return state
    }
}