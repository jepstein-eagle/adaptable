import { AdaptableBlotterState } from '../../../PredefinedConfig/AdaptableBlotterState';

export default interface IStorageEngine {
  load(): PromiseLike<any>;
  save(state: Partial<AdaptableBlotterState>): PromiseLike<any>;
}
