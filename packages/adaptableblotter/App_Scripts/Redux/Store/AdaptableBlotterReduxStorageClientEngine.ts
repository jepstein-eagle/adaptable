import * as ReduxStorage from 'redux-storage'
import * as fetch from 'isomorphic-fetch';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';

interface IAdaptableBlotterReduxStorageClientEngine extends ReduxStorage.StorageEngine { }

const checkStatus = (response: Response) => {
  const error = new Error(response.statusText);

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  //error.response = response;
  throw error;
};

class AdaptableBlotterReduxStorageClientEngine implements IAdaptableBlotterReduxStorageClientEngine {
  constructor(private url: string, private userName: string, private blotterId: string, private blotter: IAdaptableBlotter) {}

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
      //.then(json => json.state)
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
      this.blotter.api.alertShowError("Cannot Save Config", error.message, true)
      return Promise.reject("Cannot save config:" + error.message)
    });;
  }
}

//TODO: we shouldn't really pass the blotter instance here but I need this to be done quickly
export function createEngine(url: string, userName: string, blotterId: string, blotter: IAdaptableBlotter): ReduxStorage.StorageEngine {
  return new AdaptableBlotterReduxStorageClientEngine(url, userName, blotterId, blotter)
}
