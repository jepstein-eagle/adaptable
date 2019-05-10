import { IStrategy } from './IStrategy';
import { ICellInfo } from '../../Utilities/Interface/ICellInfo';

export interface IPlusMinusStrategy extends IStrategy {
  ApplyPlusMinus(keyEventString: string, newValues: ICellInfo[]): void;
}
