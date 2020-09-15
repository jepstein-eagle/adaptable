import fetch from 'isomorphic-fetch';
import debounce from 'lodash-es/debounce';
import { MergeStateFunction } from './AdaptableReduxMerger';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';

import IStorageEngine from './Interface/IStorageEngine';
import { PredefinedConfig } from '../../PredefinedConfig/PredefinedConfig';
import {
  AdaptableLoadStateFunction,
  AdaptablePersistStateFunction,
  AdaptableSaveStateFunction,
} from '../../AdaptableOptions/StateOptions';

import { AdaptableState } from '../../../types';

const checkStatus = (response: Response) => {
  const error = new Error(response.statusText);

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw error;
};

const persistState: AdaptablePersistStateFunction = (
  state: any,
  config: { adaptableId: string; adaptableStateKey: string; userName?: string }
): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(config.adaptableStateKey!, JSON.stringify(state));
      resolve();
    } catch (ex) {
      reject(ex);
    }
  });
};

const loadState: AdaptableLoadStateFunction = ({ adaptableId, adaptableStateKey }) => {
  const jsonState = localStorage.getItem(adaptableStateKey);
  const parsedJsonState = JSON.parse(jsonState) || {};

  return Promise.resolve(parsedJsonState);
};

class AdaptableReduxLocalStorageEngine implements IStorageEngine {
  private adaptableId: string;
  private adaptableStateKey: string;
  private userName: string;
  private predefinedConfig: PredefinedConfig | string;
  private loadState?: AdaptableLoadStateFunction;
  private persistState?: AdaptablePersistStateFunction;

  constructor(config: {
    adaptableId: string;
    adaptableStateKey: string;
    userName: string;
    predefinedConfig: PredefinedConfig | string;
    loadState?: AdaptableLoadStateFunction;
    persistState?: AdaptablePersistStateFunction;
    debounceStateDelay: number;
  }) {
    this.adaptableId = config.adaptableId;
    this.adaptableStateKey = config.adaptableStateKey;
    this.userName = config.userName;
    this.predefinedConfig = config.predefinedConfig;
    this.loadState = config.loadState;
    this.persistState = config.persistState;

    this.save = debounce(this.save, config.debounceStateDelay, {
      maxWait: 1000,
    });
  }

  public setStateKey(adaptableStateKey: string) {
    this.adaptableStateKey = adaptableStateKey;
  }

  load(): Promise<any> {
    return (this.loadState || loadState)({
      adaptableId: this.adaptableId,
      adaptableStateKey: this.adaptableStateKey,
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
          .then(parsedPredefinedState => {
            return MergeStateFunction(parsedPredefinedState, parsedJsonState);
          })
          .catch(err => LoggingHelper.LogAdaptableError(err));
      }
      if (this.predefinedConfig != null) {
        // we have config as an object so need to merge that
        return Promise.resolve(this.predefinedConfig)
          .then(parsedPredefinedState => {
            return MergeStateFunction(parsedPredefinedState, parsedJsonState);
          })
          .catch(err => LoggingHelper.LogAdaptableError(err));
      }
      // no predefined config so nothing to merge
      return new Promise(resolve => {
        resolve(parsedJsonState || {});
      }).catch(rejectWithMessage);
    });
  }

  save(state: AdaptableState, getState: AdaptableSaveStateFunction): Promise<any> {
    const config = {
      adaptableId: this.adaptableId,
      adaptableStateKey: this.adaptableStateKey,
      userName: this.userName,
    };

    let result: any = state;
    if (getState) {
      result = getState(state, config);
    }

    return (this.persistState || persistState)(result, config).catch(rejectWithMessage);
  }
}

function rejectWithMessage(error: any) {
  return Promise.reject(error.message);
}

export function createEngine(config: {
  adaptableId: string;
  adaptableStateKey: string;
  userName: string;
  predefinedConfig: PredefinedConfig | string;
  loadState?: AdaptableLoadStateFunction;
  persistState?: AdaptablePersistStateFunction;
  debounceStateDelay: number;
}): IStorageEngine {
  return new AdaptableReduxLocalStorageEngine(config);
}
