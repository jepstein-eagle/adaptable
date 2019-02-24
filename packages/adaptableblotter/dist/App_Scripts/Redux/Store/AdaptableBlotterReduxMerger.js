"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const Enums_1 = require("../../Utilities/Enums");
function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
        if (srcValue) {
            return srcValue;
        }
    }
}
// Works out which Merge function to use (for prdedefined config) based on Licence Type
function MergeStateFunctionChooser(oldState, newState, licenceType) {
    switch (licenceType) {
        case Enums_1.LicenceType.Community:
            return MergeStateCommunityLicence(oldState, newState);
<<<<<<< HEAD
        case Enums_1.LicenceType.Standard:
            return MergeStateStandardLicence(oldState, newState);
        case Enums_1.LicenceType.Enterprise:
            return MergeStateEnterpriseLicence(oldState, newState);
=======
        case Enums_1.LicenceType.Enterprise:
            return MergeStateEnterpriseLicence(oldState, newState);
        case Enums_1.LicenceType.Advanced:
            return MergeStateAdvancedLicence(oldState, newState);
>>>>>>> Put charts in the given chart container
    }
}
exports.MergeStateFunctionChooser = MergeStateFunctionChooser;
// Simplest of the 3 - we basically dont merge under any circumstance!
function MergeStateCommunityLicence(oldState, newState) {
    return _.extend({}, oldState);
}
exports.MergeStateCommunityLicence = MergeStateCommunityLicence;
// We merge most state - except for Chart (and others to come)
<<<<<<< HEAD
function MergeStateStandardLicence(oldState, newState) {
    return MergeState(oldState, newState, ['Chart']);
}
exports.MergeStateStandardLicence = MergeStateStandardLicence;
// We merge everything 
function MergeStateEnterpriseLicence(oldState, newState) {
    return MergeState(oldState, newState, []);
}
exports.MergeStateEnterpriseLicence = MergeStateEnterpriseLicence;
=======
function MergeStateEnterpriseLicence(oldState, newState) {
    return MergeState(oldState, newState, ['Chart']);
}
exports.MergeStateEnterpriseLicence = MergeStateEnterpriseLicence;
// We merge everything 
function MergeStateAdvancedLicence(oldState, newState) {
    return MergeState(oldState, newState, []);
}
exports.MergeStateAdvancedLicence = MergeStateAdvancedLicence;
>>>>>>> Put charts in the given chart container
// main merge function
function MergeState(oldState, newState, nonMergableKeys) {
    const result = _.extend({}, oldState);
    for (const key in newState) {
        if (ArrayExtensions_1.ArrayExtensions.ContainsItem(nonMergableKeys, key)) {
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
