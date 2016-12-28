import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { Expression } from '../Expression/Expression';
import { ConditionalStyleScope } from '../Enums';
import { IPredefinedExpressionInfo } from '../../Core/Expression/PredefinedExpressionHelper';



export interface IConditionalStyleStrategy extends IStrategy {
}

export interface IConditionalStyleCondition {
    Uid: string
    ColumnId: string
    ConditionalStyleScope: ConditionalStyleScope
    Expression: Expression
    IsPredefinedExpression: boolean
    PredefinedExpressionInfo: IPredefinedExpressionInfo
    BackColor : string
    ForeColor : string
}