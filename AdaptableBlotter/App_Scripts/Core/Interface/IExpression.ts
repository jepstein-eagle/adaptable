import { LeafExpressionOperator, ColumnType } from '../Enums'

export interface IExpressionRange {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
}

export interface IExpressionFilter {
    ExpressionName: string;
    ColumnType: ColumnType;
    isExpressionSatisfied(valueToCheck: any): boolean;
}




