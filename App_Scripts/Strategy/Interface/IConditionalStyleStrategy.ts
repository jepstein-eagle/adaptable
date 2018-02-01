import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { IStyle } from '../../Core/Interface/IStyle';
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter'

export interface IConditionalStyleStrategy extends IStrategy {
}

export interface IConditionalStyleCondition extends IConfigEntity {
    ColumnId: string
    ConditionalStyleScope: ConditionalStyleScope
    Expression: Expression
    Style: IStyle
}





