"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
// Base class for the API - provides checking dispatching methods
class ApiBase {
    constructor(blotter) {
        this.blotter = blotter;
    }
    checkItemExists(item, name, type) {
        if (!item) {
            LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError("No " + type + " found with the name: " + name);
            return false;
        }
        return true;
    }
    dispatchAction(action) {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(action);
    }
    getState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState();
    }
}
exports.ApiBase = ApiBase;
