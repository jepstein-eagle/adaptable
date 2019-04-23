"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShortcutRedux = require("../Redux/ActionsReducers/ShortcutRedux");
const ApiBase_1 = require("./ApiBase");
class ShortcutApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().Shortcut;
    }
    GetAll() {
        return this.getBlotterState().Shortcut.Shortcuts;
    }
    Add(shortcut) {
        this.dispatchAction(ShortcutRedux.ShortcutAdd(shortcut));
    }
    Delete(shortcut) {
        this.dispatchAction(ShortcutRedux.ShortcutDelete(shortcut));
    }
    DeleteAll() {
        this.GetAll().forEach(s => {
            this.Delete(s);
        });
    }
}
exports.ShortcutApi = ShortcutApi;
