"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
const EventDispatcher_1 = require("../Utilities/EventDispatcher");
class EventApi extends ApiBase_1.ApiBase {
    constructor(blotter) {
        super(blotter);
        this._onSearchedChanged = new EventDispatcher_1.EventDispatcher();
        this._onStateChanged = new EventDispatcher_1.EventDispatcher();
        this._onColumnStateChanged = new EventDispatcher_1.EventDispatcher();
        this._onAlertFired = new EventDispatcher_1.EventDispatcher();
    }
    onSearchedChanged() {
        return this._onSearchedChanged;
    }
    onStateChanged() {
        return this._onStateChanged;
    }
    onColumnStateChanged() {
        return this._onColumnStateChanged;
    }
    onAlertFired() {
        return this._onAlertFired;
    }
}
exports.EventApi = EventApi;
