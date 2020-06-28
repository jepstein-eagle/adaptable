import { IStyleStrategy, IStrategy } from './IStrategy';

export interface IActionColumnStrategy extends IStrategy {
  addActionColumnsToGrid(): void;
}
