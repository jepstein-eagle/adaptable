import * as Redux from 'redux';
import { IPushPullState, IPushPullReport } from '../../PredefinedConfig/IPushPullState';
import { Report } from '../../PredefinedConfig/ExportState';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { ReportSelectAction } from './ExportRedux';

export const IPUSHPULL_SET_THROTTLE_TIME = 'IPUSHPULL_SET_THROTTLE_TIME';
export const IPUSHPULL_EXPORT = 'IPUSHPULL_EXPORT';
export const IPUSHPULL_REPORT_SELECT = 'IPUSHPULL_REPORT_SELECT';
export const IPUSHPULL_REPORT_ADD = 'IPUSHPULL_REPORT_ADD';
export const IPUSHPULL_REPORT_EDIT = 'IPUSHPULL_REPORT_EDIT';
export const IPUSHPULL_REPORT_DELETE = 'IPUSHPULL_REPORT_DELETE';

export const IPP_LOGIN = 'IPP_LOGIN';
export const IPP_LOGIN_FAILED = 'IPP_LOGIN_FAILED';

export interface IPushPullSetThrottleTimeAction extends Redux.Action {
  throttleTime: number;
}

export interface IPushPullReportAction extends Redux.Action {
  iPushPullReport: IPushPullReport;
}

export interface IPushPullReportSelectAction extends Redux.Action {
  SelectedReport: string;
}

export interface IPushPullReportAddAction extends IPushPullReportAction {}

export interface IPushPullReportEditAction extends IPushPullReportAction {}

export interface IPushPullReportDeleteAction extends IPushPullReportAction {}

export interface IPushPullExportAction extends Redux.Action {
  iPushPullReport: IPushPullReport;
  isLiveReport: boolean;
}

export interface IPPLoginAction extends Redux.Action {
  username: string;
  password: string;
}

export interface IPPLoginFailedAction extends Redux.Action {
  Message: string;
}

export const IPushPullSetThrottleTime = (throttleTime: number): IPushPullSetThrottleTimeAction => ({
  type: IPUSHPULL_SET_THROTTLE_TIME,
  throttleTime,
});

export const IPushPullExport = (
  iPushPullReport: IPushPullReport,
  isLiveReport: boolean
): IPushPullExportAction => ({
  type: IPUSHPULL_EXPORT,
  iPushPullReport,
  isLiveReport,
});

export const IPushPullReportSelect = (SelectedReport: string): IPushPullReportSelectAction => ({
  type: IPUSHPULL_REPORT_SELECT,
  SelectedReport,
});

export const IPushPullReportAdd = (iPushPullReport: IPushPullReport): IPushPullReportAddAction => ({
  type: IPUSHPULL_REPORT_ADD,
  iPushPullReport,
});

export const IPushPullReportEdit = (
  iPushPullReport: IPushPullReport
): IPushPullReportEditAction => ({
  type: IPUSHPULL_REPORT_EDIT,
  iPushPullReport,
});

export const IPushPullReportDelete = (
  iPushPullReport: IPushPullReport
): IPushPullReportDeleteAction => ({
  type: IPUSHPULL_REPORT_DELETE,
  iPushPullReport,
});

export const IPPLogin = (username: string, password: string): IPPLoginAction => ({
  type: IPP_LOGIN,
  username,
  password,
});

export const IPPLoginFailed = (Message: string): IPPLoginFailedAction => ({
  type: IPP_LOGIN_FAILED,
  Message,
});

const initialFilterState: IPushPullState = {
  IPushPullReports: EMPTY_ARRAY,
  CurrentIPushPullReport: EMPTY_STRING,
};

export const IPushPullReducer: Redux.Reducer<IPushPullState> = (
  state: IPushPullState = initialFilterState,
  action: Redux.Action
): IPushPullState => {
  switch (action.type) {
    case IPUSHPULL_SET_THROTTLE_TIME: {
      const atctionType = action as IPushPullSetThrottleTimeAction;
      return Object.assign({}, state, { ThrottleTime: atctionType.throttleTime });
    }

    case IPUSHPULL_REPORT_SELECT:
      return Object.assign({}, state, {
        CurrentIPushPullReport: (action as ReportSelectAction).SelectedReport,
      });

    case IPUSHPULL_REPORT_ADD: {
      let reports: IPushPullReport[];
      const actionReport: IPushPullReport = (action as IPushPullReportAction).iPushPullReport;

      if (!actionReport.Uuid) {
        actionReport.Uuid = createUuid();
      }
      reports = [].concat(state.IPushPullReports);
      reports.push(actionReport);
      return { ...state, IPushPullReports: reports };
    }

    case IPUSHPULL_REPORT_EDIT:
      const actionReport: IPushPullReport = (action as IPushPullReportAction).iPushPullReport;
      return {
        ...state,
        IPushPullReports: state.IPushPullReports.map(abObject =>
          abObject.Uuid === actionReport.Uuid ? actionReport : abObject
        ),
      };

    case IPUSHPULL_REPORT_DELETE: {
      const actionReport: IPushPullReport = (action as IPushPullReportAction).iPushPullReport;
      return {
        ...state,
        IPushPullReports: state.IPushPullReports.filter(
          abObject => abObject.Uuid !== actionReport.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
