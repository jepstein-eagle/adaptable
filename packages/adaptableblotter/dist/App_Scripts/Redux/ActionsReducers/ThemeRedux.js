"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const themes_1 = require("../../Styles/themes");
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
const THEME_SET_SYSTEM_THEMES = 'THEME_SET_SYSTEM_THEMES';
const THEME_SET_USER_THEMES = 'THEME_SET_USER_THEMES';
const THEME_SELECT = 'THEME_SELECT';
exports.ThemeSetSystemThemes = (SystemThemes) => ({
    type: THEME_SET_SYSTEM_THEMES,
    SystemThemes
});
exports.ThemeSetUserThemes = (UserThemes) => ({
    type: THEME_SET_USER_THEMES,
    UserThemes
});
exports.ThemeSelect = (Theme) => ({
    type: THEME_SELECT,
    Theme
});
const initialThemeState = {
    CurrentTheme: GeneralConstants_1.LIGHT_THEME,
    SystemThemes: themes_1.StaticThemes,
    UserThemes: []
};
exports.ThemeReducer = (state = initialThemeState, action) => {
    switch (action.type) {
        case THEME_SET_SYSTEM_THEMES:
            return Object.assign({}, state, { SystemThemes: action.SystemThemes });
        case THEME_SET_USER_THEMES:
            return Object.assign({}, state, { UserThemes: action.UserThemes });
        case THEME_SELECT:
            return Object.assign({}, state, { CurrentTheme: action.Theme });
        default:
            return state;
    }
};
