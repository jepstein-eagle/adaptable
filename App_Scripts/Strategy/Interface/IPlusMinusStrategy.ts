import {  IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression';
import { IConfigEntity, ICellInfo } from '../../Core/Interface/IAdaptableBlotter'

export interface IPlusMinusStrategy extends IStrategy {
    ApplyPlusMinus(keyEventString: string, newValues: ICellInfo[]): void
}

export interface IPlusMinusCondition extends IConfigEntity{
    ColumnId: string
    DefaultNudge: number
    Expression: Expression
}