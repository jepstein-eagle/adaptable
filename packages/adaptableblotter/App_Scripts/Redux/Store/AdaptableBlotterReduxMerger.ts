import * as _ from 'lodash'

function customizer(objValue: any, srcValue: any) {
  if (_.isArray(objValue)) {
    if (srcValue) {
      return srcValue
    }
   }
}

export function MergeState(oldState: any, newState: any) {
  const result = _.extend({}, oldState);

  for (const key in newState) {
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
