import * as Redux from 'redux';
import { Glue42State } from '../../PredefinedConfig/Glue42State';

export const GLUE42_SET_THROTTLE_TIME = 'GLUE42_SET_THROTTLE_TIME';

export interface Glue42SetThrottleTimeAction extends Redux.Action {
  throttleTime: number;
}

export const Glue42SetThrottleTime = (throttleTime: number): Glue42SetThrottleTimeAction => ({
  type: GLUE42_SET_THROTTLE_TIME,
  throttleTime,
});

const initialFilterState: Glue42State = {
  // Glue42: undefined,
};

export const Glue42Reducer: Redux.Reducer<Glue42State> = (
  state: Glue42State = initialFilterState,
  action: Redux.Action
): Glue42State => {
  switch (action.type) {
    case GLUE42_SET_THROTTLE_TIME: {
      const atctionType = action as Glue42SetThrottleTimeAction;
      return Object.assign({}, state, { ThrottleTime: atctionType.throttleTime });
    }
    default:
      return state;
  }
};
