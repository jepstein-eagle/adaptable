import * as _ from 'lodash';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { LicenceScopeType } from '../../PredefinedConfig/Common/Enums';
import { ILicenceInfo } from '../../Utilities/Interface/ILicenceInfo';
import { AdaptableBlotterState } from './Interface/IAdaptableStore';
import { IState } from '../../PredefinedConfig/IState';

function customizer(objValue: any, srcValue: any) {
  if (_.isArray(objValue)) {
    if (srcValue) {
      return srcValue;
    }
  }
}

// Works out which Merge function to use (for prdedefined config) based on Licence Type
export function MergeStateFunctionChooser(oldState: any, newState: any, licenceInfo: ILicenceInfo) {
  switch (licenceInfo.LicenceScopeType) {
    case LicenceScopeType.Community:
      return MergeStateCommunityLicence(oldState, newState);
    case LicenceScopeType.Standard:
      return MergeStateStandardLicence(oldState, newState);
    case LicenceScopeType.Enterprise:
      return MergeStateEnterpriseLicence(oldState, newState);
  }
}

// Simplest of the 3 - we basically dont merge under any circumstance!
export function MergeStateCommunityLicence(oldState: any, newState: any) {
  return _.extend({}, oldState);
}

// We merge most state - except for Chart (and others to come)
export function MergeStateStandardLicence(oldState: any, newState: any) {
  return MergeState(oldState, newState, ['Chart']);
}

// We merge everything
export function MergeStateEnterpriseLicence(oldState: any, newState: any) {
  return MergeState(oldState, newState, []);
}

// main merge function
export function MergeState(oldState: any, newState: any, nonMergableKeys: string[]) {
  const result = _.extend({}, oldState);

  for (const key in newState) {
    if (ArrayExtensions.ContainsItem(nonMergableKeys, key)) {
      continue;
    }

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

const LICENSE_MERGER_MAP = {
  [LicenceScopeType.Community]: MergeStateCommunityLicence,
  [LicenceScopeType.Standard]: MergeStateStandardLicence,
  [LicenceScopeType.Enterprise]: MergeStateEnterpriseLicence,
};

type TypeReducer = (
  state: AdaptableBlotterState,
  action: { type: string; State?: { [s: string]: IState } }
) => AdaptableBlotterState;

export const licenseMergeReducer = (
  rootReducer: TypeReducer,
  licenceInfo: ILicenceInfo,
  LOAD_STATE_TYPE: string
): TypeReducer => {
  let finalReducer = rootReducer;

  const filterMergeStateByLicense = LICENSE_MERGER_MAP[licenceInfo.LicenceScopeType];

  if (filterMergeStateByLicense) {
    finalReducer = (
      state: AdaptableBlotterState,
      action: { type: string; State: { [s: string]: IState } }
    ) => {
      if (action.type === LOAD_STATE_TYPE) {
        state = filterMergeStateByLicense(state, action.State);

        // put this new state on the action, since the root reducer further copies
        // keys from action.State to the new state
        action.State = state;
      }
      return rootReducer(state, action);
    };
  }

  return finalReducer;
};
