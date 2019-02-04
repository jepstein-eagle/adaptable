"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MenuRedux = require("../Redux/ActionsReducers/MenuRedux");
const PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
const ApiBase_1 = require("./ApiBase");
class InternalApi extends ApiBase_1.ApiBase {
    // System Redux Actions
    ReportStartLive(reportName, workbookName, exportDestination) {
        this.dispatchAction(SystemRedux.ReportStartLive(reportName, workbookName, exportDestination));
    }
    // Menu Redux Actions
    ColumnContextMenuClear() {
        this.dispatchAction(MenuRedux.ClearColumnContextMenu());
    }
    ColumnContextMenuAddItem(menuItem) {
        this.dispatchAction(MenuRedux.AddItemColumnContextMenu(menuItem));
    }
    // Popup Redux Actions
    PopupShowConfirmation(confirmation) {
        this.dispatchAction(PopupRedux.PopupShowConfirmation(confirmation));
    }
}
exports.InternalApi = InternalApi;
