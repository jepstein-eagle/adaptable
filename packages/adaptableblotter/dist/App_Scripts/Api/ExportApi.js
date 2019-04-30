"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExportRedux = require("../Redux/ActionsReducers/ExportRedux");
const ApiBase_1 = require("./ApiBase");
class ExportApi extends ApiBase_1.ApiBase {
    getExportState() {
        return this.getBlotterState().Export;
    }
    getCurrentReport() {
        return this.getExportState().CurrentReport;
    }
    getAllReports() {
        return this.blotter.api.internalApi.getSystemReports().concat(this.getBlotterState().Export.Reports);
    }
    sendReport(reportName, destination) {
        let report = this.getAllReports().find(r => r.Name == reportName);
        if (this.checkItemExists(report, reportName, "Report")) {
            this.dispatchAction(ExportRedux.ExportApply(reportName, destination));
        }
    }
}
exports.ExportApi = ExportApi;
