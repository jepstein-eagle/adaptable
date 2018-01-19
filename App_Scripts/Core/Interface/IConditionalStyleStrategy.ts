import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { Expression } from '../Expression/Expression';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../Enums';
import { IRangeExpression } from '../Interface/IExpression';
import { IStyle } from '../Interface/IStyle';
import { IConfigEntity } from './IAdaptableBlotter'

export interface IConditionalStyleStrategy extends IStrategy {
}

export interface IConditionalStyleCondition extends IConfigEntity {
    ColumnId: string
    ConditionalStyleScope: ConditionalStyleScope
    Expression: Expression
    Style: IStyle
}





