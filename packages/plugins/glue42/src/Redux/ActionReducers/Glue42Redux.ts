import * as Redux from 'redux';
import {
  EMPTY_ARRAY,
  EMPTY_STRING,
} from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import { Glue42Report } from '@adaptabletools/adaptable/src/PredefinedConfig/Glue42State';
import { Glue42State } from '@adaptabletools/adaptable/src/PredefinedConfig/Glue42State';

export const GLUE42_LOGIN = 'GLUE42_LOGIN';
export const GLUE42_SET_LOGIN_ERROR_MESSAGE = 'GLUE42_SET_LOGIN_ERROR_MESSAGE';

export const GLUE42_SET_THROTTLE_TIME = 'GLUE42_SET_THROTTLE_TIME';

export const GLUE42_SEND_SNAPSHOT = 'GLUE42_SEND_SNAPSHOT';

export const GLUE42_START_LIVE_DATA = 'GLUE42_START_LIVE_DATA';
export const GLUE42_STOP_LIVE_DATA = 'GLUE42_STOP_LIVE_DATA';

export const GLUE42_LIVE_REPORT_SET = 'GLUE42_LIVE_REPORT_SET';
export const GLUE42_LIVE_REPORT_CLEAR = 'GLUE42_LIVE_REPORT_CLEAR';

export const SET_GLUE42_AVAILABLE_ON = 'SET_GLUE42_AVAILABLE_ON';
export const SET_GLUE42_AVAILABLE_OFF = 'SET_GLUE42_AVAILABLE_OFF';

export const SET_GLUE42_RUNNING_ON = 'SET_GLUE42_RUNNING_ON';
export const SET_GLUE42_RUNNING_OFF = 'SET_GLUE42_RUNNING_OFF';

export interface Glue42LoginAction extends Redux.Action {
  username: string;
  password: string;
}

export interface Glue42SetLoginErrorMessageAction extends Redux.Action {
  errorMessage: string;
}

export interface Glue42SetThrottleTimeAction extends Redux.Action {
  throttleTime: number;
}

export interface Glue42SendSnapshotAction extends Redux.Action {
  glue42Report: Glue42Report;
}

export interface Glue42StartLiveDataAction extends Redux.Action {
  glue42Report: Glue42Report;
}

export interface Glue42StopLiveDataAction extends Redux.Action {}

export interface Glue42LiveReportSetAction extends Redux.Action {
  glue42Report: Glue42Report;
}
export interface Glue42LiveReportClearAction extends Redux.Action {}

export interface SetGlue42AvailableOnAction extends Redux.Action {}

export interface SetGlue42AvailableOffAction extends Redux.Action {}

export interface SetGlue42RunningOnAction extends Redux.Action {}

export interface SetGlue42RunningOffAction extends Redux.Action {}

export const Glue42Login = (username: string, password: string): Glue42LoginAction => ({
  type: GLUE42_LOGIN,
  username,
  password,
});

export const Glue42SetLoginErrorMessage = (
  errorMessage: string
): Glue42SetLoginErrorMessageAction => ({
  type: GLUE42_SET_LOGIN_ERROR_MESSAGE,
  errorMessage,
});

export const Glue42SetThrottleTime = (throttleTime: number): Glue42SetThrottleTimeAction => ({
  type: GLUE42_SET_THROTTLE_TIME,
  throttleTime,
});

export const Glue42SendSnapshot = (glue42Report: Glue42Report): Glue42SendSnapshotAction => ({
  type: GLUE42_SEND_SNAPSHOT,
  glue42Report,
});

export const Glue42StartLiveData = (glue42Report: Glue42Report): Glue42StartLiveDataAction => ({
  type: GLUE42_START_LIVE_DATA,
  glue42Report,
});

export const Glue42StopLiveData = (): Glue42StopLiveDataAction => ({
  type: GLUE42_STOP_LIVE_DATA,
});

export const Glue42LiveReportSet = (glue42Report: Glue42Report): Glue42LiveReportSetAction => ({
  type: GLUE42_LIVE_REPORT_SET,
  glue42Report,
});

export const Glue42LiveReportClear = (): Glue42LiveReportClearAction => ({
  type: GLUE42_LIVE_REPORT_CLEAR,
});

export const SetGlue42AvailableOn = (): SetGlue42AvailableOnAction => ({
  type: SET_GLUE42_AVAILABLE_ON,
});

export const SetGlue42AvailableOff = (): SetGlue42AvailableOffAction => ({
  type: SET_GLUE42_AVAILABLE_OFF,
});

export const SetGlue42RunningOn = (): SetGlue42RunningOnAction => ({
  type: SET_GLUE42_RUNNING_ON,
});

export const SetGlue42RunningOff = (): SetGlue42RunningOffAction => ({
  type: SET_GLUE42_RUNNING_OFF,
});

const initialFilterState: Glue42State = {
  // Glue42: undefined,
  Glue42LoginErrorMessage: EMPTY_STRING,
  IsGlue42Available: false,
  IsGlue42Running: false,
  CurrentLiveGlue42Report: undefined,
};

export const Glue42Reducer: Redux.Reducer<Glue42State> = (
  state: Glue42State = initialFilterState,
  action: Redux.Action
): Glue42State => {
  switch (action.type) {
    case GLUE42_LOGIN: {
      return { ...state, Glue42LoginErrorMessage: undefined };
    }

    case GLUE42_SET_LOGIN_ERROR_MESSAGE: {
      return {
        ...state,
        Glue42LoginErrorMessage: (action as Glue42SetLoginErrorMessageAction).errorMessage,
      };
    }

    case GLUE42_SET_THROTTLE_TIME: {
      const atctionType = action as Glue42SetThrottleTimeAction;
      return Object.assign({}, state, { ThrottleTime: atctionType.throttleTime });
    }

    case GLUE42_LIVE_REPORT_SET: {
      const atctionType = action as Glue42LiveReportSetAction;
      return Object.assign({}, state, { CurrentLiveGlue42Report: atctionType.glue42Report });
    }

    case GLUE42_LIVE_REPORT_CLEAR: {
      // const atctionType = action as Glue42LiveReportSetAction;
      return Object.assign({}, state, { CurrentLiveGlue42Report: undefined });
    }

    case SET_GLUE42_AVAILABLE_ON:
      return Object.assign({}, state, { IsGlue42Available: true });
    case SET_GLUE42_AVAILABLE_OFF:
      return Object.assign({}, state, { IsGlue42Available: false });
    case SET_GLUE42_RUNNING_ON:
      return Object.assign({}, state, { IsGlue42Running: true });
    case SET_GLUE42_RUNNING_OFF:
      return Object.assign({}, state, { IsGlue42Running: false });

    default:
      return state;
  }
};
