import { IStrategy } from './IStrategy';
import { PlusMinusRule } from '../../PredefinedConfig/RunTimeState/PlusMinusState';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';

export interface IPlusMinusStrategy extends IStrategy {
  applyPlusMinus(plusMinusRules: PlusMinusRule[], selectedCells: GridCell[], side: number): boolean;
}
