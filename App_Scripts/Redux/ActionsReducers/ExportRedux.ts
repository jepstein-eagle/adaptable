import { ExportState, IPPDomain } from './Interface/IState';
import { ExportDestination } from '../../Core/Enums';
import * as Redux from 'redux'

export const EXPORT = 'EXPORT';
export const IPP_LOGIN = 'IPP_LOGIN';
export const SET_DOMAIN_PAGES = 'SET_DOMAIN_PAGES';

export interface ExportAction extends Redux.Action {
    Range: string;
    ExportDestination: ExportDestination
    Folder?: string
    Page?: string
}

export const Export = (Range: string, ExportDestination: ExportDestination, Folder?: string, Page?: string): ExportAction => ({
    type: EXPORT,
    Range,
    ExportDestination,
    Folder,
    Page
})

export interface SetDomainPagesAction extends Redux.Action {
    IPPDomainsPages: IPPDomain[];
}

export const SetDomainPages = (IPPDomainsPages: IPPDomain[]): SetDomainPagesAction => ({
    type: SET_DOMAIN_PAGES,
    IPPDomainsPages
})


export interface IPPLoginAction extends Redux.Action {
    Login: string;
    Password: string;
}

export const IPPLogin = (Login: string, Password: string): IPPLoginAction => ({
    type: IPP_LOGIN,
    Login,
    Password
})


const initialExportState: ExportState = {
    IPPDomainsPages: []
}

export const ExportReducer: Redux.Reducer<ExportState> = (state: ExportState = initialExportState, action: Redux.Action): ExportState => {
    switch (action.type) {
        case EXPORT:
            return state
        case SET_DOMAIN_PAGES: {
            let actionTyped = (<SetDomainPagesAction>action)
            return Object.assign({}, state, { IPPDomainsPages: actionTyped.IPPDomainsPages })
        }
        default:
            return state
    }
}