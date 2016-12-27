import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { Expression } from '../Expression/Expression';
import { ConditionalStyleScope, CellStyle } from '../Enums';
import { IPredefinedExpressionInfo } from '../../Core/Expression/PredefinedExpressionHelper';



export interface IConditionalStyleStrategy extends IStrategy {
}

export interface IConditionalStyleCondition {
    Uid: string
    ColumnId: string
    CellStyle: CellStyle
    ConditionalStyleScope: ConditionalStyleScope
    Expression: Expression
    IsPredefinedExpression: boolean
    PredefinedStyleCondition: IPredefinedStyleCondition
}


export interface IPredefinedStyleCondition {
    Id: string
    PredefinedExpressionInfo: IPredefinedExpressionInfo
    CellStyle: CellStyle
    FriendlyName: string
}