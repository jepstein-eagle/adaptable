import { LeafExpressionOperator, ColumnType } from '../Enums'
import { Expression } from '../Expression/Expression'


//export interface IColumnValuesExpression {
//   ColumnValue: any;
//   ColumnType: Number
//}

export interface IRangeExpression {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
}

export interface IUserFilterExpression {
    Uid: string;
    FriendlyName: string;
    Description: string;
    ColumnType: ColumnType;
    IsExpressionSatisfied(valueToCheck: any): boolean;
    Expression: Expression,
    IsPredefined: boolean
}
