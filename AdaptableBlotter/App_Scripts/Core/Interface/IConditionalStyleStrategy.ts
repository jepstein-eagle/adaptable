import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { ExpressionString } from '../Expression/ExpressionString';
import { ConditionalStyleScope, ConditionalStyleColour, PredefinedExpression } from '../Enums';



export interface IConditionalStyleStrategy extends IStrategy {
}

export interface IConditionalStyleCondition {
    Uid: string
    ColumnId: string
    ConditionalStyleColour: ConditionalStyleColour
    ConditionalStyleScope: ConditionalStyleScope
    Expression: ExpressionString
    IsPredefinedExpression: boolean
    PredefinedExpression: PredefinedExpression
}