import * as _ from 'lodash'
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { LicenceType } from '../../Utilities/Enums';

function customizer(objValue: any, srcValue: any) {
  if (_.isArray(objValue)) {
    if (srcValue) {
      return srcValue
    }
  }
}

// Works out which Merge function to use (for prdedefined config) based on Licence Type
export function MergeStateFunctionChooser(oldState: any, newState: any, licenceType: LicenceType) {
  switch (licenceType) {
    case LicenceType.Community:
      return MergeStateCommunityLicence(oldState, newState);
    case LicenceType.Standard:
      return MergeStateStandardLicence(oldState, newState);
    case LicenceType.Enterprise:
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
      result[key] = _.isObject(value) && !Array.isArray(value)
        ? _.merge({}, value)
        : value;
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
