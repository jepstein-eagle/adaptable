import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { ExpressionString } from '../Expression/ExpressionString';
import { ConditionalStyleScope } from '../Enums';



export interface IConditionalStyleStrategy extends IStrategy {
}

export interface IConditionalStyleCondition {
    ColumnId: string
    StyleName: string
    ConditionalStyleScope: ConditionalStyleScope
    Expression: ExpressionString
}