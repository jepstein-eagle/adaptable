import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { SmartEditOperation } from '../Enums';
import { ExpressionString } from '../Expression/ExpressionString';

export interface IPlusMinusStrategy extends IStrategy {
}

export interface IPlusMinusCondition {
    ColumnId: string
    DefaultNudge: number
    Expression: ExpressionString
}