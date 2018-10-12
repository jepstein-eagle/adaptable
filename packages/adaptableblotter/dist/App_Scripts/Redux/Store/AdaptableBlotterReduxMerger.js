"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}
function MergeState(oldState, newState) {
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
        const oldValue = result[key];
        if (_.isObject(value) && !Array.isArray(value)) {
            result[key] = _.mergeWith({}, oldValue, value, customizer);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
exports.MergeState = MergeState;
