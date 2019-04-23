"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ThemeRedux = require("../Redux/ActionsReducers/ThemeRedux");
const ApiBase_1 = require("./ApiBase");
class ThemeApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().Theme;
    }
    SetCurrent(theme) {
        this.dispatchAction(ThemeRedux.ThemeSelect(theme));
    }
    GetCurrent() {
        return this.getBlotterState().Theme.CurrentTheme;
    }
    SetSystemThemes(systemThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes));
    }
    SetUserThemes(userThemes) {
        this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes));
    }
    GetAllSystemTheme() {
        return this.getBlotterState().Theme.SystemThemes;
    }
    GetAllUserTheme() {
        return this.getBlotterState().Theme.UserThemes;
    }
}
exports.ThemeApi = ThemeApi;
