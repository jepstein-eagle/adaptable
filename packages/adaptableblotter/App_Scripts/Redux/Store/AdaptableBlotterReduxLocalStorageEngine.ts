import * as fetch from 'isomorphic-fetch';
import { MergeStateFunctionChooser } from './AdaptableBlotterReduxMerger';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import { ILicenceInfo } from '../../Utilities/Interface/ILicenceInfo';

import IStorageEngine from './Interface/IStorageEngine';

const checkStatus = (response: Response) => {
  const error = new Error(response.statusText);

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw error;
};

class AdaptableBlotterReduxLocalStorageEngine implements IStorageEngine {
  constructor(
    private key: string,
    private predefinedConfig: object,
    private licenceInfo: ILicenceInfo
  ) {
    this.key = key;
    this.predefinedConfig = predefinedConfig;
    this.licenceInfo = licenceInfo;
  }

  load(): Promise<any> {
    const jsonState = localStorage.getItem(this.key);
    let parsedJsonState = JSON.parse(jsonState) || {};
    if (
      typeof this.predefinedConfig == 'string' &&
      StringExtensions.IsNotNullOrEmpty(this.predefinedConfig)
    ) {
      // we have config in a file so lets merge it with the other state
      return fetch(this.predefinedConfig)
        .then(checkStatus)
        .then(response => response.json())
        .then(parsedPredefinedState =>
          MergeStateFunctionChooser(parsedPredefinedState, parsedJsonState, this.licenceInfo)
        )
        .catch(err => LoggingHelper.LogAdaptableBlotterError(err));
    } else if (this.predefinedConfig != null) {
      // we have config as an object so need to merge that
      return Promise.resolve(this.predefinedConfig)
        .then(parsedPredefinedState =>
          MergeStateFunctionChooser(parsedPredefinedState, parsedJsonState, this.licenceInfo)
        )
        .catch(err => LoggingHelper.LogAdaptableBlotterError(err));
    } else {
      // no predefined config so nothing to merge
      return new Promise(resolve => {
        resolve(parsedJsonState || {});
      }).catch(rejectWithMessage);
    }
  }
  save(state: any): Promise<any> {
    return new Promise(resolve => {
      localStorage.setItem(this.key, JSON.stringify(state));
      resolve();
    }).catch(rejectWithMessage);
  }
}

function rejectWithMessage(error: any) {
  return Promise.reject(error.message);
}

export function createEngine(
  key: string,
  predefinedConfig: object,
  licenceInfo: ILicenceInfo
): IStorageEngine {
  return new AdaptableBlotterReduxLocalStorageEngine(key, predefinedConfig, licenceInfo);
}
