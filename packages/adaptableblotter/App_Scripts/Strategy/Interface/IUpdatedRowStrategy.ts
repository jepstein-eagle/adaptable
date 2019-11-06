import { IStrategy } from './IStrategy';

export interface IUpdatedRowStrategy extends IStrategy {
  initStyles(): void;
}
