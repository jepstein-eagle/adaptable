import * as Redux from 'redux';
import { PartnerState } from '../../PredefinedConfig/PartnerState';

export const IPUSHPULL_SET_THROTTLE_TIME = 'IPUSHPULL_SET_THROTTLE_TIME';
export const GLUE42_SET_THROTTLE_TIME = 'GLUE42_SET_THROTTLE_TIME';

export interface IPushPullSetThrottleTimeAction extends Redux.Action {
  throttleTime: number;
}

export interface Glue42SetThrottleTimeAction extends Redux.Action {
  throttleTime: number;
}

export const IPushPullSetThrottleTime = (throttleTime: number): IPushPullSetThrottleTimeAction => ({
  type: IPUSHPULL_SET_THROTTLE_TIME,
  throttleTime,
});

export const Glue42SetThrottleTime = (throttleTime: number): Glue42SetThrottleTimeAction => ({
  type: GLUE42_SET_THROTTLE_TIME,
  throttleTime,
});

const initialFilterState: PartnerState = {
  iPushPull: undefined,
  Glue42: undefined,
};

export const PartnerReducer: Redux.Reducer<PartnerState> = (
  state: PartnerState = initialFilterState,
  action: Redux.Action
): PartnerState => {
  switch (action.type) {
    case IPUSHPULL_SET_THROTTLE_TIME: {
      if (state.iPushPull) {
        const atctionType = action as IPushPullSetThrottleTimeAction;
        let iPushPullState = state.iPushPull;
        iPushPullState.ThrottleTime = atctionType.throttleTime;
        return Object.assign({}, state, { iPushPull: iPushPullState });
      } else {
        return state;
      }
    }
    case GLUE42_SET_THROTTLE_TIME: {
      if (state.Glue42) {
        const atctionType = action as Glue42SetThrottleTimeAction;
        let glue42State = state.Glue42;
        glue42State.ThrottleTime = atctionType.throttleTime;
        return Object.assign({}, state, { Glue42: glue42State });
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};
