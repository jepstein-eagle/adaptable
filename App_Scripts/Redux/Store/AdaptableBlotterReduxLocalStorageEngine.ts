import * as ReduxStorage from 'redux-storage'
import * as fetch from 'isomorphic-fetch';
import { MergeState } from './AdaptableBlotterReduxMerger'
import { Helper } from '../../Core/Helpers/Helper'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'

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
    constructor(private key: string, private urlPredefinedConfig: string, private predifinedConfig: object) {

    }
    load(): Promise<any> {
        const jsonState = localStorage.getItem(this.key);
        let parsedJsonState = JSON.parse(jsonState/*, this.reviver*/) || {}
        if (StringExtensions.IsNotNullOrEmpty(this.urlPredefinedConfig)) {
            return fetch(this.urlPredefinedConfig)
                .then(checkStatus)
                .then(response => response.json())
                .then(parsedPredefinedState => ForcePredefinedItems(parsedPredefinedState))
                .then(parsedPredefinedState => MergeState(parsedPredefinedState, parsedJsonState))
                .catch(err => console.error(err));
        } else if (this.predifinedConfig != null) {
            return new Promise (( resolve )=> resolve(this.predifinedConfig))
                .then(parsedPredefinedState => ForcePredefinedItems(parsedPredefinedState))
                .then(parsedPredefinedState => MergeState(parsedPredefinedState, parsedJsonState))
                .catch(err => console.error(err));
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
                        substate[property] = substate[property].filter((x: any) => !x.IsPredefined)
                    }
                }
            }
        }
    }
}

//We force the IsPredefined of the predefinedState to be true
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
                            if (element.hasOwnProperty("IsPredefined")) {
                                element.IsPredefined = true;
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

export function createEngine(key: string, urlPredefinedConfig: string, predefinedConfig: object): ReduxStorage.StorageEngine {
    // see if this works...



    return new AdaptableBlotterReduxLocalStorageEngine(key, urlPredefinedConfig, predefinedConfig)
}
