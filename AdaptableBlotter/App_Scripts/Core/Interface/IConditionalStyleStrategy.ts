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
    PredefinedStyleCondition: IPredefinedStyleCondition
    BackColor : string
    ForeColor : string
}


export interface IPredefinedStyleCondition {
    Id: string
    PredefinedExpressionInfo: IPredefinedExpressionInfo
    FriendlyName: string
    BackColor : string
    ForeColor : string
}