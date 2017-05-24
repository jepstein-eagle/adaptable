import * as ReduxStorage from 'redux-storage'
import * as fetch from 'isomorphic-fetch';
import { AdaptableBlotterState, IAdaptableBlotterStore } from './Interface/IAdaptableStore'
import * as _ from 'lodash'

function customizer(objValue: any, srcValue: any) {
    if (_.isArray(objValue)) {
        if (objValue.length > 0 && objValue[0].hasOwnProperty("IsPredefined")) {
            return objValue.concat(srcValue);
        }
        else{
            return objValue
        }
    }
}

export function MergeState(oldState: AdaptableBlotterState, newState: AdaptableBlotterState) {
    const result = _.extend({}, oldState);

    for (const key in newState) {
        if (!newState.hasOwnProperty(key)) {
            continue;
        }
        const value = (<any>newState)[key];

        // Assign if we don't need to merge at all
        if (!result.hasOwnProperty(key)) {
            (<any>result)[key] = _.isObject(value) && !Array.isArray(value)
                ? _.merge({}, value)
                : value;
            continue;
        }

        const oldValue = (<any>result)[key];

        //if it's an array then we check if we're going to
        // 1: concat the array if the elements have the isPredefined property
        // 2: we just replace the array. We don't merge it like normal redux-storage does
        //logic is in customizer
        if (_.isObject(value) && !Array.isArray(value)) {
            (<any>result)[key] = _.mergeWith({}, oldValue, value, customizer);
        } else {
            (<any>result)[key] = value;
        }
    }

    return result;
}