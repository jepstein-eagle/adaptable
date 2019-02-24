"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const AdaptableBlotterReduxMerger_1 = require("./AdaptableBlotterReduxMerger");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
const checkStatus = (response) => {
    const error = new Error(response.statusText);
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw error;
};
class AdaptableBlotterReduxLocalStorageEngine {
    constructor(key, predefinedConfig, licenceType) {
        this.key = key;
        this.predefinedConfig = predefinedConfig;
        this.licenceType = licenceType;
    }
    load() {
        const jsonState = localStorage.getItem(this.key);
        let parsedJsonState = JSON.parse(jsonState) || {};
        if (typeof this.predefinedConfig == 'string' && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.predefinedConfig)) {
            // we have config in a file so lets merge it with the other state
            return fetch(this.predefinedConfig)
                .then(checkStatus)
                .then(response => response.json())
                .then(parsedPredefinedState => AdaptableBlotterReduxMerger_1.MergeStateFunctionChooser(parsedPredefinedState, parsedJsonState, this.licenceType))
                .catch(err => LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError(err));
        }
        else if (this.predefinedConfig != null) {
            // we have config as an object so need to merge that
            return new Promise((resolve) => resolve(this.predefinedConfig))
                .then(parsedPredefinedState => AdaptableBlotterReduxMerger_1.MergeStateFunctionChooser(parsedPredefinedState, parsedJsonState, this.licenceType))
                .catch(err => LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError(err));
        }
        else {
            // no predefined config so nothing to merge
            return new Promise((resolve) => {
                resolve(parsedJsonState || {});
            }).catch(rejectWithMessage);
        }
    }
    save(state) {
        return new Promise((resolve) => {
            let clonedState = Helper_1.Helper.cloneObject(state);
            const jsonState = JSON.stringify(clonedState /*, this.replacer*/);
            localStorage.setItem(this.key, jsonState);
            resolve();
        }).catch(rejectWithMessage);
    }
}
function rejectWithMessage(error) {
    return Promise.reject(error.message);
}
function createEngine(key, predefinedConfig, licenceType) {
    return new AdaptableBlotterReduxLocalStorageEngine(key, predefinedConfig, licenceType);
}
exports.createEngine = createEngine;
