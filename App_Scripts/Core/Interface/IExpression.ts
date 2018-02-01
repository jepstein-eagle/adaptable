import { LeafExpressionOperator, DataType } from '../Enums'
import { Expression } from '../Expression'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter'
import { IConfigEntity } from './IAdaptableBlotter'



export interface IRangeExpression {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
}

export interface IUserFilter extends IConfigEntity {
    Uid: string;
    FriendlyName: string;
    Description: string;
    DataType: DataType;
    IsExpressionSatisfied?: (valueToCheck: any, blotter: IAdaptableBlotter) => boolean;
    Expression: Expression;
    ColumnId?: string
}

export interface IRangeEvaluation {
     operand1: any;
     operand2: any;
     newValue: any;
}