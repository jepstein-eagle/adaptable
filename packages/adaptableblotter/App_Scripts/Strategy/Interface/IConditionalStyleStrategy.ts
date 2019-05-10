import { IStrategy } from './IStrategy';

export interface IConditionalStyleStrategy extends IStrategy {
  InitStyles(): void;
}
