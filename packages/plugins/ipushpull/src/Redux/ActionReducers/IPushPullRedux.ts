import * as Redux from 'redux';

import { EMPTY_ARRAY } from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';

import { IPushPullReport } from '@adaptabletools/adaptable/src/PredefinedConfig/IPushPullState';
import { IPushPullDomain } from '@adaptabletools/adaptable/src/PredefinedConfig/IPushPullState';
import { IPushPullState } from '@adaptabletools/adaptable/src/PredefinedConfig/IPushPullState';

export const IPUSHPULL_SET_THROTTLE_TIME = 'IPUSHPULL_SET_THROTTLE_TIME';
export const IPUSHPULL_SEND_SNAPSHOT = 'IPUSHPULL_SEND_SNAPSHOT';
export const IPUSHPULL_REPORT_SELECT = 'IPUSHPULL_REPORT_SELECT';

export const IPUSHPULL_START_LIVE_DATA = 'IPUSHPULL_START_LIVE_DATA';
export const IPUSHPULL_STOP_LIVE_DATA = 'IPUSHPULL_STOP_LIVE_DATA';

export const IPUSHPULL_ADD_PAGE = 'IPUSHPULL_ADD_PAGE';

export const IPUSHPULL_LOGIN = 'IPUSHPULL_LOGIN';
export const IPUSHPULL_LOGOUT = 'IPUSHPULL_LOGOUT';
export const IPUSHPULL_SET_LOGIN_ERROR_MESSAGE = 'IPUSHPULL_SET_LOGIN_ERROR_MESSAGE';
export const IPUSHPULL_SET_LOGIN_DETAILS = 'IPUSHPULL_SET_LOGIN_DETAILS';

export const SET_IPUSHPULL_AVAILABLE_ON = 'SET_IPUSHPULL_AVAILABLE_ON';
export const SET_IPUSHPULL_AVAILABLE_OFF = 'SET_IPUSHPULL_AVAILABLE_OFF';
export const SET_IPUSHPULL_RUNNING_ON = 'SET_IPUSHPULL_RUNNING_ON';
export const SET_IPUSHPULL_RUNNING_OFF = 'SET_IPUSHPULL_RUNNING_OFF';

export const IPUSHPULL_LIVE_REPORT_SET = 'IPUSHPULL_LIVE_REPORT_SET';
export const IPUSHPULL_LIVE_REPORT_CLEAR = 'IPUSHPULL_LIVE_REPORT_CLEAR';

export const IPUSHPULL_DOMAIN_PAGES_SET = 'IPUSHPULL_DOMAIN_PAGES_SET';
export const IPUSHPULL_DOMAIN_PAGES_CLEAR = 'IPUSHPULL_DOMAIN_PAGES_CLEAR';

export interface IPushPullSetThrottleTimeAction extends Redux.Action {
  throttleTime: number;
}

export interface IPushPullSendSnapshotAction extends Redux.Action {
  iPushPullReport: IPushPullReport;
}
export interface IPushPullStartLiveDataAction extends Redux.Action {
  iPushPullReport: IPushPullReport;
}

export interface IPushPullStopLiveDataAction extends Redux.Action {}

export interface IPushPullLoginAction extends Redux.Action {
  username: string;
  password: string;
}
export interface IPushPullLogoutAction extends Redux.Action {}

export interface IPushPullSetLoginDetailsAction extends Redux.Action {
  username: string;
  password: string;
}

export interface IPushPullSetLoginErrorMessageAction extends Redux.Action {
  errorMessage: string;
}

export interface IPushPullAddPageAction extends Redux.Action {
  folder: string;
  page: string;
}

export interface SetIPushPullAvailableOnAction extends Redux.Action {}

export interface SetIPushPullAvailableOffAction extends Redux.Action {}

export interface SetIPushPullRunningOnAction extends Redux.Action {}
export interface SetIPushPullRunningOffAction extends Redux.Action {}

export interface IPushPullDomainsPagesSetAction extends Redux.Action {
  IPushPullDomainsPages: IPushPullDomain[];
}

export interface IPushPullDomainsPagesClearAction extends Redux.Action {}

export interface IPushPullLiveReportSetAction extends Redux.Action {
  iPushPullReport: IPushPullReport;
}
export interface IPushPullLiveReportClearAction extends Redux.Action {}

export const IPushPullSetThrottleTime = (throttleTime: number): IPushPullSetThrottleTimeAction => ({
  type: IPUSHPULL_SET_THROTTLE_TIME,
  throttleTime,
});

export const IPushPullSendSnapshot = (
  iPushPullReport: IPushPullReport
): IPushPullSendSnapshotAction => ({
  type: IPUSHPULL_SEND_SNAPSHOT,
  iPushPullReport,
});

export const IPushPullStartLiveData = (
  iPushPullReport: IPushPullReport
): IPushPullStartLiveDataAction => ({
  type: IPUSHPULL_START_LIVE_DATA,
  iPushPullReport,
});

export const IPushPullStopLiveData = (): IPushPullStopLiveDataAction => ({
  type: IPUSHPULL_STOP_LIVE_DATA,
});

export const IPushPullLogin = (username: string, password: string): IPushPullLoginAction => ({
  type: IPUSHPULL_LOGIN,
  username,
  password,
});

export const IPushPullLogout = (): IPushPullLogoutAction => ({
  type: IPUSHPULL_LOGOUT,
});

export const IPushPullSetLoginDetails = (
  username: string,
  password: string
): IPushPullSetLoginDetailsAction => ({
  type: IPUSHPULL_SET_LOGIN_DETAILS,
  username,
  password,
});

export const IPushPullSetLoginErrorMessage = (
  errorMessage: string
): IPushPullSetLoginErrorMessageAction => ({
  type: IPUSHPULL_SET_LOGIN_ERROR_MESSAGE,
  errorMessage,
});

export const IPushPullAddPage = (folder: string, page: string): IPushPullAddPageAction => ({
  type: IPUSHPULL_ADD_PAGE,
  folder,
  page,
});

export const SetIPushPullAvailableOn = (): SetIPushPullAvailableOnAction => ({
  type: SET_IPUSHPULL_AVAILABLE_ON,
});

export const SetIPushPullAvailableOff = (): SetIPushPullAvailableOffAction => ({
  type: SET_IPUSHPULL_AVAILABLE_OFF,
});

export const SetIPushPullRunningOn = (): SetIPushPullRunningOnAction => ({
  type: SET_IPUSHPULL_RUNNING_ON,
});

export const SetIPushPullRunningOff = (): SetIPushPullRunningOffAction => ({
  type: SET_IPUSHPULL_RUNNING_OFF,
});

export const IPushPullSetDomainsPages = (
  IPushPullDomainsPages: IPushPullDomain[]
): IPushPullDomainsPagesSetAction => {
  return {
    type: IPUSHPULL_DOMAIN_PAGES_SET,
    IPushPullDomainsPages,
  };
};
export const IPushPullClearDomainsPages = (): IPushPullDomainsPagesClearAction => {
  return {
    type: IPUSHPULL_DOMAIN_PAGES_CLEAR,
  };
};

export const IPushPullLiveReportSet = (
  iPushPullReport: IPushPullReport
): IPushPullLiveReportSetAction => ({
  type: IPUSHPULL_LIVE_REPORT_SET,
  iPushPullReport,
});

export const IPushPullLiveReportClear = (): IPushPullLiveReportClearAction => ({
  type: IPUSHPULL_LIVE_REPORT_CLEAR,
});

const initialFilterState: IPushPullState = {
  IsIPushPullRunning: false,
  IPushPullDomainsPages: EMPTY_ARRAY,
  CurrentLiveIPushPullReport: undefined,
  IPushPullLoginErrorMessage: undefined,
};

export const IPushPullReducer: Redux.Reducer<IPushPullState> = (
  state: IPushPullState = initialFilterState,
  action: Redux.Action
): IPushPullState => {
  switch (action.type) {
    case SET_IPUSHPULL_AVAILABLE_ON:
      return Object.assign({}, state, { IsIPushPullAvailable: true });
    case SET_IPUSHPULL_AVAILABLE_OFF:
      return Object.assign({}, state, { IsIPushPullAvailable: false });

    case SET_IPUSHPULL_RUNNING_ON:
      return Object.assign({}, state, { IsIPushPullRunning: true });
    case SET_IPUSHPULL_RUNNING_OFF:
      return Object.assign({}, state, { IsIPushPullRunning: false });

    case IPUSHPULL_SET_LOGIN_DETAILS: {
      let loginAction: IPushPullSetLoginDetailsAction = action as IPushPullSetLoginDetailsAction;
      return {
        ...state,
        CurrentIPushpullUsername: loginAction.username,
        CurrentIPushpullPassword: loginAction.password,
      };
    }
    case IPUSHPULL_LOGOUT: {
      return {
        ...state,
        CurrentIPushpullUsername: undefined,
        CurrentIPushpullPassword: undefined,
      };
    }
    case IPUSHPULL_SET_LOGIN_ERROR_MESSAGE: {
      return {
        ...state,
        IPushPullLoginErrorMessage: (action as IPushPullSetLoginErrorMessageAction).errorMessage,
      };
    }
    case IPUSHPULL_DOMAIN_PAGES_SET: {
      return Object.assign({}, state, {
        IPushPullDomainsPages:
          (action as IPushPullDomainsPagesSetAction).IPushPullDomainsPages || [],
      });
    }

    case IPUSHPULL_DOMAIN_PAGES_CLEAR: {
      return Object.assign({}, state, {
        IPushPullDomainsPages: [],
      });
    }

    case IPUSHPULL_LIVE_REPORT_SET: {
      const atctionType = action as IPushPullLiveReportSetAction;
      return Object.assign({}, state, { CurrentLiveIPushPullReport: atctionType.iPushPullReport });
    }

    case IPUSHPULL_LIVE_REPORT_CLEAR: {
      // const atctionType = action as IPushPullLiveReportSetAction;
      return Object.assign({}, state, { CurrentLiveIPushPullReport: undefined });
    }

    default:
      return state;
  }
};
