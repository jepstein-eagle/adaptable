import { Expression } from './Expression'
import { IRangeExpression, INamedExpression } from '../Interface/IExpression';
import { LeafExpressionOperator } from '../Enums'
import { ColumnType } from '../Enums'
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { FilterState } from '../../Redux/ActionsReducers/Interface/IState';

export module ExpressionHelper {



    export function ConvertExpressionToString(Expression: Expression, columns: Array<IColumn>, blotter: IAdaptableBlotter): string {
        let returnValue = ""
        if (IsExpressionEmpty(Expression)) {
            return "Any";
        }

        let columnList = GetColumnListFromExpression(Expression)
        for (let columnId of columnList) {
            let columnFriendlyName = columns.find(x => x.ColumnId == columnId).ColumnFriendlyName
            let columnToString = ""

            // Column Values
            let columnValues = Expression.ColumnValuesExpressions.find(x => x.ColumnName == columnId)
            if (columnValues) {
                columnToString = ColumnValuesKeyValuePairToString(columnValues, columnFriendlyName)
            }

            // Named Expressions
            let columnNamedExpressions = Expression.NamedExpressions.find(x => x.ColumnName == columnId)
            if (columnNamedExpressions) {
                if (columnToString != "") {
                    columnToString += " OR "
                }
                columnToString = ColumnNamedExpressionsKeyPairToString(GetNamedExpressions(columnNamedExpressions.Named, blotter), columnFriendlyName)
            }

            // Column Ranges
            let columnRanges = Expression.RangeExpressions.find(x => x.ColumnName == columnId)
            if (columnRanges) {
                if (columnToString != "") {
                    columnToString += " OR "
                }
                columnToString += RangesToString(columnRanges, columnFriendlyName)
            }
            if (returnValue != "") {
                returnValue += " AND "
            }
            returnValue += "(" + columnToString + ")";
        }
        return returnValue
    }


    export function IsSatisfied(Expression: Expression, getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string, columnBlotterList: IColumn[], blotter: IAdaptableBlotter, isCaseSensitive: Boolean = true): boolean {
        let expressionColumnList = GetColumnListFromExpression(Expression)

        for (let columnId of expressionColumnList) {

            //we need either a column value or named expression or range to match the column
            let isColumnSatisfied = false

            // check for column values
            let columnValues = Expression.ColumnValuesExpressions.find(x => x.ColumnName == columnId)
            if (columnValues) {
                let columnDisplayValue = getDisplayColumnValue(columnValues.ColumnName)
                isColumnSatisfied = columnValues.ColumnValues.findIndex(v => v == columnDisplayValue) != -1;
            }

            // Check for named expressions if column fails
            if (!isColumnSatisfied) {
                let columnNamedExpressions = Expression.NamedExpressions.find(x => x.ColumnName == columnId)
                if (columnNamedExpressions) {
                    let namedExpressions: INamedExpression[] = GetNamedExpressions(columnNamedExpressions.Named, blotter);
                    for (let namedExpression of namedExpressions) {
                        // Predefined NamedValueExpressions have a method which we evaluate to get the value; created NamedValueExpressions simply contain an Expression which we evaluate normally
                        if (namedExpression.IsPredefined) {
                            let valueToCheck: any = getColumnValue(columnId);
                            isColumnSatisfied = namedExpression.IsExpressionSatisfied(valueToCheck);
                        } else {
                            isColumnSatisfied = IsSatisfied(namedExpression.Expression, getColumnValue, getDisplayColumnValue, columnBlotterList, blotter, isCaseSensitive);
                        }
                        if (isColumnSatisfied) {
                            break;
                        }
                    }
                }
            }

            // Check for ranges if column and named expressions have failed
            if (!isColumnSatisfied) {
                let columnRanges = Expression.RangeExpressions.find(x => x.ColumnName == columnId)
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

                                // added by JW to allow quicksearch to choose case sensitivity - hope this is right
                                // only going to worry about it for string columns
                                if (!isCaseSensitive) {
                                    operand1 = operand1.toLowerCase();
                                    operand2 = operand2.toLowerCase();
                                    columnValue = columnValue.toLowerCase();
                                }
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
                            case LeafExpressionOperator.EndsWith:
                                isColumnSatisfied = columnValue.endsWith(operand1);
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

    function ColumnValuesKeyValuePairToString(keyValuePair: { ColumnName: string, ColumnValues: Array<any> }, columnFriendlyName: string): string {
        return "[" + columnFriendlyName + "]"
            + " In (" + keyValuePair.ColumnValues.join(", ") + ")"
    }

    function ColumnNamedExpressionsKeyPairToString(namedExpressions: INamedExpression[], columnFriendlyName: string): string {
        let returnValue = ""
        for (let namedExpression of namedExpressions) {
            if (returnValue != "") {
                returnValue += " OR "
            }
            returnValue += "[" + columnFriendlyName + "] " + namedExpression.FriendlyName;
        }
        return returnValue
    }

    export function GetNamedExpressions(namedExpressionUids: string[], blotter: IAdaptableBlotter): INamedExpression[] {
        return blotter.AdaptableBlotterStore.TheStore.getState().Filter.Filters.filter(f => namedExpressionUids.find(uid => uid == f.Uid) != null)
    }

    export function ShouldShowNamedExpressionForColumn(expressionUid: string, column: IColumn, blotter: IAdaptableBlotter): boolean {
        let namedExpression: INamedExpression = blotter.AdaptableBlotterStore.TheStore.getState().Filter.Filters.find(f => f.Uid == expressionUid);

        // predefined expressions return if its right column type
        if (namedExpression.IsPredefined) {
            return namedExpression.ColumnType == column.ColumnType;
        }

        // see if there are any columnvalues and then get the first only
        if (namedExpression.Expression.ColumnValuesExpressions != null && namedExpression.Expression.ColumnValuesExpressions.length > 0) {
            return namedExpression.Expression.ColumnValuesExpressions[0].ColumnName == column.ColumnId;
        }

        // see if there are any named expressions and then get the first only
        if (namedExpression.Expression.NamedExpressions != null && namedExpression.Expression.NamedExpressions.length > 0) {
            return namedExpression.Expression.NamedExpressions[0].ColumnName == column.ColumnId;
        }

        // see if there are any ranges and then get the first only
        if (namedExpression.Expression.RangeExpressions != null && namedExpression.Expression.RangeExpressions.length > 0) {
            return namedExpression.Expression.RangeExpressions[0].ColumnName == column.ColumnId;
        }

        return false;
    }

    export function GetColumnTypeForNamedExpression(namedExpression: INamedExpression, Columns: Array<IColumn>): ColumnType {

        // predefined expressions return if its right column type
        if (namedExpression.IsPredefined) {
            return namedExpression.ColumnType;
        }

        // see if there are any columnvalues and then get the first only
        if (namedExpression.Expression.ColumnValuesExpressions != null && namedExpression.Expression.ColumnValuesExpressions.length > 0) {
            let columnID: string = namedExpression.Expression.ColumnValuesExpressions[0].ColumnName;
            return Columns.find(c => c.ColumnId == columnID).ColumnType;
        }

        // see if there are any ranges and then get the first only
        if (namedExpression.Expression.RangeExpressions != null && namedExpression.Expression.RangeExpressions.length > 0) {
            let columnID: string = namedExpression.Expression.RangeExpressions[0].ColumnName;
            return Columns.find(c => c.ColumnId == columnID).ColumnType;
        }
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
            case LeafExpressionOperator.EndsWith:
                return "EndWith"
            case LeafExpressionOperator.MatchesRegex:
                return "MatchesRegex"
        }
    }

    function RangesToString(keyValuePair: { ColumnName: string, Ranges: Array<IRangeExpression> }, columnFriendlyName: string): string {
        let returnValue = ""
        for (let range of keyValuePair.Ranges) {
            if (returnValue != "") {
                returnValue += " OR "
            }
            if (range.Operator == LeafExpressionOperator.Between) {
                returnValue += "[" + columnFriendlyName + "] " + OperatorToFriendlyString(range.Operator) + " " + range.Operand1 + " AND " + range.Operand2
            }
            else {
                returnValue += "[" + columnFriendlyName + "] " + OperatorToFriendlyString(range.Operator) + " " + range.Operand1
            }
        }
        return returnValue

    }

    export function GetColumnListFromExpression(Expression: Expression): Array<string> {
        return Array.from(new Set(Expression.ColumnValuesExpressions.map(x => x.ColumnName).concat(Expression.NamedExpressions.map(x => x.ColumnName)).concat(Expression.RangeExpressions.map(x => x.ColumnName))))
    }

    export function IsExpressionEmpty(Expression: Expression): boolean {
        return Expression.ColumnValuesExpressions.length == 0
            && Expression.NamedExpressions.length == 0
            && Expression.RangeExpressions.length == 0
    }

    export function IsExpressionValid(Expression: Expression): boolean {
        //nothing to check for ColumnValues. 
        //we check that all ranges are properly populated
        return Expression.RangeExpressions.every(x => {
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

    export function CreateEmptyExpression(): Expression {
        return new Expression([], [], [])
    }

    export function checkForExpression(Expression: Expression, identifierValue: any, columns: IColumn[], blotter: IAdaptableBlotter, isCaseSensitive: Boolean = true): boolean {
        let returnVal: boolean = (

            this.IsSatisfied(
                Expression,
                blotter.getRecordIsSatisfiedFunction(identifierValue, "getColumnValue"),
                blotter.getRecordIsSatisfiedFunction(identifierValue, "getDisplayColumnValue"),
                columns,
                blotter,
                isCaseSensitive
            ))

        return returnVal;
    }




} 