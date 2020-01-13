import fetch from 'isomorphic-fetch';
import { debounce } from 'lodash';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import IStorageEngine from './Interface/IStorageEngine';
import {
  AdaptableLoadStateFunction,
  AdaptablePersistStateFunction,
} from '../../AdaptableOptions/StateOptions';

const DEBOUNCE_DELAY = 500;

const checkStatus = (response: Response) => {
  const error = new Error(response.statusText);

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw error;
};

const persistState: AdaptablePersistStateFunction = (
  state: any,
  config: { adaptableId?: string; userName?: string; url?: string }
): Promise<any> => {
  const saveOptions = {
    method: 'POST',
    body: JSON.stringify(state),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ab_username: config.userName,
      ab_id: config.adaptableId,
    },
  };

  return fetch(config.url, saveOptions).then(checkStatus);
};

const loadState: AdaptableLoadStateFunction = ({ userName, adaptableId, url }) => {
  const loadOptions = {
    headers: {
      ab_username: userName,
      ab_id: adaptableId,
    },
  };
  return fetch(url, loadOptions)
    .then(checkStatus)
    .then(response => response.json());
};

class AdaptableRemoteStorageEngine implements IStorageEngine {
  private url: string;
  private userName: string;
  private adaptableId: string;
  private loadState?: AdaptableLoadStateFunction;
  private persistState?: AdaptablePersistStateFunction;

  constructor(config: {
    url: string;
    userName: string;
    adaptableId: string;
    loadState?: AdaptableLoadStateFunction;
    persistState?: AdaptablePersistStateFunction;
  }) {
    this.url = config.url;
    this.userName = config.userName;
    this.adaptableId = config.adaptableId;
    this.loadState = config.loadState;
    this.persistState = config.persistState;
    this.save = debounce(this.save, DEBOUNCE_DELAY);
  }

  load(): Promise<any> {
    return (this.loadState || loadState)({
      userName: this.userName,
      adaptableId: this.adaptableId,
      url: this.url,
    }).catch(error => Promise.reject(error.message));
  }

  save(state: any): Promise<any> {
    return (this.persistState || persistState)(state, {
      userName: this.userName,
      adaptableId: this.adaptableId,
      url: this.url,
    }).catch(error => {
      LoggingHelper.LogAdaptableError(`Cannot Save Config: ${error.message}`);
      return Promise.reject(`Cannot save config:${error.message}`);
    });
  }
}

export function createEngine({
  url,
  userName,
  adaptableId,
  persistState,
  loadState,
}: {
  url: string;
  userName: string;
  adaptableId: string;

  persistState?: AdaptablePersistStateFunction;
  loadState?: AdaptableLoadStateFunction;
}): IStorageEngine {
  return new AdaptableRemoteStorageEngine({
    url,
    userName,
    adaptableId,
    persistState,
    loadState,
  });
}
