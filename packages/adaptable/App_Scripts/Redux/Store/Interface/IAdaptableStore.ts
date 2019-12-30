import * as Redux from 'redux';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';

export interface IAdaptableStore {
  TheStore: Redux.Store<AdaptableState>;
  Load: PromiseLike<any>;

  on: (eventName: string, callback: (data?: any) => any) => () => void;
  onAny: (callback: (data?: any) => any) => () => void;
  emit: (eventName: string, data: any) => Promise<any>;
}
