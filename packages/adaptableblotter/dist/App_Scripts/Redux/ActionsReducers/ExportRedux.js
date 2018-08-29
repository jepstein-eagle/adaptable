"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReportHelper_1 = require("../../Core/Helpers/ReportHelper");
exports.EXPORT_APPLY = 'EXPORT_APPLY';
exports.IPP_LOGIN = 'IPP_LOGIN';
exports.SET_DOMAIN_PAGES = 'SET_DOMAIN_PAGES';
exports.REPORT_SELECT = 'REPORT_SELECT';
exports.REPORT_ADD_UPDATE = 'REPORT_ADD_UPDATE';
exports.REPORT_DELETE = 'REPORT_DELETE';
exports.REPORT_START_LIVE = 'REPORT_START_LIVE';
exports.REPORT_STOP_LIVE = 'REPORT_STOP_LIVE';
exports.REPORT_SET_ERROR_MSG = 'REPORT_SET_ERROR_MSG';
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
exports.ReportStartLive = (Report, WorkbookName, ExportDestination) => ({
    type: exports.REPORT_START_LIVE,
    Report,
    ExportDestination,
    WorkbookName
});
exports.ReportStopLive = (Report, ExportDestination) => ({
    type: exports.REPORT_STOP_LIVE,
    Report,
    ExportDestination
});
exports.ReportSetErrorMsg = (ErrorMsg) => ({
    type: exports.REPORT_SET_ERROR_MSG,
    ErrorMsg
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
exports.SetDomainPages = (IPPDomainsPages) => ({
    type: exports.SET_DOMAIN_PAGES,
    IPPDomainsPages
});
const initialExportState = {
    IPPDomainsPages: [],
    Reports: ReportHelper_1.ReportHelper.CreateSystemReports(),
    CurrentReport: "",
    CurrentLiveReports: [],
    ErrorMsg: ""
};
exports.ExportReducer = (state = initialExportState, action) => {
    switch (action.type) {
        case exports.EXPORT_APPLY:
            return state;
        case exports.SET_DOMAIN_PAGES: {
            let actionTyped = action;
            return Object.assign({}, state, { IPPDomainsPages: actionTyped.IPPDomainsPages });
        }
        case exports.REPORT_SELECT:
            return Object.assign({}, state, { CurrentReport: action.SelectedReport });
        case exports.REPORT_START_LIVE: {
            let actionTyped = action;
            let currentLiveReports = [].concat(state.CurrentLiveReports);
            currentLiveReports.push({
                ExportDestination: actionTyped.ExportDestination,
                Report: actionTyped.Report,
                WorkbookName: actionTyped.WorkbookName
            });
            return Object.assign({}, state, { CurrentLiveReports: currentLiveReports });
        }
        case exports.REPORT_STOP_LIVE: {
            let actionTyped = action;
            let currentLiveReports = [].concat(state.CurrentLiveReports);
            let index = currentLiveReports.findIndex(x => x.Report == actionTyped.Report && x.ExportDestination == actionTyped.ExportDestination);
            currentLiveReports.splice(index, 1);
            return Object.assign({}, state, { CurrentLiveReports: currentLiveReports });
        }
        case exports.REPORT_SET_ERROR_MSG: {
            let actionTyped = action;
            return Object.assign({}, state, { ErrorMsg: actionTyped.ErrorMsg });
        }
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
