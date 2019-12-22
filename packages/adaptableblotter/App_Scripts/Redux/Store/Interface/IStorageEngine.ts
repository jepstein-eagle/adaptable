import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';

export default interface IStorageEngine {
  load(): PromiseLike<any>;
  save(state: Partial<AdaptableState>): PromiseLike<any>;
}
