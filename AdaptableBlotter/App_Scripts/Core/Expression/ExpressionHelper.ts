import { ExpressionString } from './ExpressionString'
import { IExpression } from '../Interface/IExpression';
import { EmptyExpression } from './EmptyExpression'
import { BooleanOperatorExpression } from './BooleanOperatorExpression'

export module ExpressionHelper {
    export function ConvertExpressionToString(expressionString: ExpressionString): string {
        //taking care of ColumnValues first
        if (expressionString.ColumnValuesExpression.length == 0) {
            return "Any";
        }
        else if (expressionString.ColumnValuesExpression.length == 1) {
            return ColumnValuesKeyValuePairToString(expressionString.ColumnValuesExpression[0])
        }
        else {
            let returnValue = ""
            for (let keyValue of expressionString.ColumnValuesExpression) {
                if (returnValue != "") {
                    returnValue += " AND "
                }
                returnValue += ColumnValuesKeyValuePairToString(keyValue);
            }
            return returnValue;
        }
    }

    export function IsSatisfied(expressionString: ExpressionString, getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string): boolean {
        //takes care of ColumnValues first
        for (let keyValuePair of expressionString.ColumnValuesExpression) {
            let columnDisplayValue = getDisplayColumnValue(keyValuePair.ColumnName)
            if(keyValuePair.Values.indexOf(columnDisplayValue) == -1){
                return false;
            }
        }
        //TODO : implementation for Filter and Ranges
        return true;
    }

    function ColumnValuesKeyValuePairToString(keyValuePair: { ColumnName: string, Values: Array<any> }): string {
        return "([" + keyValuePair.ColumnName + "]"
            + " In (" + keyValuePair.Values.join() + ")"
    }
}