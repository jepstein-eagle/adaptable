"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalendarHelper_1 = require("../../Utilities/Helpers/CalendarHelper");
const ChartEnums_1 = require("../../Utilities/ChartEnums");
/*
Bit of a mixed bag of actions but essentially its those that are related to Strategies but where we DONT want to persist state
This allows us to keep the other reducers pure in terms of everything persists
Not sure if its a good idea or not and perhaps we need 2 stores but I think its better than it was...
*/
// Health Status
exports.SYSTEM_SET_HEALTH_STATUS = 'SYSTEM_SET_HEALTH_STATUS';
exports.SYSTEM_CLEAR_HEALTH_STATUS = 'SYSTEM_CLEAR_HEALTH_STATUS';
// Alerts
exports.SYSTEM_ALERT_ADD = 'SYSTEM_ALERT_ADD';
exports.SYSTEM_ALERT_DELETE = 'SYSTEM_ALERT_DELETE';
exports.SYSTEM_ALERT_DELETE_ALL = 'SYSTEM_ALERT_DELETE_ALL';
// Live Reports
exports.REPORT_START_LIVE = 'REPORT_START_LIVE';
exports.REPORT_STOP_LIVE = 'REPORT_STOP_LIVE';
// Smart Edit
exports.SMARTEDIT_CHECK_CELL_SELECTION = 'SMARTEDIT_CHECK_CELL_SELECTION';
exports.SMARTEDIT_FETCH_PREVIEW = 'SMARTEDIT_FETCH_PREVIEW';
exports.SMARTEDIT_SET_VALID_SELECTION = 'SMARTEDIT_SET_VALID_SELECTION';
exports.SMARTEDIT_SET_PREVIEW = 'SMARTEDIT_SET_PREVIEW';
// Bulk Update
exports.BULK_UPDATE_CHECK_CELL_SELECTION = 'BULK_UPDATE_CHECK_CELL_SELECTION';
exports.BULK_UPDATE_SET_VALID_SELECTION = 'BULK_UPDATE_SET_VALID_SELECTION';
exports.BULK_UPDATE_SET_PREVIEW = 'BULK_UPDATE_SET_PREVIEW';
// Chart Managemet 
exports.CHART_SET_CHART_DATA = 'CHART_SET_CHART_DATA';
exports.CHART_SET_CHART_VISIBILITY = 'CHART_SET_CHART_VISIBILITY';
// Error Messages
exports.CALCULATEDCOLUMN_SET_ERROR_MESSAGE = 'CALCULATEDCOLUMN_SET_ERROR_MESSAGE';
// Export
exports.SET_IPP_DOMAIN_PAGES = 'SET_IPP_DOMAIN_PAGES';
exports.REPORT_SET_ERROR_MESSAGE = 'REPORT_SET_ERROR_MESSAGE';
exports.SystemSetHealthStatus = (SystemStatus) => ({
    type: exports.SYSTEM_SET_HEALTH_STATUS,
    SystemStatus
});
exports.SystemClearHealthStatus = () => ({
    type: exports.SYSTEM_CLEAR_HEALTH_STATUS,
});
exports.SystemAlertAdd = (Alert, MaxAlerts) => ({
    type: exports.SYSTEM_ALERT_ADD,
    Alert,
    MaxAlerts
});
exports.SystemAlertDelete = (Index) => ({
    type: exports.SYSTEM_ALERT_DELETE,
    Index,
});
exports.SystemAlertDeleteAll = () => ({
    type: exports.SYSTEM_ALERT_DELETE_ALL,
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
exports.SmartEditCheckCellSelection = () => ({
    type: exports.SMARTEDIT_CHECK_CELL_SELECTION
});
exports.SmartEditSetValidSelection = (IsValidSmartEditSelection) => ({
    type: exports.SMARTEDIT_SET_VALID_SELECTION,
    IsValidSmartEditSelection
});
exports.SmartEditSetPreview = (SmartEditPreviewInfo) => ({
    type: exports.SMARTEDIT_SET_PREVIEW,
    SmartEditPreviewInfo
});
exports.BulkUpdateCheckCellSelection = () => ({
    type: exports.BULK_UPDATE_CHECK_CELL_SELECTION
});
exports.BulkUpdateSetValidSelection = (IsValidBulkUpdateSelection) => ({
    type: exports.BULK_UPDATE_SET_VALID_SELECTION,
    IsValidBulkUpdateSelection
});
exports.BulkUpdateSetPreview = (BulkUpdatePreviewInfo) => ({
    type: exports.BULK_UPDATE_SET_PREVIEW,
    BulkUpdatePreviewInfo
});
exports.ChartSetChartData = (chartData) => ({
    type: exports.CHART_SET_CHART_DATA,
    chartData
});
exports.ChartSetChartVisibility = (ChartVisibility) => ({
    type: exports.CHART_SET_CHART_VISIBILITY,
    ChartVisibility
});
exports.CalculatedColumnSetErrorMessage = (ErrorMsg) => ({
    type: exports.CALCULATEDCOLUMN_SET_ERROR_MESSAGE,
    ErrorMsg
});
exports.SetIPPDomainPages = (IPPDomainsPages) => ({
    type: exports.SET_IPP_DOMAIN_PAGES,
    IPPDomainsPages
});
exports.ReportSetErrorMessage = (ErrorMessage) => ({
    type: exports.REPORT_SET_ERROR_MESSAGE,
    ErrorMessage
});
const initialSystemState = {
    SystemStatus: { StatusMessage: "", StatusColour: "Green" },
    Alerts: [],
    AvailableCalendars: CalendarHelper_1.CalendarHelper.getSystemCalendars(),
    CurrentLiveReports: [],
    IsValidSmartEditSelection: false,
    SmartEditPreviewInfo: null,
    IsValidBulkUpdateSelection: false,
    BulkUpdatePreviewInfo: null,
    ChartData: null,
    ChartVisibility: ChartEnums_1.ChartVisibility.Hidden,
    CalculatedColumnErrorMessage: "",
    IPPDomainsPages: [],
    ReportErrorMessage: ""
};
exports.SystemReducer = (state = initialSystemState, action) => {
    let alerts;
    switch (action.type) {
        case exports.SYSTEM_SET_HEALTH_STATUS:
            return Object.assign({}, state, { SystemStatus: action.SystemStatus });
        case exports.SYSTEM_CLEAR_HEALTH_STATUS:
            return Object.assign({}, state, { SystemStatus: { StatusMessage: "", StatusColour: "Green" } });
        case exports.SYSTEM_ALERT_ADD: {
            let actionTypedAdd = action;
            alerts = [].concat(state.Alerts);
            if (alerts.length == actionTypedAdd.MaxAlerts) { // we have hit the maximum so remove first item (oldest)
                alerts.splice(0, 1);
            }
            alerts.push(actionTypedAdd.Alert);
            return Object.assign({}, state, { Alerts: alerts });
        }
        case exports.SYSTEM_ALERT_DELETE: {
            let actionTypedDelete = action;
            alerts = [].concat(state.Alerts);
            alerts.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { Alerts: alerts });
        }
        case exports.SYSTEM_ALERT_DELETE_ALL: {
            return Object.assign({}, state, { Alerts: [] });
        }
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
        case exports.SMARTEDIT_SET_VALID_SELECTION:
            return Object.assign({}, state, { IsValidSmartEditSelection: action.IsValidSmartEditSelection });
        case exports.SMARTEDIT_SET_PREVIEW:
            return Object.assign({}, state, { SmartEditPreviewInfo: action.SmartEditPreviewInfo });
        case exports.BULK_UPDATE_SET_VALID_SELECTION:
            return Object.assign({}, state, { IsValidBulkUpdateSelection: action.IsValidBulkUpdateSelection });
        case exports.BULK_UPDATE_SET_PREVIEW:
            return Object.assign({}, state, { BulkUpdatePreviewInfo: action.BulkUpdatePreviewInfo });
        // Chart Actions
        case exports.CHART_SET_CHART_DATA:
            return Object.assign({}, state, { ChartData: action.chartData });
        case exports.CHART_SET_CHART_VISIBILITY:
            return Object.assign({}, state, { ChartVisibility: action.ChartVisibility });
        case exports.CALCULATEDCOLUMN_SET_ERROR_MESSAGE: {
            return Object.assign({}, state, { CalculatedColumnErrorMessage: action.ErrorMsg });
        }
        case exports.SET_IPP_DOMAIN_PAGES: {
            return Object.assign({}, state, { IPPDomainsPages: action.IPPDomainsPages });
        }
        case exports.REPORT_SET_ERROR_MESSAGE: {
            return Object.assign({}, state, { ReportErrorMessage: action.ErrorMessage });
        }
        default:
            return state;
    }
};
