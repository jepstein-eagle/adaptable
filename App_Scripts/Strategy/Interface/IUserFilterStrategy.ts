import { IStrategy } from './IStrategy';
import {  DataType } from '../../Core/Enums'
import { Expression } from '../../Core/Expression'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter'
import { IAdaptableBlotterObject } from '../../Core/Interface/IAdaptableBlotter'

export interface IUserFilterStrategy extends IStrategy{
}

export interface IUserFilter extends IAdaptableBlotterObject {
    Name: string;
  //  FriendlyName: string;
    Description: string;
    DataType: DataType;
    IsExpressionSatisfied?: (valueToCheck: any, blotter: IAdaptableBlotter) => boolean;
    Expression: Expression;
    ColumnId?: string
}

   

