import { ExportState, Report, AutoExport } from '../../PredefinedConfig/ExportState';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import * as Redux from 'redux';
import { EMPTY_STRING, EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const EXPORT_APPLY = 'EXPORT_APPLY';
export const REPORT_SELECT = 'REPORT_SELECT';
export const REPORT_ADD = 'REPORT_ADD';
export const REPORT_EDIT = 'REPORT_EDIT';
export const REPORT_DELETE = 'REPORT_DELETE';
export const IPP_LOGIN = 'IPP_LOGIN';
export const IPP_LOGIN_FAILED = 'IPP_LOGIN_FAILED';

export interface ExportApplyAction extends Redux.Action {
  Report: Report;
  ExportDestination: ExportDestination;
  Folder?: string;
  Page?: string;
  IsLiveReport?: boolean;
}

export interface ReportAction extends Redux.Action {
  report: Report;
}

export interface ReportSelectAction extends Redux.Action {
  SelectedReport: string;
}

export interface ReportAddAction extends ReportAction {}

export interface ReportEditAction extends ReportAction {}

export interface ReportDeleteAction extends ReportAction {}

export interface AutoExportAddUpdateAction extends Redux.Action {
  Index: number;
  AutoExport: AutoExport;
}

export interface AutoExportDeleteAction extends Redux.Action {
  Index: number;
}

export interface IPPLoginAction extends Redux.Action {
  Login: string;
  Password: string;
}

export interface IPPLoginFailedAction extends Redux.Action {
  Message: string;
}

export const ReportSelect = (SelectedReport: string): ReportSelectAction => ({
  type: REPORT_SELECT,
  SelectedReport,
});

export const ReportAdd = (report: Report): ReportAddAction => ({
  type: REPORT_ADD,
  report,
});

export const ReportEdit = (report: Report): ReportEditAction => ({
  type: REPORT_EDIT,
  report,
});

export const ReportDelete = (report: Report): ReportDeleteAction => ({
  type: REPORT_DELETE,
  report,
});

export const ExportApply = (
  Report: Report,
  ExportDestination: ExportDestination,
  Folder?: string,
  Page?: string,
  IsLiveReport?: boolean
): ExportApplyAction => ({
  type: EXPORT_APPLY,
  Report,
  ExportDestination,
  Folder,
  Page,
  IsLiveReport,
});

export const IPPLogin = (Login: string, Password: string): IPPLoginAction => ({
  type: IPP_LOGIN,
  Login,
  Password,
});

export const IPPLoginFailed = (Message: string): IPPLoginFailedAction => ({
  type: IPP_LOGIN_FAILED,
  Message,
});

const initialExportState: ExportState = {
  Reports: EMPTY_ARRAY,
  CurrentReport: EMPTY_STRING,
};

export const ExportReducer: Redux.Reducer<ExportState> = (
  state: ExportState = initialExportState,
  action: Redux.Action
): ExportState => {
  let reports: Report[];

  switch (action.type) {
    case REPORT_SELECT:
      return Object.assign({}, state, {
        CurrentReport: (action as ReportSelectAction).SelectedReport,
      });

    case REPORT_ADD: {
      const actionReport: Report = (action as ReportAction).report;

      if (!actionReport.Uuid) {
        actionReport.Uuid = createUuid();
      }
      reports = [].concat(state.Reports);
      reports.push(actionReport);
      return { ...state, Reports: reports };
    }

    case REPORT_EDIT:
      const actionReport: Report = (action as ReportAction).report;
      return {
        ...state,
        Reports: state.Reports.map(abObject =>
          abObject.Uuid === actionReport.Uuid ? actionReport : abObject
        ),
      };

    case REPORT_DELETE: {
      const actionReport: Report = (action as ReportAction).report;
      return {
        ...state,
        Reports: state.Reports.filter(abObject => abObject.Uuid !== actionReport.Uuid),
      };
    }
    default:
      return state;
  }
};
