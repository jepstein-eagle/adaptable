import fetch from 'isomorphic-fetch';
import { MergeStateFunction } from './AdaptableBlotterReduxMerger';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';

import IStorageEngine from './Interface/IStorageEngine';
import { PredefinedConfig } from '../../PredefinedConfig/PredefinedConfig';
import {
  AdaptableBlotterLoadState,
  AdaptableBlotterPersistState,
} from './Interface/IAdaptableStore';

const checkStatus = (response: Response) => {
  const error = new Error(response.statusText);

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw error;
};

const persistState: AdaptableBlotterPersistState = (
  state: any,
  config: { blotterId?: string; userName?: string }
): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(config.blotterId, JSON.stringify(state));
      resolve();
    } catch (ex) {
      reject(ex);
    }
  });
};

const loadState: AdaptableBlotterLoadState = ({ blotterId }) => {
  const jsonState = localStorage.getItem(blotterId);
  const parsedJsonState = JSON.parse(jsonState) || {};

  return Promise.resolve(parsedJsonState);
};

class AdaptableBlotterReduxLocalStorageEngine implements IStorageEngine {
  private blotterId: string;
  private userName: string;
  private predefinedConfig: PredefinedConfig | string;
  private loadState?: AdaptableBlotterLoadState;
  private persistState?: AdaptableBlotterPersistState;

  constructor(config: {
    blotterId: string;
    userName: string;
    predefinedConfig: PredefinedConfig | string;
    loadState?: AdaptableBlotterLoadState;
    persistState?: AdaptableBlotterPersistState;
  }) {
    this.blotterId = config.blotterId;
    this.userName = config.userName;
    this.predefinedConfig = config.predefinedConfig;
    this.loadState = config.loadState;
    this.persistState = config.persistState;
  }

  load(): Promise<any> {
    return (this.loadState || loadState)({
      blotterId: this.blotterId,
      userName: this.userName,
    }).then((parsedJsonState: any) => {
      if (
        typeof this.predefinedConfig === 'string' &&
        StringExtensions.IsNotNullOrEmpty(this.predefinedConfig)
      ) {
        // we have config in a file so lets merge it with the other state
        return fetch(this.predefinedConfig)
          .then(checkStatus)
          .then(response => response.json())
          .then(parsedPredefinedState => MergeStateFunction(parsedPredefinedState, parsedJsonState))
          .catch(err => LoggingHelper.LogAdaptableBlotterError(err));
      }
      if (this.predefinedConfig != null) {
        // we have config as an object so need to merge that
        return Promise.resolve(this.predefinedConfig)
          .then(parsedPredefinedState => MergeStateFunction(parsedPredefinedState, parsedJsonState))
          .catch(err => LoggingHelper.LogAdaptableBlotterError(err));
      }
      // no predefined config so nothing to merge
      return new Promise(resolve => {
        resolve(parsedJsonState || {});
      }).catch(rejectWithMessage);
    });
  }

  save(state: any): Promise<any> {
    return (this.persistState || persistState)(state, {
      blotterId: this.blotterId,
      userName: this.userName,
    }).catch(rejectWithMessage);
  }
}

function rejectWithMessage(error: any) {
  return Promise.reject(error.message);
}

export function createEngine(config: {
  blotterId: string;
  userName: string;
  predefinedConfig: PredefinedConfig | string;
  loadState?: AdaptableBlotterLoadState;
  persistState?: AdaptableBlotterPersistState;
}): IStorageEngine {
  return new AdaptableBlotterReduxLocalStorageEngine(config);
}
