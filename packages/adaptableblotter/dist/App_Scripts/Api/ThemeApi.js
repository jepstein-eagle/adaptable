"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThemeRedux = require("../Redux/ActionsReducers/ThemeRedux");
const ApiBase_1 = require("./ApiBase");
class ThemeApi extends ApiBase_1.ApiBase {
    SetCurrent(theme) {
        this.dispatchAction(ThemeRedux.ThemeSelect(theme));
    }
    GetCurrent() {
        return this.getState().Theme.CurrentTheme;
    }
    SetSystemThemes(systemThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes));
    }
    SetUserThemes(userThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes));
    }
    GetAllSystemTheme() {
        return this.getState().Theme.SystemThemes;
    }
    GetAllUserTheme() {
        return this.getState().Theme.UserThemes;
    }
}
exports.ThemeApi = ThemeApi;
