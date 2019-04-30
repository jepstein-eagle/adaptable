"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class CellSummaryApi extends ApiBase_1.ApiBase {
    getCellSummaryState() {
        return this.getBlotterState().CellSummary;
    }
}
exports.CellSummaryApi = CellSummaryApi;