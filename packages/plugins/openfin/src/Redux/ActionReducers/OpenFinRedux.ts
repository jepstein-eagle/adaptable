import * as Redux from 'redux';
import {
  EMPTY_ARRAY,
  EMPTY_STRING,
} from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import { OpenFinReport } from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';
import { OpenFinState } from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';

export const OPENFIN_LOGIN = 'OPENFIN_LOGIN';
export const OPENFIN_SET_LOGIN_ERROR_MESSAGE = 'OPENFIN_SET_LOGIN_ERROR_MESSAGE';

export const OPENFIN_SET_THROTTLE_TIME = 'OPENFIN_SET_THROTTLE_TIME';

export const OPENFIN_SEND_SNAPSHOT = 'OPENFIN_SEND_SNAPSHOT';

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
  glue42Report: OpenFinReport;
}

export interface OpenFinStopLiveDataAction extends Redux.Action {}

export interface OpenFinLiveReportSetAction extends Redux.Action {
  glue42Report: OpenFinReport;
}
export interface OpenFinLiveReportClearAction extends Redux.Action {}

export interface SetOpenFinAvailableOnAction extends Redux.Action {}

export interface SetOpenFinAvailableOffAction extends Redux.Action {}

export interface SetOpenFinRunningOnAction extends Redux.Action {}

export interface SetOpenFinRunningOffAction extends Redux.Action {}

export const OpenFinLogin = (username: string, password: string): OpenFinLoginAction => ({
  type: OPENFIN_LOGIN,
  username,
  password,
});

export const OpenFinSetLoginErrorMessage = (
  errorMessage: string
): OpenFinSetLoginErrorMessageAction => ({
  type: OPENFIN_SET_LOGIN_ERROR_MESSAGE,
  errorMessage,
});

export const OpenFinSetThrottleTime = (throttleTime: number): OpenFinSetThrottleTimeAction => ({
  type: OPENFIN_SET_THROTTLE_TIME,
  throttleTime,
});

export const OpenFinSendSnapshot = (glue42Report: OpenFinReport): OpenFinSendSnapshotAction => ({
  type: OPENFIN_SEND_SNAPSHOT,
  glue42Report,
});

export const OpenFinStartLiveData = (glue42Report: OpenFinReport): OpenFinStartLiveDataAction => ({
  type: OPENFIN_START_LIVE_DATA,
  glue42Report,
});

export const OpenFinStopLiveData = (): OpenFinStopLiveDataAction => ({
  type: OPENFIN_STOP_LIVE_DATA,
});

export const OpenFinLiveReportSet = (glue42Report: OpenFinReport): OpenFinLiveReportSetAction => ({
  type: OPENFIN_LIVE_REPORT_SET,
  glue42Report,
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

const initialFilterState: OpenFinState = {
  // OpenFin: undefined,
  OpenFinLoginErrorMessage: EMPTY_STRING,
  OpenFinSchedules: EMPTY_ARRAY,
  IsOpenFinAvailable: false,
  IsOpenFinRunning: false,
  CurrentLiveOpenFinReport: undefined,
};

export const OpenFinReducer: Redux.Reducer<OpenFinState> = (
  state: OpenFinState = initialFilterState,
  action: Redux.Action
): OpenFinState => {
  switch (action.type) {
    case OPENFIN_LOGIN: {
      return { ...state, OpenFinLoginErrorMessage: undefined };
    }

    case OPENFIN_SET_LOGIN_ERROR_MESSAGE: {
      return {
        ...state,
        OpenFinLoginErrorMessage: (action as OpenFinSetLoginErrorMessageAction).errorMessage,
      };
    }

    case OPENFIN_SET_THROTTLE_TIME: {
      const atctionType = action as OpenFinSetThrottleTimeAction;
      return Object.assign({}, state, { ThrottleTime: atctionType.throttleTime });
    }

    case OPENFIN_LIVE_REPORT_SET: {
      const atctionType = action as OpenFinLiveReportSetAction;
      return Object.assign({}, state, { CurrentLiveOpenFinReport: atctionType.glue42Report });
    }

    case OPENFIN_LIVE_REPORT_CLEAR: {
      // const atctionType = action as OpenFinLiveReportSetAction;
      return Object.assign({}, state, { CurrentLiveOpenFinReport: undefined });
    }

    case SET_OPENFIN_AVAILABLE_ON:
      return Object.assign({}, state, { IsOpenFinAvailable: true });
    case SET_OPENFIN_AVAILABLE_OFF:
      return Object.assign({}, state, { IsOpenFinAvailable: false });
    case SET_OPENFIN_RUNNING_ON:
      return Object.assign({}, state, { IsOpenFinRunning: true });
    case SET_OPENFIN_RUNNING_OFF:
      return Object.assign({}, state, { IsOpenFinRunning: false });

    default:
      return state;
  }
};
