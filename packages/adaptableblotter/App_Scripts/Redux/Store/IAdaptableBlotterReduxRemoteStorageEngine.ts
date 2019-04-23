import * as fetch from 'isomorphic-fetch';
import * as lodash from 'lodash'
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import IStorageEngine from './Interface/IStorageEngine';

const DEBOUNCE_DELAY = 500

const checkStatus = (response: Response) => {
  const error = new Error(response.statusText);

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw error;
};

class AdaptableBlotterRemoteStorageEngine implements IStorageEngine {

  constructor(private url: string, private userName: string, private blotterId: string) {
    this.save = lodash.debounce(this.save, DEBOUNCE_DELAY)
  }

  load(): Promise<any> {
    let loadOptions = {
      headers: {
        'ab_username': this.userName,
        'ab_id': this.blotterId
      }
    }
    return fetch(this.url, loadOptions)
      .then(checkStatus)
      .then(response => response.json())
      .catch(error => Promise.reject(error.message));
  }

  save(state: any): Promise<any> {
    let saveOptions = {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'ab_username': this.userName,
        'ab_id': this.blotterId
      },
    };

    return fetch(this.url, saveOptions).then(checkStatus).catch(error => {
      LoggingHelper.LogAdaptableBlotterError("Cannot Save Config: " + error.message)
      return Promise.reject("Cannot save config:" + error.message)
    });;
  }
}

export function createEngine(url: string, userName: string, blotterId: string): IStorageEngine {
  return new AdaptableBlotterRemoteStorageEngine(url, userName, blotterId)
}
