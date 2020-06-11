import * as Redux from 'redux';
import {
  EMPTY_ARRAY,
  EMPTY_STRING,
} from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import { OpenFinReport } from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';
import { OpenFinState } from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';

export const OPENFIN_START_LIVE_DATA = 'OPENFIN_START_LIVE_DATA';
export const OPENFIN_STOP_LIVE_DATA = 'OPENFIN_STOP_LIVE_DATA';

export const OPENFIN_LIVE_REPORT_SET = 'OPENFIN_LIVE_REPORT_SET';
export const OPENFIN_LIVE_REPORT_CLEAR = 'OPENFIN_LIVE_REPORT_CLEAR';

export const SET_OPENFIN_AVAILABLE_ON = 'SET_OPENFIN_AVAILABLE_ON';
export const SET_OPENFIN_AVAILABLE_OFF = 'SET_OPENFIN_AVAILABLE_OFF';

export const SET_OPENFIN_RUNNING_ON = 'SET_OPENFIN_RUNNING_ON';
export const SET_OPENFIN_RUNNING_OFF = 'SET_OPENFIN_RUNNING_OFF';

export interface OpenFinLoginAction extends Redux.Action {
  username: string;
  password: string;
}

export interface OpenFinSetLoginErrorMessageAction extends Redux.Action {
  errorMessage: string;
}

export interface OpenFinSetThrottleTimeAction extends Redux.Action {
  throttleTime: number;
}

export interface OpenFinSendSnapshotAction extends Redux.Action {
  glue42Report: OpenFinReport;
}

export interface OpenFinStartLiveDataAction extends Redux.Action {
  openFinReport: OpenFinReport;
}

export interface OpenFinStopLiveDataAction extends Redux.Action {}

export interface OpenFinLiveReportSetAction extends Redux.Action {
  openFinReport: OpenFinReport;
}
export interface OpenFinLiveReportClearAction extends Redux.Action {}

export interface SetOpenFinAvailableOnAction extends Redux.Action {}

export interface SetOpenFinAvailableOffAction extends Redux.Action {}

export interface SetOpenFinRunningOnAction extends Redux.Action {}

export interface SetOpenFinRunningOffAction extends Redux.Action {}

export const OpenFinStartLiveData = (openFinReport: OpenFinReport): OpenFinStartLiveDataAction => ({
  type: OPENFIN_START_LIVE_DATA,
  openFinReport: openFinReport,
});

export const OpenFinStopLiveData = (): OpenFinStopLiveDataAction => ({
  type: OPENFIN_STOP_LIVE_DATA,
});

export const OpenFinLiveReportSet = (openFinReport: OpenFinReport): OpenFinLiveReportSetAction => ({
  type: OPENFIN_LIVE_REPORT_SET,
  openFinReport: openFinReport,
});

export const OpenFinLiveReportClear = (): OpenFinLiveReportClearAction => ({
  type: OPENFIN_LIVE_REPORT_CLEAR,
});

export const SetOpenFinAvailableOn = (): SetOpenFinAvailableOnAction => ({
  type: SET_OPENFIN_AVAILABLE_ON,
});

export const SetOpenFinAvailableOff = (): SetOpenFinAvailableOffAction => ({
  type: SET_OPENFIN_AVAILABLE_OFF,
});

export const SetOpenFinRunningOn = (): SetOpenFinRunningOnAction => ({
  type: SET_OPENFIN_RUNNING_ON,
});

export const SetOpenFinRunningOff = (): SetOpenFinRunningOffAction => ({
  type: SET_OPENFIN_RUNNING_OFF,
});

const initialOpenFinState: OpenFinState = {
  // OpenFin: undefined,

  IsOpenFinRunning: false,
  CurrentLiveOpenFinReport: undefined,
};

export const OpenFinReducer: Redux.Reducer<OpenFinState> = (
  state: OpenFinState = initialOpenFinState,
  action: Redux.Action
): OpenFinState => {
  switch (action.type) {
    case OPENFIN_LIVE_REPORT_SET: {
      const actionType = action as OpenFinLiveReportSetAction;
      return Object.assign({}, state, { CurrentLiveOpenFinReport: actionType.openFinReport });
    }

    case OPENFIN_LIVE_REPORT_CLEAR: {
      // const atctionType = action as OpenFinLiveReportSetAction;
      return Object.assign({}, state, { CurrentLiveOpenFinReport: undefined });
    }

    case SET_OPENFIN_RUNNING_ON:
      return Object.assign({}, state, { IsOpenFinRunning: true });
    case SET_OPENFIN_RUNNING_OFF:
      return Object.assign({}, state, { IsOpenFinRunning: false });

    default:
      return state;
  }
};
