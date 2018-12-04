import {  IStrategy } from './IStrategy';
import { ICellInfo } from '../../Api/Interface/Interfaces';

export interface IPlusMinusStrategy extends IStrategy {
    ApplyPlusMinus(keyEventString: string, newValues: ICellInfo[]): void
}

