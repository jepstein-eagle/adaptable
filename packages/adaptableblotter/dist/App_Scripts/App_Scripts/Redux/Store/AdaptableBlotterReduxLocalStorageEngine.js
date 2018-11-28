"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const AdaptableBlotterReduxMerger_1 = require("./AdaptableBlotterReduxMerger");
const Helper_1 = require("../../Core/Helpers/Helper");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const AdaptableBlotterLogger_1 = require("../../Core/Helpers/AdaptableBlotterLogger");
const checkStatus = (response) => {
    const error = new Error(response.statusText);
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    //error.response = response;
    throw error;
};
class AdaptableBlotterReduxLocalStorageEngine {
    constructor(key, predefinedConfig) {
        this.key = key;
        this.predefinedConfig = predefinedConfig;
    }
    load() {
        const jsonState = localStorage.getItem(this.key);
        let parsedJsonState = JSON.parse(jsonState /*, this.reviver*/) || {};
        if (typeof this.predefinedConfig == 'string' && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.predefinedConfig)) {
            return fetch(this.predefinedConfig)
                .then(checkStatus)
                .then(response => response.json())
                //     .then(parsedPredefinedState => ForcePredefinedItems(parsedPredefinedState))
                .then(parsedPredefinedState => AdaptableBlotterReduxMerger_1.MergeState(parsedPredefinedState, parsedJsonState))
                .catch(err => AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError(err));
        }
        else if (this.predefinedConfig != null) {
            return new Promise((resolve) => resolve(this.predefinedConfig))
                //      .then(parsedPredefinedState => ForcePredefinedItems(parsedPredefinedState))
                .then(parsedPredefinedState => AdaptableBlotterReduxMerger_1.MergeState(parsedPredefinedState, parsedJsonState))
                .catch(err => AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError(err));
        }
        else {
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
function createEngine(key, predefinedConfig) {
    return new AdaptableBlotterReduxLocalStorageEngine(key, predefinedConfig);
}
exports.createEngine = createEngine;
