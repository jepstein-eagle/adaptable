"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class BulkUpdateApi extends ApiBase_1.ApiBase {
    getBulkUpdateState() {
        return this.getBlotterState().BulkUpdate;
    }
    getBulkUpdateValue() {
        return this.getBulkUpdateState().BulkUpdateValue;
    }
}
exports.BulkUpdateApi = BulkUpdateApi;
