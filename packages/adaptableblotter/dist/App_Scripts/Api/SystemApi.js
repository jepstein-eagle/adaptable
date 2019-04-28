"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
class SystemApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().System;
    }
    GetAvailableCalendars() {
        return this.GetState().AvailableCalendars;
    }
    SetChartData(chartData) {
        this.dispatchAction(SystemRedux.ChartSetChartData(chartData));
    }
    SetChartVisibility(chartVisbility) {
        this.dispatchAction(SystemRedux.ChartSetChartVisibility(chartVisbility));
    }
}
exports.SystemApi = SystemApi;
