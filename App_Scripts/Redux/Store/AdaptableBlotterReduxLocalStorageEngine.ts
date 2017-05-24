import * as ReduxStorage from 'redux-storage'
import * as fetch from 'isomorphic-fetch';
import { MergeState } from './AdaptableBlotterReduxMerger'
import { StringExtensions } from '../../Core/Extensions'

interface IAdaptableBlotterReduxLocalStorageEngine extends ReduxStorage.StorageEngine { }

class AdaptableBlotterReduxLocalStorageEngine implements IAdaptableBlotterReduxLocalStorageEngine {
    constructor(private key: string, private urlPredefinedConfig: string) {

    }
    load(): Promise<any> {
        return new Promise((resolve) => {

            const jsonState = localStorage.getItem(this.key);
            let parsedJsonState = JSON.parse(jsonState/*, this.reviver*/) || {}
            const predefinedState = ""
            let parsedPredefinedState = JSON.parse(jsonState/*, this.reviver*/) || {}
            if (StringExtensions.IsNotNullOrEmpty(this.urlPredefinedConfig)) {
            }
            resolve(MergeState(parsedPredefinedState, parsedJsonState) || {});
        }).catch(rejectWithMessage);
    }
    save(state: any): Promise<any> {
        return new Promise((resolve) => {
            let clonedState = Object.assign({}, state)
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

function rejectWithMessage(error: any) {
    return Promise.reject(error.message);
}

export function createEngine(key: string, urlPredefinedConfig: string = ""): ReduxStorage.StorageEngine {
    return new AdaptableBlotterReduxLocalStorageEngine(key, urlPredefinedConfig)
}
