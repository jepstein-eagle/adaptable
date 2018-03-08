import {  IStrategy } from './IStrategy';
import { IStyle } from '../../Core/Interface/IStyle';
import { IAdaptableBlotterObject } from '../../Core/Interface/IAdaptableBlotter'

export interface IFormatColumnStrategy extends IStrategy {
}

export interface IFormatColumn extends IAdaptableBlotterObject {
    ColumnId: string
    Style: IStyle
}