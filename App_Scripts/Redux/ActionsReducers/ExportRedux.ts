import { ExportState } from './Interface/IState';
import { IPPDomain } from '../../Strategy/Interface/IExportStrategy'
import { ExportDestination } from '../../Core/Enums';
import * as Redux from 'redux'
import { ReportHelper } from '../../Core/Helpers/ReportHelper';
import {  ILiveReport } from '../../Strategy/Interface/IExportStrategy'
import { IReport } from '../../Core/Api/Interface/AdaptableBlotterObjects';

export const EXPORT_APPLY = 'EXPORT_APPLY';
export const IPP_LOGIN = 'IPP_LOGIN';
export const SET_DOMAIN_PAGES = 'SET_DOMAIN_PAGES';

export const REPORT_SELECT = 'REPORT_SELECT';
export const REPORT_ADD_UPDATE = 'REPORT_ADD_UPDATE';
export const REPORT_DELETE = 'REPORT_DELETE';
export const REPORT_START_LIVE = 'REPORT_START_LIVE';
export const REPORT_STOP_LIVE = 'REPORT_STOP_LIVE';
export const REPORT_SET_ERROR_MSG = 'REPORT_SET_ERROR_MSG';

export interface ExportApplyAction extends Redux.Action {
    Report: string;
    ExportDestination: ExportDestination
    Folder?: string
    Page?: string
}

export interface IPPLoginAction extends Redux.Action {
    Login: string;
    Password: string;
}

export interface SetDomainPagesAction extends Redux.Action {
    IPPDomainsPages: IPPDomain[];
}


export interface ReportSelectAction extends Redux.Action {
    SelectedReport: string;
}

export interface ReportAddUpdateAction extends Redux.Action {
    Index: number,
    Report: IReport
}

export interface ReportDeleteAction extends Redux.Action {
    Index: number
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

export interface ReportSetErrorMsgAction extends Redux.Action {
    ErrorMsg: string
}

export const ReportSelect = (SelectedReport: string): ReportSelectAction => ({
    type: REPORT_SELECT,
    SelectedReport
})

export const ReportAddUpdate = (Index: number, Report: IReport): ReportAddUpdateAction => ({
    type: REPORT_ADD_UPDATE,
    Index,
    Report
})

export const ReportDelete = (Index: number): ReportDeleteAction => ({
    type: REPORT_DELETE,
    Index
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

export const ReportSetErrorMsg = (ErrorMsg: string): ReportSetErrorMsgAction => ({
    type: REPORT_SET_ERROR_MSG,
    ErrorMsg
})

export const ExportApply = (Report: string, ExportDestination: ExportDestination, Folder?: string, Page?: string): ExportApplyAction => ({
    type: EXPORT_APPLY,
    Report,
    ExportDestination,
    Folder,
    Page
})

export const IPPLogin = (Login: string, Password: string): IPPLoginAction => ({
    type: IPP_LOGIN,
    Login,
    Password
})

export const SetDomainPages = (IPPDomainsPages: IPPDomain[]): SetDomainPagesAction => ({
    type: SET_DOMAIN_PAGES,
    IPPDomainsPages
})

const initialExportState: ExportState = {
    IPPDomainsPages: [],
    Reports: ReportHelper.CreateSystemReports(),
    CurrentReport: "",
    CurrentLiveReports: [],
    ErrorMsg: ""
}

export const ExportReducer: Redux.Reducer<ExportState> = (state: ExportState = initialExportState, action: Redux.Action): ExportState => {
    switch (action.type) {
        case EXPORT_APPLY:
            return state
        case SET_DOMAIN_PAGES: {
            let actionTyped = (<SetDomainPagesAction>action)
            return Object.assign({}, state, { IPPDomainsPages: actionTyped.IPPDomainsPages })
        }
        case REPORT_SELECT:
        return Object.assign({}, state, { CurrentReport: (<ReportSelectAction>action).SelectedReport })
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
    case REPORT_SET_ERROR_MSG: {
        let actionTyped = (<ReportSetErrorMsgAction>action)
        return Object.assign({}, state, { ErrorMsg: actionTyped.ErrorMsg })
    }
    case REPORT_ADD_UPDATE: {
        let Reports: IReport[] = [].concat(state.Reports);

        let actionTypedAddUpdate = (<ReportAddUpdateAction>action)
        if (actionTypedAddUpdate.Index != -1) {  // it exists
            Reports[actionTypedAddUpdate.Index] = actionTypedAddUpdate.Report
        } else {
            Reports.push(actionTypedAddUpdate.Report)
        }
        return Object.assign({}, state, { Reports: Reports, CurrentReport: actionTypedAddUpdate.Report.Name });
    }
    case REPORT_DELETE: {
        let Reports: IReport[] = [].concat(state.Reports);

        let actionTypedDelete = (<ReportDeleteAction>action)
        Reports.splice(actionTypedDelete.Index, 1);
        return Object.assign({}, state, { Reports: Reports, CurrentReport: "" })
    }
        default:
            return state
    }
}