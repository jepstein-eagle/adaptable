import * as ReduxStorage from 'redux-storage'
import * as fetch from 'isomorphic-fetch';
import { MergeState } from './AdaptableBlotterReduxMerger'
import { Helper } from '../../Utilities/Helpers/Helper'
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions'
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';

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
  constructor(private key: string, private predefinedConfig: object) { }

  load(): Promise<any> {
    const jsonState = localStorage.getItem(this.key);
    let parsedJsonState = JSON.parse(jsonState/*, this.reviver*/) || {}
    if (typeof this.predefinedConfig == 'string' && StringExtensions.IsNotNullOrEmpty(this.predefinedConfig)) {
      return fetch(this.predefinedConfig)
        .then(checkStatus)
        .then(response => response.json())
        //     .then(parsedPredefinedState => ForcePredefinedItems(parsedPredefinedState))
        .then(parsedPredefinedState => MergeState(parsedPredefinedState, parsedJsonState))
        .catch(err => LoggingHelper.LogAdaptableBlotterError(err));
    } else if (this.predefinedConfig != null) {
      return new Promise((resolve) => resolve(this.predefinedConfig))
        //      .then(parsedPredefinedState => ForcePredefinedItems(parsedPredefinedState))
        .then(parsedPredefinedState => MergeState(parsedPredefinedState, parsedJsonState))
        .catch(err => LoggingHelper.LogAdaptableBlotterError(err));
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
      const jsonState = JSON.stringify(clonedState/*, this.replacer*/);
      localStorage.setItem(this.key, jsonState);
      resolve();
    }).catch(rejectWithMessage);
  }
}

function rejectWithMessage(error: any) {
  return Promise.reject(error.message);
}

export function createEngine(key: string, predefinedConfig: object): ReduxStorage.StorageEngine {
  return new AdaptableBlotterReduxLocalStorageEngine(key, predefinedConfig)
}
