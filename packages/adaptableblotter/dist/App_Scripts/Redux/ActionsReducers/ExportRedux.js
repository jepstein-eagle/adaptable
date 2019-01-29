"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReportHelper_1 = require("../../Utilities/Helpers/ReportHelper");
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.EXPORT_APPLY = 'EXPORT_APPLY';
exports.IPP_LOGIN = 'IPP_LOGIN';
exports.REPORT_SELECT = 'REPORT_SELECT';
exports.REPORT_ADD_UPDATE = 'REPORT_ADD_UPDATE';
exports.REPORT_DELETE = 'REPORT_DELETE';
exports.ReportSelect = (SelectedReport) => ({
    type: exports.REPORT_SELECT,
    SelectedReport
});
exports.ReportAddUpdate = (Index, Report) => ({
    type: exports.REPORT_ADD_UPDATE,
    Index,
    Report
});
exports.ReportDelete = (Index) => ({
    type: exports.REPORT_DELETE,
    Index
});
exports.ExportApply = (Report, ExportDestination, Folder, Page) => ({
    type: exports.EXPORT_APPLY,
    Report,
    ExportDestination,
    Folder,
    Page
});
exports.IPPLogin = (Login, Password) => ({
    type: exports.IPP_LOGIN,
    Login,
    Password
});
const initialExportState = {
    Reports: ReportHelper_1.ReportHelper.CreateSystemReports(),
    CurrentReport: GeneralConstants_1.EMPTY_STRING,
};
exports.ExportReducer = (state = initialExportState, action) => {
    switch (action.type) {
        case exports.REPORT_SELECT:
            return Object.assign({}, state, { CurrentReport: action.SelectedReport });
        case exports.REPORT_ADD_UPDATE: {
            let Reports = [].concat(state.Reports);
            let actionTypedAddUpdate = action;
            if (actionTypedAddUpdate.Index != -1) { // it exists
                Reports[actionTypedAddUpdate.Index] = actionTypedAddUpdate.Report;
            }
            else {
                Reports.push(actionTypedAddUpdate.Report);
            }
            return Object.assign({}, state, { Reports: Reports, CurrentReport: actionTypedAddUpdate.Report.Name });
        }
        case exports.REPORT_DELETE: {
            let Reports = [].concat(state.Reports);
            let actionTypedDelete = action;
            Reports.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { Reports: Reports, CurrentReport: "" });
        }
        default:
            return state;
    }
};
