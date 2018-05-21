import * as ReduxStorage from 'redux-storage'
import * as fetch from 'isomorphic-fetch';
import { MergeState } from './AdaptableBlotterReduxMerger'
import { Helper } from '../../Core/Helpers/Helper'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { AdaptableBlotterLogger } from '../../Core/Helpers/AdaptableBlotterLogger';

const checkStatus = (response: Response) => {
    const error = new Error(response.statusText);

    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    //error.response = response;
    throw error;
};

interface IAdaptableBlotterReduxLocalStorageEngine extends ReduxStorage.StorageEngine { }



class AdaptableBlotterReduxLocalStorageEngine implements IAdaptableBlotterReduxLocalStorageEngine {
    constructor(private key: string, private predefinedConfig: object) {

    }
    load(): Promise<any> {
        const jsonState = localStorage.getItem(this.key);
        let parsedJsonState = JSON.parse(jsonState/*, this.reviver*/) || {}
        if (typeof this.predefinedConfig== 'string' && StringExtensions.IsNotNullOrEmpty(this.predefinedConfig)) {
            return fetch(this.predefinedConfig)
                .then(checkStatus)
                .then(response => response.json())
           //     .then(parsedPredefinedState => ForcePredefinedItems(parsedPredefinedState))
                .then(parsedPredefinedState => MergeState(parsedPredefinedState, parsedJsonState))
                .catch(err => AdaptableBlotterLogger.LogError(err));
        } else if (this.predefinedConfig != null) {
            return new Promise (( resolve )=> resolve(this.predefinedConfig))
          //      .then(parsedPredefinedState => ForcePredefinedItems(parsedPredefinedState))
                .then(parsedPredefinedState => MergeState(parsedPredefinedState, parsedJsonState))
                .catch(err => AdaptableBlotterLogger.LogError(err));
        }
        else {
            return new Promise((resolve) => {
                resolve(parsedJsonState || {});
            }).catch(rejectWithMessage);
        }
    }
    save(state: any): Promise<any> {
        return new Promise((resolve) => {
            let clonedState = Helper.cloneObject(state)
            FilterPredefinedItems(clonedState)
            const jsonState = JSON.stringify(clonedState/*, this.replacer*/);
            localStorage.setItem(this.key, jsonState);
            resolve();
        }).catch(rejectWithMessage);
    }
}

function FilterPredefinedItems(state: any) {
    // we iterating substate here
    for (let substateName in state) {
        if (state.hasOwnProperty(substateName)) {
            let substate = state[substateName]
            //we look for arrays of entities and will filter predefined Items
            //works only if array is at rootlevel. Will need enhancement if that was to change
            for (let property in substate) {
                if (substate.hasOwnProperty(property)) {
                    if (Array.isArray(substate[property])) {
                        substate[property] = substate[property].filter((x: any) => !x.IsReadOnly)
                    }
                }
            }
        }
    }
}

//We force the IsReadOnly of the predefinedState to be true
// I've commented this out 29/4/18 as Im not sure what hte point of it is.  why not let devs decide if something is predefined?
function ForcePredefinedItems(state: any) {
    // we iterating substate here
    for (let substateName in state) {
        if (state.hasOwnProperty(substateName)) {
            let substate = state[substateName]
            //we look for arrays of entities and will set predefined Items
            //works only if array is at rootlevel. Will need enhancement if that was to change
            for (let property in substate) {
                if (substate.hasOwnProperty(property)) {
                    if (Array.isArray(substate[property])) {
                        let arrayItems = substate[property]
                        arrayItems.forEach((element: any) => {
                            if (element.hasOwnProperty("IsReadOnly")) {
                          //      element.IsReadOnly = true;
                            }
                        });
                    }
                }

            }
        }
    }
    return state
}

function rejectWithMessage(error: any) {
    return Promise.reject(error.message);
}

export function createEngine(key: string, predefinedConfig: object): ReduxStorage.StorageEngine {
    return new AdaptableBlotterReduxLocalStorageEngine(key, predefinedConfig)
}
