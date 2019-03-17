import * as ReduxStorage from 'redux-storage'
import * as fetch from 'isomorphic-fetch';
import { MergeStateFunctionChooser } from './AdaptableBlotterReduxMerger'
import { Helper } from '../../Utilities/Helpers/Helper'
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions'
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import { LicenceType } from '../../Utilities/Enums';
import { ILicenceInfo } from '../../Utilities/Interface/ILicenceInfo';

const checkStatus = (response: Response) => {
  const error = new Error(response.statusText);

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw error;
};

interface IAdaptableBlotterReduxLocalStorageEngine extends ReduxStorage.StorageEngine { }

class AdaptableBlotterReduxLocalStorageEngine implements IAdaptableBlotterReduxLocalStorageEngine {
  constructor(private key: string, private predefinedConfig: object, private licenceInfo: ILicenceInfo) { }

  load(): Promise<any> {
    const jsonState = localStorage.getItem(this.key);
    let parsedJsonState = JSON.parse(jsonState) || {}
    if (typeof this.predefinedConfig == 'string' && StringExtensions.IsNotNullOrEmpty(this.predefinedConfig)) {
      // we have config in a file so lets merge it with the other state
      return fetch(this.predefinedConfig)
        .then(checkStatus)
        .then(response => response.json())
        .then(parsedPredefinedState => MergeStateFunctionChooser(parsedPredefinedState, parsedJsonState, this.licenceInfo))
        .catch(err => LoggingHelper.LogAdaptableBlotterError(err));
    } else if (this.predefinedConfig != null) {
      // we have config as an object so need to merge that
      return new Promise((resolve) => resolve(this.predefinedConfig))
        .then(parsedPredefinedState => MergeStateFunctionChooser(parsedPredefinedState, parsedJsonState, this.licenceInfo))
        .catch(err => LoggingHelper.LogAdaptableBlotterError(err));
    }
    else {
      // no predefined config so nothing to merge
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

export function createEngine(key: string, predefinedConfig: object, licenceInfo: ILicenceInfo): ReduxStorage.StorageEngine {
  return new AdaptableBlotterReduxLocalStorageEngine(key, predefinedConfig, licenceInfo)
}
