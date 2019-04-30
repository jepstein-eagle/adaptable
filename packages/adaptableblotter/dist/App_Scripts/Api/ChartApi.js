"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class ChartApi extends ApiBase_1.ApiBase {
    getChartState() {
        return this.getBlotterState().Chart;
    }
}
exports.ChartApi = ChartApi;
