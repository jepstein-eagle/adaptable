import * as Redux from 'redux';
import { AdaptableBlotterState } from '../../../PredefinedConfig/AdaptableBlotterState';

export interface IAdaptableBlotterStore {
  TheStore: Redux.Store<AdaptableBlotterState>;
  Load: PromiseLike<any>;

  on: (eventName: string, callback: (data?: any) => any) => () => void;
  onAny: (callback: (data?: any) => any) => () => void;
  emit: (eventName: string, data: any) => Promise<any>;
}
