import * as Redux from 'redux';
import { SystemState } from './Interface/IState'
import { CalendarHelper } from '../../Utilities/Helpers/CalendarHelper';
import { ExportDestination } from '../../Utilities/Enums';
import { IPPDomain } from "../../Utilities/Interface/Reports/IPPDomain";
import { ILiveReport } from "../../Utilities/Interface/Reports/ILiveReport";
import { ISystemStatus } from "../../Utilities/Interface/ISystemStatus";
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { ChartVisibility } from '../../Utilities/ChartEnums';
import { EMPTY_ARRAY, SYSTEM_DEFAULT_CHART_VISIBILITY, EMPTY_STRING, SYSTEM_DEFAULT_SYSTEM_STATUS_COLOUR } from '../../Utilities/Constants/GeneralConstants';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ReportHelper } from '../../Utilities/Helpers/ReportHelper';

/*
Bit of a mixed bag of actions but essentially its those that are related to Strategies but where we DONT want to persist state
This allows us to keep the other reducers pure in terms of everything persists
Not sure if its a good idea or not and perhaps we need 2 stores but I think its better than it was...
*/


// Health Status
export const SYSTEM_SET_HEALTH_STATUS = 'SYSTEM_SET_HEALTH_STATUS';
export const SYSTEM_CLEAR_HEALTH_STATUS = 'SYSTEM_CLEAR_HEALTH_STATUS';

// Alerts
export const SYSTEM_ALERT_ADD = 'SYSTEM_ALERT_ADD';
export const SYSTEM_ALERT_DELETE = 'SYSTEM_ALERT_DELETE';
export const SYSTEM_ALERT_DELETE_ALL = 'SYSTEM_ALERT_DELETE_ALL';

// Live Reports
export const REPORT_START_LIVE = 'REPORT_START_LIVE';
export const REPORT_STOP_LIVE = 'REPORT_STOP_LIVE';
export const SET_IPP_DOMAIN_PAGES = 'SET_IPP_DOMAIN_PAGES';
export const REPORT_SET_ERROR_MESSAGE = 'REPORT_SET_ERROR_MESSAGE';

// Smart Edit
export const SMARTEDIT_CHECK_CELL_SELECTION = 'SMARTEDIT_CHECK_CELL_SELECTION';
export const SMARTEDIT_FETCH_PREVIEW = 'SMARTEDIT_FETCH_PREVIEW';
export const SMARTEDIT_SET_VALID_SELECTION = 'SMARTEDIT_SET_VALID_SELECTION';
export const SMARTEDIT_SET_PREVIEW = 'SMARTEDIT_SET_PREVIEW';

// Bulk Update
export const BULK_UPDATE_CHECK_CELL_SELECTION = 'BULK_UPDATE_CHECK_CELL_SELECTION';
export const BULK_UPDATE_SET_VALID_SELECTION = 'BULK_UPDATE_SET_VALID_SELECTION';
export const BULK_UPDATE_SET_PREVIEW = 'BULK_UPDATE_SET_PREVIEW';

// Chart Managemet 
export const CHART_SET_CHART_DATA = 'CHART_SET_CHART_DATA';
export const CHART_SET_CHART_VISIBILITY = 'CHART_SET_CHART_VISIBILITY';

// Error Messages
export const CALCULATEDCOLUMN_SET_ERROR_MESSAGE = 'CALCULATEDCOLUMN_SET_ERROR_MESSAGE';

export interface SystemSetHealthStatusAction extends Redux.Action {
    SystemStatus: ISystemStatus;
}

export interface SystemClearHealthStatusAction extends Redux.Action {
}

export interface SystemAlertAddAction extends Redux.Action {
    Alert: IAdaptableAlert
    MaxAlerts: number
}

export interface SystemAlertDeleteAction extends Redux.Action {
    Index: number
}

export interface SystemAlertDeleteAllAction extends Redux.Action {
}

export interface ReportStartLiveAction extends Redux.Action {
    Report: string;
    ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
    WorkbookName: string
}

export interface ReportStopLiveAction extends Redux.Action {
    Report: string;
    ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
}

export interface SmartEditCheckCellSelectionAction extends Redux.Action {
}

export interface SmartEditFetchPreviewAction extends Redux.Action {
}

export interface SmartEditSetPreviewAction extends Redux.Action {
    SmartEditPreviewInfo: IPreviewInfo
}

export interface SmartEditSetValidSelectionAction extends Redux.Action {
    IsValidSmartEditSelection: boolean
}

export interface BulkUpdateCheckCellSelectionAction extends Redux.Action {
}

export interface BulkUpdateSetPreviewAction extends Redux.Action {
    BulkUpdatePreviewInfo: IPreviewInfo
}

export interface BulkUpdateSetValidSelectionAction extends Redux.Action {
    IsValidBulkUpdateSelection: boolean
}

export interface ChartSetChartDataAction extends Redux.Action {
    chartData: any
}

export interface ChartSetChartVisibiityAction extends Redux.Action {
    ChartVisibility: ChartVisibility
}

export interface CalculatedColumnSetErrorMessageAction extends Redux.Action {
    ErrorMsg: string
}

export interface SetIPPDomainPagesAction extends Redux.Action {
    IPPDomainsPages: IPPDomain[];
}

export interface ReportSetErrorMessagection extends Redux.Action {
    ErrorMessage: string
}

export const SystemSetHealthStatus = (SystemStatus: ISystemStatus): SystemSetHealthStatusAction => ({
    type: SYSTEM_SET_HEALTH_STATUS,
    SystemStatus
})

export const SystemClearHealthStatus = (): SystemClearHealthStatusAction => ({
    type: SYSTEM_CLEAR_HEALTH_STATUS,
})

export const SystemAlertAdd = (Alert: IAdaptableAlert, MaxAlerts: number): SystemAlertAddAction => ({
    type: SYSTEM_ALERT_ADD,
    Alert,
    MaxAlerts
})

export const SystemAlertDelete = (Index: number): SystemAlertDeleteAction => ({
    type: SYSTEM_ALERT_DELETE,
    Index,
})

export const SystemAlertDeleteAll = (): SystemAlertDeleteAllAction => ({
    type: SYSTEM_ALERT_DELETE_ALL,
})


export const ReportStartLive = (Report: string, WorkbookName: string, ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull): ReportStartLiveAction => ({
    type: REPORT_START_LIVE,
    Report,
    ExportDestination,
    WorkbookName
})

export const ReportStopLive = (Report: string, ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull): ReportStopLiveAction => ({
    type: REPORT_STOP_LIVE,
    Report,
    ExportDestination
})

export const SmartEditCheckCellSelection = (): SmartEditCheckCellSelectionAction => ({
    type: SMARTEDIT_CHECK_CELL_SELECTION
})

export const SmartEditSetValidSelection = (IsValidSmartEditSelection: boolean): SmartEditSetValidSelectionAction => ({
    type: SMARTEDIT_SET_VALID_SELECTION,
    IsValidSmartEditSelection
})

export const SmartEditSetPreview = (SmartEditPreviewInfo: IPreviewInfo): SmartEditSetPreviewAction => ({
    type: SMARTEDIT_SET_PREVIEW,
    SmartEditPreviewInfo
})

export const BulkUpdateCheckCellSelection = (): BulkUpdateCheckCellSelectionAction => ({
    type: BULK_UPDATE_CHECK_CELL_SELECTION
})

export const BulkUpdateSetValidSelection = (IsValidBulkUpdateSelection: boolean): BulkUpdateSetValidSelectionAction => ({
    type: BULK_UPDATE_SET_VALID_SELECTION,
    IsValidBulkUpdateSelection
})

export const BulkUpdateSetPreview = (BulkUpdatePreviewInfo: IPreviewInfo): BulkUpdateSetPreviewAction => ({
    type: BULK_UPDATE_SET_PREVIEW,
    BulkUpdatePreviewInfo
})

export const ChartSetChartData = (chartData: any): ChartSetChartDataAction => ({
    type: CHART_SET_CHART_DATA,
    chartData
})


export const ChartSetChartVisibility = (ChartVisibility: ChartVisibility): ChartSetChartVisibiityAction => ({
    type: CHART_SET_CHART_VISIBILITY,
    ChartVisibility
})


export const CalculatedColumnSetErrorMessage = (ErrorMsg: string): CalculatedColumnSetErrorMessageAction => ({
    type: CALCULATEDCOLUMN_SET_ERROR_MESSAGE,
    ErrorMsg
})

export const SetIPPDomainPages = (IPPDomainsPages: IPPDomain[]): SetIPPDomainPagesAction => ({
    type: SET_IPP_DOMAIN_PAGES,
    IPPDomainsPages
})

export const ReportSetErrorMessage = (ErrorMessage: string): ReportSetErrorMessagection => ({
    type: REPORT_SET_ERROR_MESSAGE,
    ErrorMessage
})

const initialSystemState: SystemState = {
    SystemStatus: { StatusMessage: EMPTY_STRING, StatusColour: SYSTEM_DEFAULT_SYSTEM_STATUS_COLOUR },
    Alerts: EMPTY_ARRAY,
    AvailableCalendars: CalendarHelper.getSystemCalendars(),
    CurrentLiveReports: EMPTY_ARRAY,
    IsValidSmartEditSelection: false,
    SmartEditPreviewInfo: null,
    IsValidBulkUpdateSelection: false,
    BulkUpdatePreviewInfo: null,
    ChartData: null,
    ChartVisibility: SYSTEM_DEFAULT_CHART_VISIBILITY,
    CalculatedColumnErrorMessage: EMPTY_STRING,
    IPPDomainsPages: EMPTY_ARRAY,
    SystemReports: ReportHelper.CreateSystemReports(),
    ReportErrorMessage: EMPTY_STRING
}

export const SystemReducer: Redux.Reducer<SystemState> = (state: SystemState = initialSystemState, action: Redux.Action): SystemState => {
    let alerts: IAdaptableAlert[]
    switch (action.type) {
        case SYSTEM_SET_HEALTH_STATUS:
            return Object.assign({}, state, { SystemStatus: (<SystemSetHealthStatusAction>action).SystemStatus })
        case SYSTEM_CLEAR_HEALTH_STATUS:
            return Object.assign({}, state, { SystemStatus: { StatusMessage: "", StatusColour: "Green" } })
        case SYSTEM_ALERT_ADD: {
            let actionTypedAdd = (<SystemAlertAddAction>action)
            alerts = [].concat(state.Alerts)
            if (alerts.length == actionTypedAdd.MaxAlerts) {  // we have hit the maximum so remove first item (oldest)
                alerts.splice(0, 1);
            }
            alerts.push(actionTypedAdd.Alert)
            return Object.assign({}, state, { Alerts: alerts })
        }
        case SYSTEM_ALERT_DELETE: {
            let actionTypedDelete = (<SystemAlertDeleteAction>action)
            alerts = [].concat(state.Alerts)
            alerts.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { Alerts: alerts })
        }
        case SYSTEM_ALERT_DELETE_ALL: {
            return Object.assign({}, state, { Alerts: [] })
        }
        case REPORT_START_LIVE: {
            let actionTyped = (<ReportStartLiveAction>action)
            let currentLiveReports: ILiveReport[] = [].concat(state.CurrentLiveReports);
            currentLiveReports.push({
                ExportDestination: actionTyped.ExportDestination,
                Report: actionTyped.Report,
                WorkbookName: actionTyped.WorkbookName
            })
            return Object.assign({}, state, { CurrentLiveReports: currentLiveReports })
        }
        case REPORT_STOP_LIVE: {
            let actionTyped = (<ReportStopLiveAction>action)
            let currentLiveReports: ILiveReport[] = [].concat(state.CurrentLiveReports);
            let index = currentLiveReports.findIndex(x => x.Report == actionTyped.Report && x.ExportDestination == actionTyped.ExportDestination)
            currentLiveReports.splice(index, 1)
            return Object.assign({}, state, { CurrentLiveReports: currentLiveReports })
        }
        case SMARTEDIT_SET_VALID_SELECTION:
            return Object.assign({}, state, { IsValidSmartEditSelection: (<SmartEditSetValidSelectionAction>action).IsValidSmartEditSelection })
        case SMARTEDIT_SET_PREVIEW:
            return Object.assign({}, state, { SmartEditPreviewInfo: (<SmartEditSetPreviewAction>action).SmartEditPreviewInfo })
        case BULK_UPDATE_SET_VALID_SELECTION:
            return Object.assign({}, state, { IsValidBulkUpdateSelection: (<BulkUpdateSetValidSelectionAction>action).IsValidBulkUpdateSelection })
        case BULK_UPDATE_SET_PREVIEW:
            return Object.assign({}, state, { BulkUpdatePreviewInfo: (<BulkUpdateSetPreviewAction>action).BulkUpdatePreviewInfo })

        // Chart Actions
        case CHART_SET_CHART_DATA:
            return Object.assign({}, state, { ChartData: (<ChartSetChartDataAction>action).chartData })

        case CHART_SET_CHART_VISIBILITY:
            return Object.assign({}, state, { ChartVisibility: (<ChartSetChartVisibiityAction>action).ChartVisibility })

        case CALCULATEDCOLUMN_SET_ERROR_MESSAGE: {
            return Object.assign({}, state, { CalculatedColumnErrorMessage: (<CalculatedColumnSetErrorMessageAction>action).ErrorMsg });
        }
        case SET_IPP_DOMAIN_PAGES: {
            return Object.assign({}, state, { IPPDomainsPages: (<SetIPPDomainPagesAction>action).IPPDomainsPages })
        }
        case REPORT_SET_ERROR_MESSAGE: {
            return Object.assign({}, state, { ReportErrorMessage: (<ReportSetErrorMessagection>action).ErrorMessage })
        }

        default:
            return state
    }
}