import { ExpressionString } from './ExpressionString'
import {  IExpressionRange } from '../Interface/IExpression';
import {  ConditionalStyleColour, LeafExpressionOperator } from '../Enums';


export interface IPredefinedExpressionInfo {
    Id: string
    FriendlyName: string
    ConditionalStyleColour: ConditionalStyleColour
    Operator: LeafExpressionOperator
    Operand1: string
    Operand2: string
}

export module PredefinedExpressionHelper {
 export function CreatePredefinedExpression(columnName: string, predefinedExpression: IPredefinedExpressionInfo): ExpressionString {

        let columnValuesExpression: Array<{ ColumnName: string, Values: Array<any> }> = [];

        let expressionRange: IExpressionRange = { Operand1: predefinedExpression.Operand1, Operator: predefinedExpression.Operator, Operand2: predefinedExpression.Operand2 };
        let expressionRanges: Array<IExpressionRange> = [];
        expressionRanges.push(expressionRange);
        let singleRangeExpression: { ColumnName: string, Ranges: Array<IExpressionRange> } = { ColumnName: columnName, Ranges: expressionRanges }
        let rangeExpression: Array<{ ColumnName: string, Ranges: Array<IExpressionRange> }> = [];
        rangeExpression.push(singleRangeExpression);
        return new ExpressionString(columnValuesExpression, "Any", rangeExpression);
    }

    export function GetPredefinedExpressions(): IPredefinedExpressionInfo[] {
        return [
            { Id: "PositiveGreen", FriendlyName: "Positive numbers in green font", ConditionalStyleColour: ConditionalStyleColour.GreenFont, Operator: LeafExpressionOperator.GreaterThanOrEqual, Operand1: "0", Operand2: "" },
            { Id: "NegativeRed", FriendlyName: "Negative numbers in red font", ConditionalStyleColour: ConditionalStyleColour.RedFont, Operator: LeafExpressionOperator.LessThan, Operand1: "0", Operand2: "" },
        ]
    }

}

