import { ExportState } from './Interface/IState';
import { ExportDestination } from '../../Utilities/Enums';
import * as Redux from 'redux';
import { IReport, IAutoExport } from '../../Utilities/Interface/BlotterObjects/IReport';
import { EMPTY_STRING, EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../Utilities/Uuid';

export const EXPORT_APPLY = 'EXPORT_APPLY';
export const REPORT_SELECT = 'REPORT_SELECT';
export const REPORT_ADD = 'REPORT_ADD';
export const REPORT_EDIT = 'REPORT_EDIT';
export const REPORT_DELETE = 'REPORT_DELETE';
export const IPP_LOGIN = 'IPP_LOGIN';

export interface ExportApplyAction extends Redux.Action {
  Report: string;
  ExportDestination: ExportDestination;
  Folder?: string;
  Page?: string;
}

export interface ReportAction extends Redux.Action {
  report: IReport;
}

export interface ReportSelectAction extends Redux.Action {
  SelectedReport: string;
}

export interface ReportAddAction extends ReportAction {}

export interface ReportEditAction extends ReportAction {}

export interface ReportDeleteAction extends ReportAction {}

export interface AutoExportAddUpdateAction extends Redux.Action {
  Index: number;
  AutoExport: IAutoExport;
}

export interface AutoExportDeleteAction extends Redux.Action {
  Index: number;
}

export interface IPPLoginAction extends Redux.Action {
  Login: string;
  Password: string;
}

export const ReportSelect = (SelectedReport: string): ReportSelectAction => ({
  type: REPORT_SELECT,
  SelectedReport,
});

export const ReportAdd = (report: IReport): ReportAddAction => ({
  type: REPORT_ADD,
  report,
});

export const ReportEdit = (report: IReport): ReportEditAction => ({
  type: REPORT_EDIT,
  report,
});

export const ReportDelete = (report: IReport): ReportDeleteAction => ({
  type: REPORT_DELETE,
  report,
});

export const ExportApply = (
  Report: string,
  ExportDestination: ExportDestination,
  Folder?: string,
  Page?: string
): ExportApplyAction => ({
  type: EXPORT_APPLY,
  Report,
  ExportDestination,
  Folder,
  Page,
});

export const IPPLogin = (Login: string, Password: string): IPPLoginAction => ({
  type: IPP_LOGIN,
  Login,
  Password,
});

const initialExportState: ExportState = {
  Reports: EMPTY_ARRAY,
  CurrentReport: EMPTY_STRING,
};

export const ExportReducer: Redux.Reducer<ExportState> = (
  state: ExportState = initialExportState,
  action: Redux.Action
): ExportState => {
  let reports: IReport[];

  switch (action.type) {
    case REPORT_SELECT:
      return Object.assign({}, state, {
        CurrentReport: (<ReportSelectAction>action).SelectedReport,
      });

    case REPORT_ADD: {
      const actionReport: IReport = (action as ReportAction).report;

      if (!actionReport.Uuid) {
        actionReport.Uuid = createUuid();
      }
      reports = [].concat(state.Reports);
      reports.push(actionReport);
      return { ...state, Reports: reports };
    }

    case REPORT_EDIT:
      const actionReport: IReport = (action as ReportAction).report;
      return {
        ...state,
        Reports: state.Reports.map(abObject =>
          abObject.Uuid === actionReport.Uuid ? actionReport : abObject
        ),
      };

    case REPORT_DELETE: {
      const actionReport: IReport = (action as ReportAction).report;
      return {
        ...state,
        Reports: state.Reports.filter(abObject => abObject.Uuid !== actionReport.Uuid),
      };
    }
    default:
      return state;
  }
};
