import { ExportState } from './Interface/IState';
import { ExportDestination } from '../../Utilities/Enums';
import * as Redux from 'redux';
import { IReport, IAutoExport } from '../../Utilities/Interface/BlotterObjects/IReport';
import { EMPTY_STRING, EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

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

export interface ReportSelectAction extends Redux.Action {
  SelectedReport: string;
}

export interface ReportAddAction extends Redux.Action {
  Report: IReport;
}

export interface ReportEditAction extends Redux.Action {
  Index: number;
  Report: IReport;
}

export interface ReportDeleteAction extends Redux.Action {
  Index: number;
  Report: IReport;
}

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

export const ReportAdd = (Report: IReport): ReportAddAction => ({
  type: REPORT_ADD,
  Report,
});

export const ReportEdit = (Index: number, Report: IReport): ReportEditAction => ({
  type: REPORT_EDIT,
  Index,
  Report,
});

export const ReportDelete = (Index: number, Report: IReport): ReportDeleteAction => ({
  type: REPORT_DELETE,
  Index,
  Report,
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
  switch (action.type) {
    case REPORT_SELECT:
      return Object.assign({}, state, {
        CurrentReport: (<ReportSelectAction>action).SelectedReport,
      });
    case REPORT_ADD: {
      let Reports: IReport[] = [].concat(state.Reports);
      let actionTypedAddUpdate = <ReportAddAction>action;
      Reports.push(actionTypedAddUpdate.Report);
      return Object.assign({}, state, {
        Reports: Reports,
        CurrentReport: actionTypedAddUpdate.Report.Name,
      });
    }
    case REPORT_EDIT: {
      let Reports: IReport[] = [].concat(state.Reports);
      let actionTypedAddUpdate = <ReportEditAction>action;
      Reports[actionTypedAddUpdate.Index] = actionTypedAddUpdate.Report;
      return Object.assign({}, state, {
        Reports: Reports,
        CurrentReport: actionTypedAddUpdate.Report.Name,
      });
    }
    case REPORT_DELETE: {
      let Reports: IReport[] = [].concat(state.Reports);
      let actionTypedDelete = <ReportDeleteAction>action;
      Reports.splice(actionTypedDelete.Index, 1);
      return Object.assign({}, state, { Reports: Reports, CurrentReport: '' });
    }

    default:
      return state;
  }
};
