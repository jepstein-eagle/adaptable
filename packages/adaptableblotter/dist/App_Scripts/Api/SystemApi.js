"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class SystemApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().System;
    }
    GetAvailableCalendars() {
        return this.GetState().AvailableCalendars;
    }
}
exports.SystemApi = SystemApi;
