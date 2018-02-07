import { LeafExpressionOperator, DataType } from '../Enums'

export interface IRangeExpression {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
}

export interface IRangeEvaluation {
     operand1: any;
     operand2: any;
     newValue: any;
     operator: LeafExpressionOperator;
     initialValue: any
}