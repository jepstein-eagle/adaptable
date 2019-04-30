"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThemeRedux = require("../Redux/ActionsReducers/ThemeRedux");
const ApiBase_1 = require("./ApiBase");
class ThemeApi extends ApiBase_1.ApiBase {
    getThemeState() {
        return this.getBlotterState().Theme;
    }
    setTheme(theme) {
        this.dispatchAction(ThemeRedux.ThemeSelect(theme));
    }
    getCurrentTheme() {
        return this.getBlotterState().Theme.CurrentTheme;
    }
    setSystemThemes(systemThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes));
    }
    setUserThemes(userThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes));
    }
    getAllSystemTheme() {
        return this.getBlotterState().Theme.SystemThemes;
    }
    getAllUserTheme() {
        return this.getBlotterState().Theme.UserThemes;
    }
}
exports.ThemeApi = ThemeApi;
