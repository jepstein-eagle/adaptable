import fetch from 'isomorphic-fetch';
import { debounce } from 'lodash';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import IStorageEngine from './Interface/IStorageEngine';
import {
  AdaptableBlotterState,
  AdaptableBlotterPersistState,
  AdaptableBlotterLoadState,
} from './Interface/IAdaptableStore';

const DEBOUNCE_DELAY = 500;

const checkStatus = (response: Response) => {
  const error = new Error(response.statusText);

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw error;
};

const persistState: AdaptableBlotterPersistState = (
  state: any,
  config: { blotterId?: string; userName?: string; url?: string }
): Promise<any> => {
  const saveOptions = {
    method: 'POST',
    body: JSON.stringify(state),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ab_username: config.userName,
      ab_id: config.blotterId,
    },
  };

  return fetch(config.url, saveOptions).then(checkStatus);
};

const loadState: AdaptableBlotterLoadState = ({ userName, blotterId, url }) => {
  const loadOptions = {
    headers: {
      ab_username: userName,
      ab_id: blotterId,
    },
  };
  return fetch(url, loadOptions)
    .then(checkStatus)
    .then(response => response.json());
};

class AdaptableBlotterRemoteStorageEngine implements IStorageEngine {
  private url: string;
  private userName: string;
  private blotterId: string;
  private loadState?: AdaptableBlotterLoadState;
  private persistState?: AdaptableBlotterPersistState;

  constructor(config: {
    url: string;
    userName: string;
    blotterId: string;
    loadState?: AdaptableBlotterLoadState;
    persistState?: AdaptableBlotterPersistState;
  }) {
    this.url = config.url;
    this.userName = config.userName;
    this.blotterId = config.blotterId;
    this.loadState = config.loadState;
    this.persistState = config.persistState;
    this.save = debounce(this.save, DEBOUNCE_DELAY);
  }

  load(): Promise<any> {
    return (this.loadState || loadState)({
      userName: this.userName,
      blotterId: this.blotterId,
      url: this.url,
    }).catch(error => Promise.reject(error.message));
  }

  save(state: any): Promise<any> {
    return (this.persistState || persistState)(state, {
      userName: this.userName,
      blotterId: this.blotterId,
      url: this.url,
    }).catch(error => {
      LoggingHelper.LogAdaptableBlotterError(`Cannot Save Config: ${error.message}`);
      return Promise.reject(`Cannot save config:${error.message}`);
    });
  }
}

export function createEngine({
  url,
  userName,
  blotterId,
  persistState,
  loadState,
}: {
  url: string;
  userName: string;
  blotterId: string;

  persistState?: AdaptableBlotterPersistState;
  loadState?: AdaptableBlotterLoadState;
}): IStorageEngine {
  return new AdaptableBlotterRemoteStorageEngine({
    url,
    userName,
    blotterId,
    persistState,
    loadState,
  });
}
