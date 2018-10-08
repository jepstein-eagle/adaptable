import * as _ from 'lodash'

function customizer(objValue: any, srcValue: any) {
  if (_.isArray(objValue)) {
    if (objValue && objValue.length > 0 && objValue[0].hasOwnProperty("IsReadOnly")) {
      if (objValue[0].IsReadOnly) {
        return objValue.concat(srcValue);
      }
    }
    else if (srcValue) {
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

    //if it's an array then we check if we're going to
    // 1: concat the array if the elements have the IsReadOnly property
    // 2: we just replace the array. We don't merge it like normal redux-storage does
    //logic is in customizer
    if (_.isObject(value) && !Array.isArray(value)) {
      result[key] = _.mergeWith({}, oldValue, value, customizer);
    } else {
      result[key] = value;
    }
  }

  return result;
}
