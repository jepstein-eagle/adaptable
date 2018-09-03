import { IStrategy } from './IStrategy';
import { ICellInfo } from '../../Core/Interface/Interfaces';
export interface IPlusMinusStrategy extends IStrategy {
    ApplyPlusMinus(keyEventString: string, newValues: ICellInfo[]): void;
}
