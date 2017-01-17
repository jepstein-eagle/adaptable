import { LeafExpressionOperator, ColumnType } from '../Enums'
import { Expression } from '../Expression/Expression'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter'


//export interface IColumnValuesExpression {
//   ColumnValue: any;
//   ColumnType: Number
//}

export interface IRangeExpression {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
}

export interface IUserFilter {
    Uid: string;
    FriendlyName: string;
    Description: string;
    ColumnType: ColumnType;
    IsExpressionSatisfied(valueToCheck: any, blotter: IAdaptableBlotter): boolean;
    Expression: Expression,
    IsPredefined: boolean
}