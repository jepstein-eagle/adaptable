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
    PredefinedExpressionInfo: IPredefinedExpressionInfo
}