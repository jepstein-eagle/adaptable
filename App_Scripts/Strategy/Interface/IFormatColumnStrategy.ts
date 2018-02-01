import { IStrategyActionReturn, IStrategy } from './IStrategy';
import { IStyle } from '../../Core/Interface/IStyle';
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter'

export interface IFormatColumnStrategy extends IStrategy {
}

export interface IFormatColumn extends IConfigEntity {
    ColumnId: string
    Style: IStyle
}