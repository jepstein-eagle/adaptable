import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { Expression } from '../Expression/Expression';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../Enums';
import { IRangeExpression } from '../Interface/IExpression';
import { IStyle } from '../Interface/IStyle';
import { IConfigEntity } from './IAdaptableBlotter'

export interface IFormatColumnStrategy extends IStrategy {
}

export interface IFormatColumn extends IConfigEntity {
    ColumnId: string
    Style: IStyle
}