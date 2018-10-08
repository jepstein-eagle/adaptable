"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const checkStatus = (response) => {
    const error = new Error(response.statusText);
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    //error.response = response;
    throw error;
};
class AdaptableBlotterReduxStorageClientEngine {
    constructor(url, userName, blotterId, blotter) {
        this.url = url;
        this.userName = userName;
        this.blotterId = blotterId;
        this.blotter = blotter;
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
            //.then(json => json.state)
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
            this.blotter.api.alertShowError("Cannot Save Config", error.message, true);
            return Promise.reject("Cannot save config:" + error.message);
        });
        ;
    }
}
//TODO: we shouldn't really pass the blotter instance here but I need this to be done quickly
function createEngine(url, userName, blotterId, blotter) {
    return new AdaptableBlotterReduxStorageClientEngine(url, userName, blotterId, blotter);
}
exports.createEngine = createEngine;
