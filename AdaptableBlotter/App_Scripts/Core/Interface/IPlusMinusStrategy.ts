import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { SmartEditOperation } from '../Enums';
import { Expression } from '../Expression/Expression';

export interface IPlusMinusStrategy extends IStrategy {
}

export interface IPlusMinusCondition {
    ColumnId: string
    DefaultNudge: number
    Expression: Expression
}