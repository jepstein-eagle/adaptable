import { AdaptableSaveStateFunction } from '../../../AdaptableOptions/StateOptions';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';

export default interface IStorageEngine {
  load(): PromiseLike<any>;
  save(state: AdaptableState, getEnhancedState?: AdaptableSaveStateFunction): PromiseLike<any>;
  setStateKey(stateKey: string): void;
}
