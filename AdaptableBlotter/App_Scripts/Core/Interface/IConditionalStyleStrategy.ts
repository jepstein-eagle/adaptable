import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { ExpressionString } from '../Expression/ExpressionString';
import { ConditionalStyleScope, ConditionalStyleColour } from '../Enums';



export interface IConditionalStyleStrategy extends IStrategy {
}

export interface IConditionalStyleCondition {
    ColumnId: string
    ConditionalStyleColour: ConditionalStyleColour
    ConditionalStyleScope: ConditionalStyleScope
    Expression: ExpressionString
}