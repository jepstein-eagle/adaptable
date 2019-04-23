"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const lodash = require("lodash");
const LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
const DEBOUNCE_DELAY = 500;
const checkStatus = (response) => {
    const error = new Error(response.statusText);
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw error;
};
class AdaptableBlotterRemoteStorageEngine {
    constructor(url, userName, blotterId) {
        this.url = url;
        this.userName = userName;
        this.blotterId = blotterId;
        this.save = lodash.debounce(this.save, DEBOUNCE_DELAY);
    }
    load() {
        let loadOptions = {
            headers: {
                'ab_username': this.userName,
                'ab_id': this.blotterId
            }
        };
        return fetch(this.url, loadOptions)
            .then(checkStatus)
            .then(response => response.json())
            .catch(error => Promise.reject(error.message));
    }
    save(state) {
        let saveOptions = {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'ab_username': this.userName,
                'ab_id': this.blotterId
            },
        };
        return fetch(this.url, saveOptions).then(checkStatus).catch(error => {
            LoggingHelper_1.LoggingHelper.LogAdaptableBlotterError("Cannot Save Config: " + error.message);
            return Promise.reject("Cannot save config:" + error.message);
        });
        ;
    }
}
function createEngine(url, userName, blotterId) {
    return new AdaptableBlotterRemoteStorageEngine(url, userName, blotterId);
}
exports.createEngine = createEngine;
