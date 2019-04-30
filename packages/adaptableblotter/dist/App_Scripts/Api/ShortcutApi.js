"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShortcutRedux = require("../Redux/ActionsReducers/ShortcutRedux");
const ApiBase_1 = require("./ApiBase");
class ShortcutApi extends ApiBase_1.ApiBase {
    getShortcutState() {
        return this.getBlotterState().Shortcut;
    }
    getAllShortcut() {
        return this.getBlotterState().Shortcut.Shortcuts;
    }
    addShortcut(shortcut) {
        this.dispatchAction(ShortcutRedux.ShortcutAdd(shortcut));
    }
    deleteShortcut(shortcut) {
        this.dispatchAction(ShortcutRedux.ShortcutDelete(shortcut));
    }
    deleteAllShortcut() {
        this.getAllShortcut().forEach(s => {
            this.deleteShortcut(s);
        });
    }
}
exports.ShortcutApi = ShortcutApi;
