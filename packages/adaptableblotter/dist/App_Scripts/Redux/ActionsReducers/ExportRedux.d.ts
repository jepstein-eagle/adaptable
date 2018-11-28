import { ExportState } from './Interface/IState';
import { IPPDomain } from '../../Strategy/Interface/IExportStrategy';
import { ExportDestination } from '../../Core/Enums';
import * as Redux from 'redux';
import { IReport } from '../../Api/Interface/IAdaptableBlotterObjects';
export declare const EXPORT_APPLY = "EXPORT_APPLY";
export declare const IPP_LOGIN = "IPP_LOGIN";
export declare const SET_DOMAIN_PAGES = "SET_DOMAIN_PAGES";
export declare const REPORT_SELECT = "REPORT_SELECT";
export declare const REPORT_ADD_UPDATE = "REPORT_ADD_UPDATE";
export declare const REPORT_DELETE = "REPORT_DELETE";
export declare const REPORT_SET_ERROR_MSG = "REPORT_SET_ERROR_MSG";
export interface ExportApplyAction extends Redux.Action {
    Report: string;
    ExportDestination: ExportDestination;
    Folder?: string;
    Page?: string;
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
    Index: number;
    Report: IReport;
}
export interface ReportDeleteAction extends Redux.Action {
    Index: number;
}
export interface ReportSetErrorMsgAction extends Redux.Action {
    ErrorMsg: string;
}
export declare const ReportSelect: (SelectedReport: string) => ReportSelectAction;
export declare const ReportAddUpdate: (Index: number, Report: IReport) => ReportAddUpdateAction;
export declare const ReportDelete: (Index: number) => ReportDeleteAction;
export declare const ReportSetErrorMsg: (ErrorMsg: string) => ReportSetErrorMsgAction;
export declare const ExportApply: (Report: string, ExportDestination: ExportDestination, Folder?: string, Page?: string) => ExportApplyAction;
export declare const IPPLogin: (Login: string, Password: string) => IPPLoginAction;
export declare const SetDomainPages: (IPPDomainsPages: IPPDomain[]) => SetDomainPagesAction;
export declare const ExportReducer: Redux.Reducer<ExportState>;
