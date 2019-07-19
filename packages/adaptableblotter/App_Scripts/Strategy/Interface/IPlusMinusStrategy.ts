import { IStrategy } from './IStrategy';
import { ICellInfo } from '../../Utilities/Interface/ICellInfo';
import { PlusMinusRule } from '../../PredefinedConfig/RunTimeState/PlusMinusState';
import { ISelectedCell } from '../../Utilities/Interface/SelectedCell/ISelectedCell';

export interface IPlusMinusStrategy extends IStrategy {
  setPlusMinusValues(newValues: ICellInfo[]): void;
  canApplyPlusMinus(
    plusMinusRules: PlusMinusRule[],
    selectedCells: ISelectedCell[],
    side: number
  ): boolean;
}
