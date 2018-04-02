import { LeafExpressionOperator, DataType, RangeOperandType } from '../Enums'

export interface IRange {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
    Operand1Type: RangeOperandType
    Operand2Type: RangeOperandType
}


export interface IRangeEvaluation {
     operand1: any;
     operand2: any;
     newValue: any;
     operator: LeafExpressionOperator;
     initialValue: any
}
