import {  IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression';
import { ICellInfo, IAdaptableBlotterObject } from '../../Core/Interface/Interfaces';

export interface IPlusMinusStrategy extends IStrategy {
    ApplyPlusMinus(keyEventString: string, newValues: ICellInfo[]): void
}

export interface IPlusMinusCondition extends IAdaptableBlotterObject{
    ColumnId: string
    IsDefaultNudge: boolean
    NudgeValue: number
    Expression: Expression
}