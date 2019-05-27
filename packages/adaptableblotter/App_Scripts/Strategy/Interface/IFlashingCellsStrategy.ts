import { IStrategy } from './IStrategy';

export interface IFlashingCellsStrategy extends IStrategy {
  initStyles(): void;
}
