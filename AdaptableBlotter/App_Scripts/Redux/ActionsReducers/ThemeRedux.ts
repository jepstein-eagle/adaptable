/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { ThemeState } from './interface/IState'
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
    AvailableThemes: ["Default", "None"]
}

export const MenuReducer: Redux.Reducer<ThemeState> = (state: ThemeState = initialThemeState, action: Redux.Action): ThemeState => {
    switch (action.type) {
        case SET_CURRENT_THEME:
            return Object.assign({}, state, { CurrentTheme: (<SetCurrentThemeAction>action).Theme })
        default:
            return state
    }
}