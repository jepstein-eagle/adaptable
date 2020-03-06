import * as _ from 'lodash';
import { ConfigState } from '../../PredefinedConfig/ConfigState';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { PredefinedConfig } from '../../PredefinedConfig/PredefinedConfig';

function customizer(objValue: any, srcValue: any): any {
  if (_.isArray(objValue)) {
    if (!Array.isArray(srcValue)) {
      /**
       * the new value might be a function: eg: UserInterface.ContextMenuItems defaults to an array
       * in the redux state, while the user might provide a function
       * so in this case, make the user provided value win
       */
      return srcValue;
    }
    const length = srcValue ? srcValue.length : null;
    const result: any = _.mergeWith(objValue, srcValue, customizer);

    if (length != null) {
      // when merging arrays, lodash result has the length of the
      // longest array, but we don't want that to happen
      // so we restrict to the current length
      result.length = length;
    }

    return result;
  }
}

export function MigrateState(config: PredefinedConfig, state: AdaptableState): any {
  if (_.isString(config)) return state;

  const configArray = _.isArray(config) ? config : [config];
  const lastCount = state.Application?.LastMigrationCount ?? 1;

  return configArray.slice(lastCount).reduce((state: AdaptableState, configItem) => {
    const itemResult = _.isFunction(configItem) ? configItem(state) : configItem;
    const newState = _.merge(state, itemResult);

    newState.Application = newState.Application ?? { LastMigrationCount: lastCount };
    newState.Application.LastMigrationCount++;

    return newState;
  }, _.cloneDeep(state));
}

export function MergeStateFunction(oldState: any, newState: any) {
  return MergeState(_.isArray(oldState) ? oldState[0] : oldState, newState);
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
      // use both lodash functions so that we can merge from State onto Predefined Config where it exists but from the former where it doesnt.
      result[key] = _.mergeWith({}, oldValue, value, customizer);
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
