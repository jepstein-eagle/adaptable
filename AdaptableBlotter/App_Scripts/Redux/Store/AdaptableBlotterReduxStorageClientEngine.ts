import * as ReduxStorage from 'redux-storage'
import * as fetch from 'isomorphic-fetch';

interface IAdaptableBlotterReduxStorageClientEngine extends ReduxStorage.StorageEngine { }

const checkStatus = (response: ResponseInterface) => {
  const error = new Error(response.statusText);

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  //error.response = response;
  throw error;
};

class AdaptableBlotterReduxStorageClientEngine implements IAdaptableBlotterReduxStorageClientEngine {
  constructor(private url: string, private userName: string) {

  }
  load(): Promise<any> {
    let loadOptions = {
      headers: {
        'ab_username': this.userName
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
      method: 'PUT',
      // body: JSON.stringify({state}),
      body: JSON.stringify(state),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'ab_username': this.userName
      },
    };

    return fetch(this.url, saveOptions).then(checkStatus);
  }
}

export function createEngine(url: string, userName: string): ReduxStorage.StorageEngine {
  return new AdaptableBlotterReduxStorageClientEngine(url, userName)
}
