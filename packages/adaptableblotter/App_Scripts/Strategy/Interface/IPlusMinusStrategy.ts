import {  IStrategy } from './IStrategy';
import { ICellInfo } from '../../api/Interface/Interfaces';

export interface IPlusMinusStrategy extends IStrategy {
    ApplyPlusMinus(keyEventString: string, newValues: ICellInfo[]): void
}

