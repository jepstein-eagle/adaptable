import { ExpressionString } from './ExpressionString'
import { IExpression, IExpressionRange } from '../Interface/IExpression';
import { EmptyExpression } from './EmptyExpression'
import { BooleanOperatorExpression } from './BooleanOperatorExpression'
import { LeafExpressionOperator } from '../Enums'
import { IColumn } from '../Interface/IAdaptableBlotter'
import { ColumnType } from '../Enums'

export module ExpressionHelper {
    export function ConvertExpressionToString(expressionString: ExpressionString): string {
        let returnValue = ""
        if (IsExpressionEmpty(expressionString)) {
            return "Any";
        }

        let columnList = GetColumnListFromExpression(expressionString)
        for (let columnId of columnList) {
            let columnToString = ""
            let columnValues = expressionString.ColumnValuesExpression.find(x => x.ColumnName == columnId)
            if (columnValues) {
                columnToString = ColumnValuesKeyValuePairToString(columnValues)
            }
            let columnRanges = expressionString.RangeExpression.find(x => x.ColumnName == columnId)
            if (columnRanges) {
                if (columnToString != "") {
                    columnToString += " OR "
                }
                columnToString += RangesToString(columnRanges)
            }
            if (returnValue != "") {
                returnValue += " AND "
            }
            returnValue += "(" + columnToString + ")";
        }
        return returnValue
    }

    export function IsSatisfied(expressionString: ExpressionString, getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string, columnBlotterList: IColumn[]): boolean {
        let expressionColumnList = GetColumnListFromExpression(expressionString)
        for (let columnId of expressionColumnList) {
            //we need either a column value or range to match the column
            let isColumnSatisfied = false
            let columnValues = expressionString.ColumnValuesExpression.find(x => x.ColumnName == columnId)
            if (columnValues) {
                let columnDisplayValue = getDisplayColumnValue(columnValues.ColumnName)
                isColumnSatisfied = columnValues.Values.indexOf(columnDisplayValue) ! > -1
            }
            if (!isColumnSatisfied) {
                let columnRanges = expressionString.RangeExpression.find(x => x.ColumnName == columnId)
                if (columnRanges) {
                    let columnValue = getColumnValue(columnRanges.ColumnName)
                    let column = columnBlotterList.find(x => x.ColumnId == columnRanges.ColumnName)
                    for (let range of columnRanges.Ranges) {
                        let operand1: any
                        let operand2: any
                        switch (column.ColumnType) {
                            case ColumnType.Date:
                                operand1 = Date.parse(range.Operand1)
                                if (range.Operand2 != "") {
                                    operand2 = Date.parse(range.Operand2)
                                }
                                columnValue = columnValue.setHours(0, 0, 0, 0)
                                break
                            case ColumnType.Number:
                                operand1 = Number(range.Operand1)
                                if (range.Operand2 != "") {
                                    operand2 = Number(range.Operand2)
                                }
                                break
                            case ColumnType.Boolean:
                            case ColumnType.Object:
                            case ColumnType.String:
                                operand1 = range.Operand1
                                operand2 = range.Operand2
                                break;
                        }
                        switch (range.Operator) {
                            case LeafExpressionOperator.GreaterThan:
                                isColumnSatisfied = columnValue > operand1;
                                break
                            case LeafExpressionOperator.LessThan:
                                isColumnSatisfied = columnValue < operand1;
                                break
                            case LeafExpressionOperator.Equals:
                                isColumnSatisfied = columnValue == operand1;
                                break
                            case LeafExpressionOperator.NotEquals:
                                isColumnSatisfied = columnValue != operand1;
                                break
                            case LeafExpressionOperator.GreaterThanOrEqual:
                                isColumnSatisfied = columnValue >= operand1;
                                break
                            case LeafExpressionOperator.LessThanOrEqual:
                                isColumnSatisfied = columnValue <= operand1;
                                break
                            case LeafExpressionOperator.Contains:
                                isColumnSatisfied = columnValue.indexOf(operand1) >= 0;
                                break
                            case LeafExpressionOperator.StartsWith:
                                isColumnSatisfied = columnValue.startsWith(operand1);
                                break
                            case LeafExpressionOperator.EndWith:
                                isColumnSatisfied = columnValue.endsWith(operand1) == 0;
                                break
                            case LeafExpressionOperator.Between:
                                isColumnSatisfied = columnValue >= operand1
                                    && columnValue <= operand2;
                                break
                            case LeafExpressionOperator.MatchesRegex:
                                let regex = new RegExp(operand1)
                                isColumnSatisfied = regex.test(columnValue);
                                break
                            default:
                                isColumnSatisfied = false;
                                break
                        }
                        if (isColumnSatisfied) {
                            break;
                        }
                    }
                }
            }
            if (!isColumnSatisfied) {
                return false;
            }
        }
        return true;
    }

    function ColumnValuesKeyValuePairToString(keyValuePair: { ColumnName: string, Values: Array<any> }): string {
        return "[" + keyValuePair.ColumnName + "]"
            + " In (" + keyValuePair.Values.join(", ") + ")"
    }

    export function OperatorToFriendlyString(operator: LeafExpressionOperator): string {
        switch (operator) {
            case LeafExpressionOperator.Unknown:
                return "Unknown"
            case LeafExpressionOperator.GreaterThan:
                return ">"
            case LeafExpressionOperator.LessThan:
                return "<"
            case LeafExpressionOperator.Equals:
                return "="
            case LeafExpressionOperator.NotEquals:
                return "<>"
            case LeafExpressionOperator.GreaterThanOrEqual:
                return ">="
            case LeafExpressionOperator.LessThanOrEqual:
                return "<="
            case LeafExpressionOperator.Between:
                return "Between"
            case LeafExpressionOperator.Contains:
                return "Contains"
            case LeafExpressionOperator.StartsWith:
                return "StartsWith"
            case LeafExpressionOperator.EndWith:
                return "EndWith"
            case LeafExpressionOperator.MatchesRegex:
                return "MatchesRegex"
        }
    }

    function RangesToString(keyValuePair: { ColumnName: string, Ranges: Array<IExpressionRange> }): string {
        let returnValue = ""
        for (let range of keyValuePair.Ranges) {
            if (returnValue != "") {
                returnValue += " OR "
            }
            if (range.Operator == LeafExpressionOperator.Between) {
                returnValue += "[" + keyValuePair.ColumnName + "] " + OperatorToFriendlyString(range.Operator) + " " + range.Operand1 + " AND " + range.Operand2
            }
            else {
                returnValue += "[" + keyValuePair.ColumnName + "] " + OperatorToFriendlyString(range.Operator) + " " + range.Operand1
            }
        }
        return returnValue

    }

    export function GetColumnListFromExpression(expressionString: ExpressionString): Array<string> {
        return Array.from(new Set(expressionString.ColumnValuesExpression.map(x => x.ColumnName).concat(expressionString.RangeExpression.map(x => x.ColumnName))))
    }

    export function IsExpressionEmpty(expressionString: ExpressionString): boolean {
        return expressionString.ColumnValuesExpression.length == 0
            && expressionString.RangeExpression.length == 0
    }

    export function IsExpressionValid(expressionString: ExpressionString): boolean {
        //nothing to check for ColumnValues. 
        //we check that all ranges are properly populated
        return expressionString.RangeExpression.every(x => {
            return x.Ranges.every(range => {
                if (range.Operator == LeafExpressionOperator.Unknown) {
                    return false
                }
                else if (range.Operator == LeafExpressionOperator.Between) {
                    return range.Operand1 != "" && range.Operand2 != ""
                }
                else {
                    return range.Operand1 != ""
                }
            })
        })
    }
}