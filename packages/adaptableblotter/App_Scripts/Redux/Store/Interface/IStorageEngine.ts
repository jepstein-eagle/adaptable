import { AdaptableBlotterState } from "./IAdaptableStore";

export default interface IStorageEngine {
  load(): PromiseLike<any>;
  save(state: AdaptableBlotterState): PromiseLike<any>;
}