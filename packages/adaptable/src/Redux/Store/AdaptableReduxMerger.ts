import mergeWith from 'lodash-es/mergeWith';
import merge from 'lodash-es/merge';
import isArray from 'lodash-es/isArray';
import extend from 'lodash-es/extend';
import isObject from 'lodash-es/isObject';

import { ConfigState } from '../../PredefinedConfig/ConfigState';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';

function customizer(objValue: any, srcValue: any): any {
  if (isArray(objValue)) {
    if (!Array.isArray(srcValue)) {
      /**
       * the new value might be a function: eg: UserInterface.ContextMenuItems defaults to an array
       * in the redux state, while the user might provide a function
       * so in this case, make the user provided value win
       */
      return srcValue;
    }
    const length = srcValue ? srcValue.length : null;
    const result: any = mergeWith(objValue, srcValue, customizer);

    if (length != null) {
      // when merging arrays, lodash result has the length of the
      // longest array, but we don't want that to happen
      // so we restrict to the current length
      result.length = length;
    }

    return result;
  }
}

export function MergeStateFunction(oldState: any, newState: any) {
  // return MergeState(oldState, newState);

  if (newState === '') {
    newState = {};
  }
  const config = oldState;
  const state = newState;

  // any strategy in config that doesn't exist in state will be added
  for (const configStrategyName in config) {
    if (state[configStrategyName] === undefined) {
      state[configStrategyName] = config[configStrategyName];
    }
  }

  // any strategy in state that has an older revision then the config will be replaced
  for (const stateStrategyName in state) {
    if (config[stateStrategyName] !== undefined) {
      const stateRevision =
        state[stateStrategyName].Revision !== undefined ? state[stateStrategyName].Revision : 0;
      const configRevision =
        config[stateStrategyName].Revision !== undefined ? config[stateStrategyName].Revision : 0;

      if (configRevision > stateRevision) {
        state[stateStrategyName] = config[stateStrategyName];
      }
    }
  }

  return state;
}

// main merge function
export function MergeState(oldState: any, newState: any) {
  const result = extend({}, oldState);

  for (const key in newState) {
    if (!newState.hasOwnProperty(key)) {
      continue;
    }
    const value = newState[key];

    // Assign if we don't need to merge at all
    if (!result.hasOwnProperty(key)) {
      result[key] = isObject(value) && !Array.isArray(value) ? merge({}, value) : value;
      continue;
    }

    const oldValue = (<any>result)[key];

    if (isObject(value) && !Array.isArray(value)) {
      // use both lodash functions so that we can merge from State onto Predefined Config where it exists but from the former where it doesnt.
      result[key] = mergeWith({}, oldValue, value, customizer);
    } else {
      result[key] = value;
    }
  }
  return result;
}

type TypeReducer = (
  state: AdaptableState,
  action: { type: string; State?: { [s: string]: ConfigState } }
) => AdaptableState;

export const mergeReducer = (rootReducer: TypeReducer, LOAD_STATE_TYPE: string): TypeReducer => {
  let finalReducer = rootReducer;

  finalReducer = (
    state: AdaptableState,
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
