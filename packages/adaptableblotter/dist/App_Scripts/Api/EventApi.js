"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class EventApi extends ApiBase_1.ApiBase {
    onSearchedChanged() {
        return this.blotter.SearchedChanged;
    }
    onStateChanged() {
        return this.blotter.StateChanged;
    }
    onColumnStateChanged() {
        return this.blotter.ColumnStateChanged;
    }
}
exports.EventApi = EventApi;
