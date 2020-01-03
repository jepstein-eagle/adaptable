import { IStrategy } from './IStrategy';

export interface IQuickSearchStrategy extends IStrategy {
  createQuickSearchRange(): void;
}
