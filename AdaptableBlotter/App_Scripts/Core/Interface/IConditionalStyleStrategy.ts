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
}


export interface IPredefinedStyleCondition {
    Id: string
    PredefinedExpressionInfo: IPredefinedExpressionInfo
<<<<<<< HEAD
    CellStyle: CellStyle
    FriendlyName: string
=======
    BackColor : string
    ForeColor : string
>>>>>>> 9e285dd679d810e10f33adebaa023a9d1e75de7c
}