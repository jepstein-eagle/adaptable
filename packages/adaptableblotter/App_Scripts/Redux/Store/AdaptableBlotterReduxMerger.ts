import * as _ from 'lodash';
import { ConfigState } from '../../PredefinedConfig/ConfigState';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';

function customizer(objValue: any, srcValue: any) {
  if (_.isArray(objValue)) {
    if (srcValue) {
      return srcValue;
    }
  }
}

export function MergeStateFunction(oldState: any, newState: any) {
  return MergeState(oldState, newState);
}

// main merge function
export function MergeState(oldState: any, newState: any) {
  const result = _.extend({}, oldState);

  for (const key in newState) {
    if (!newState.hasOwnProperty(key)) {
      continue;
    }
    const value = newState[key];

    // Assign if we don't need to merge at all
    if (!result.hasOwnProperty(key)) {
      result[key] = _.isObject(value) && !Array.isArray(value) ? _.merge({}, value) : value;
      continue;
    }

    const oldValue = (<any>result)[key];

    if (_.isObject(value) && !Array.isArray(value)) {
      result[key] = _.mergeWith({}, oldValue, value, customizer);
    } else {
      result[key] = value;
    }
  }
  return result;
}

type TypeReducer = (
  state: AdaptableBlotterState,
  action: { type: string; State?: { [s: string]: ConfigState } }
) => AdaptableBlotterState;

export const mergeReducer = (rootReducer: TypeReducer, LOAD_STATE_TYPE: string): TypeReducer => {
  let finalReducer = rootReducer;

  finalReducer = (
    state: AdaptableBlotterState,
    action: { type: string; State: { [s: string]: ConfigState } }
  ) => {
    if (action.type === LOAD_STATE_TYPE) {
      state = MergeState(state, action.State);

      // put this new state on the action, since the root reducer further copies
      // keys from action.State to the new state
      action.State = state;
    }
    return rootReducer(state, action);
  };

  return finalReducer;
};
