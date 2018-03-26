import {  IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression';
import { ConditionalStyleScope } from '../../Core/Enums';
import { IStyle } from '../../Core/Interface/IStyle';
import { IAdaptableBlotterObject } from '../../Core/Interface/Interfaces';

export interface IConditionalStyleStrategy extends IStrategy {
}

export interface IConditionalStyle extends IAdaptableBlotterObject {
    ColumnId: string
    ConditionalStyleScope: ConditionalStyleScope
    Expression: Expression
    Style: IStyle
}





