import * as Redux from 'redux';
import { SystemState } from './Interface/IState'
import { ISystemStatus } from '../../api/Interface/Interfaces';
import { IAlert } from '../../Api/Interface/IMessage';
import { CalendarHelper } from '../../Utilities/Helpers/CalendarHelper';
import { ExportDestination } from '../../Utilities/Enums';
import { ILiveReport } from '../../Strategy/Interface/IExportStrategy';
import { IPreviewInfo } from '../../Api/Interface/IPreview';

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

// Smart Edit
export const SMARTEDIT_CHECK_CELL_SELECTION = 'SMARTEDIT_CHECK_CELL_SELECTION';
export const SMARTEDIT_FETCH_PREVIEW = 'SMARTEDIT_FETCH_PREVIEW';
export const SMARTEDIT_SET_VALID_SELECTION = 'SMARTEDIT_SET_VALID_SELECTION';
export const SMARTEDIT_SET_PREVIEW = 'SMARTEDIT_SET_PREVIEW';

// Bulk Update
export const BULK_UPDATE_CHECK_CELL_SELECTION = 'BULK_UPDATE_CHECK_CELL_SELECTION';
export const BULK_UPDATE_SET_VALID_SELECTION = 'BULK_UPDATE_SET_VALID_SELECTION';
export const BULK_UPDATE_SET_PREVIEW = 'BULK_UPDATE_SET_PREVIEW';


export interface SystemSetHealthStatusAction extends Redux.Action {
    SystemStatus: ISystemStatus;
}

export interface SystemClearHealthStatusAction extends Redux.Action {

}

export interface SystemAlertAddAction extends Redux.Action {
    Alert: IAlert
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

export const SystemSetHealthStatus = (SystemStatus: ISystemStatus): SystemSetHealthStatusAction => ({
    type: SYSTEM_SET_HEALTH_STATUS,
    SystemStatus
})

export const SystemClearHealthStatus = (): SystemClearHealthStatusAction => ({
    type: SYSTEM_CLEAR_HEALTH_STATUS,
})

export const SystemAlertAdd = (Alert: IAlert, MaxAlerts: number): SystemAlertAddAction => ({
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


const initialSystemState: SystemState = {
    SystemStatus: { StatusMessage: "", StatusColour: "Green" },
    Alerts: [],
    AvailableCalendars: CalendarHelper.getSystemCalendars(),
    CurrentLiveReports: [],
    IsValidSmartEditSelection: false,
    SmartEditPreviewInfo: null,
    IsValidBulkUpdateSelection: false,
    BulkUpdatePreviewInfo: null
}

export const SystemReducer: Redux.Reducer<SystemState> = (state: SystemState = initialSystemState, action: Redux.Action): SystemState => {
    let alerts: IAlert[]
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

        default:
            return state
    }
}