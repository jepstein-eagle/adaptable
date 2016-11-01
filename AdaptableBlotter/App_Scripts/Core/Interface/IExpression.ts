import {LeafExpressionOperator} from '../Enums'

export interface IExpression {
    IsSatisfied(getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string) : boolean
    ToFriendlyString() : string
}

export interface IExpressionRange{
    Operator : LeafExpressionOperator;
    Operand1 : string;
    Operand2 : string;
}

