"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExportRedux = require("../Redux/ActionsReducers/ExportRedux");
const ApiBase_1 = require("./ApiBase");
class ExportApi extends ApiBase_1.ApiBase {
    GetCurrent() {
        return this.getState().Export.CurrentReport;
    }
    GetAllReports() {
        return this.getState().System.SystemReports.concat(this.getState().Export.Reports);
    }
    GetAllLiveReports() {
        return this.getState().System.CurrentLiveReports;
    }
    SendReport(reportName, destination) {
        let report = this.GetAllReports().find(r => r.Name == reportName);
        if (this.checkItemExists(report, reportName, "Report")) {
            this.dispatchAction(ExportRedux.ExportApply(reportName, destination));
        }
    }
}
exports.ExportApi = ExportApi;
