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

export interface INamedExpression {
    Uid: string;
    FriendlyName: string;
    ColumnType: ColumnType;
    isExpressionSatisfied(valueToCheck: any): boolean;
    Expression: Expression,
    IsPredefined: boolean
}
