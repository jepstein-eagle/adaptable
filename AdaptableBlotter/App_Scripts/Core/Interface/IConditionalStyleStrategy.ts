import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { Expression } from '../Expression/Expression';
import { ConditionalStyleScope } from '../Enums';
import { IRangeExpression } from '../Interface/IExpression';

export interface IConditionalStyleStrategy extends IStrategy {
}

export interface IConditionalStyleCondition {
    Uid: string
    ColumnId: string
    ConditionalStyleScope: ConditionalStyleScope
    Expression: Expression
    IsPredefinedExpression: boolean
    PredefinedStyleCondition: IPredefinedStyleCondition
    BackColor: string
    ForeColor: string
}


export interface IPredefinedStyleCondition {
    Id: string
    PredefinedExpressionInfo: IPredefinedExpressionInfo
    FriendlyName: string
    BackColor: string
    ForeColor: string
}

export interface IPredefinedExpressionInfo {
    DisplayColumnValues: Array<string>,
    RawColumnValues: Array<any>,
    UserFilterUids: string[],
    ExpressionRange: IRangeExpression
}
