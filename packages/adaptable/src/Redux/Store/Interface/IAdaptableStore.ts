import * as Redux from 'redux';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';
import { IAdaptable } from '../../../types';

export interface IAdaptableStore {
  TheStore: Redux.Store<AdaptableState>;
  Load: PromiseLike<any>;
  loadStore: (adaptable: IAdaptable, adaptableStateKey: string) => PromiseLike<any>;

  on: (eventName: string, callback: (data?: any) => any) => () => void;
  onAny: (callback: (eventName: string, data?: any) => any) => () => void;
  emit: (eventName: string, data: any) => Promise<any>;
}
