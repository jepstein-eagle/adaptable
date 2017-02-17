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
     BackColor: string
    ForeColor: string
}




