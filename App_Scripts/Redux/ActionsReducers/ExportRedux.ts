import { ExportState } from './Interface/IState';
import { IPPDomain } from '../../Strategy/Interface/IExportStrategy'
import { ExportDestination } from '../../Core/Enums';
import * as Redux from 'redux'

export const EXPORT_APPLY = 'EXPORT_APPLY';
export const IPP_LOGIN = 'IPP_LOGIN';
export const SET_DOMAIN_PAGES = 'SET_DOMAIN_PAGES';

export interface ExportApplyAction extends Redux.Action {
    Range: string;
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

export const ExportApply = (Range: string, ExportDestination: ExportDestination, Folder?: string, Page?: string): ExportApplyAction => ({
    type: EXPORT_APPLY,
    Range,
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
    IPPDomainsPages: []
}

export const ExportReducer: Redux.Reducer<ExportState> = (state: ExportState = initialExportState, action: Redux.Action): ExportState => {
    switch (action.type) {
        case EXPORT_APPLY:
            return state
        case SET_DOMAIN_PAGES: {
            let actionTyped = (<SetDomainPagesAction>action)
            return Object.assign({}, state, { IPPDomainsPages: actionTyped.IPPDomainsPages })
        }
        default:
            return state
    }
}