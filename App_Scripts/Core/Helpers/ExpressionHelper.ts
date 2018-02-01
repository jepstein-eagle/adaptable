import { Expression } from '../Expression'
import { UserFilterHelper } from '../Helpers/UserFilterHelper'
import { IRangeExpression, IRangeEvaluation, IUserFilter } from '../Interface/IExpression';
import { LeafExpressionOperator } from '../Enums'
import { DataType } from '../Enums'
import { Helper } from '../../Core/Helpers/Helper';
import { StringExtensions } from '../../Core/Extensions';
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { IDataChangedEvent, IDataChangingEvent } from '../Services/Interface/IAuditService';
import { initialiseAgGridWithAngular1 } from 'ag-grid/dist/lib/components/agGridNg1';


export module ExpressionHelper {
    export function CreateSingleColumnExpression(columnName: string,
        ColumnDisplayValues: Array<string>,
        ColumnRawalues: Array<any>,
        UserFilterUids: Array<string>,
        Ranges: Array<IRangeExpression>) {
        return new Expression(ColumnDisplayValues && ColumnDisplayValues.length > 0 ? [{ ColumnName: columnName, ColumnValues: ColumnDisplayValues }] : [],
            ColumnRawalues && ColumnRawalues.length > 0 ? [{ ColumnName: columnName, ColumnValues: ColumnRawalues }] : [],
            UserFilterUids && UserFilterUids.length > 0 ? [{ ColumnName: columnName, UserFilterUids: UserFilterUids }] : [],
            Ranges && Ranges.length > 0 ? [{ ColumnName: columnName, Ranges: Ranges }] : []
        )
    }

    export function ConvertExpressionToString(Expression: Expression, columns: Array<IColumn>, userFilters: IUserFilter[]): string {
        let returnValue = ""
        if (IsExpressionEmpty(Expression)) {
            return "Any";
        }

        let columnList = GetColumnListFromExpression(Expression)
        for (let columnId of columnList) {
            let column = columns.find(x => x.ColumnId == columnId)
            let columnFriendlyName: string
            if (column) {
                columnFriendlyName = column.FriendlyName
            }
            else {
                columnFriendlyName = columnId + Helper.MissingColumnMagicString
                console.warn("Could not find column id:" + columnId)
            }
            let columnToString = ""

            // Column Display Values
            let columnDisplayValues = Expression.ColumnDisplayValuesExpressions.find(x => x.ColumnName == columnId)
            if (columnDisplayValues) {
                columnToString = ColumnValuesKeyValuePairToString(columnDisplayValues, columnFriendlyName)
            }

            // Column Raw Values
            let columnRawValues = Expression.ColumnRawValuesExpressions.find(x => x.ColumnName == columnId)
            if (columnRawValues) {
                if (columnToString != "") {
                    columnToString += " OR "
                }
                columnToString += ColumnValuesKeyValuePairToString(columnRawValues, columnFriendlyName)
            }

            // User Filters
            let columnUserFilters = Expression.UserFilters.find(x => x.ColumnName == columnId)
            if (columnUserFilters) {
                if (columnToString != "") {
                    columnToString += " OR "
                }
                columnToString += ColumnUserFiltersKeyPairToString(UserFilterHelper.GetUserFilters(userFilters, columnUserFilters.UserFilterUids), columnFriendlyName)
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


    export function IsSatisfied(Expression: Expression, getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string, columnBlotterList: IColumn[], userFilters: IUserFilter[], blotter: IAdaptableBlotter): boolean {
        let expressionColumnList = GetColumnListFromExpression(Expression)

        for (let columnId of expressionColumnList) {
            //we need either a column value or user filter expression or range to match the column
            let isColumnSatisfied = false

            let column = columnBlotterList.find(x => x.ColumnId == columnId)
            if (!column) {
                console.warn("Could not find column id:" + columnId)
                isColumnSatisfied = true
            }

            // check for display column values
            if (!isColumnSatisfied) {
                let columnDisplayValues = Expression.ColumnDisplayValuesExpressions.find(x => x.ColumnName == columnId)
                if (columnDisplayValues) {
                    let columnDisplayValue = getDisplayColumnValue(columnDisplayValues.ColumnName)
                    isColumnSatisfied = columnDisplayValues.ColumnValues.findIndex(v => v == columnDisplayValue) != -1;
                }
            }

            // check for raw column values
            if (!isColumnSatisfied) {
                let columnRawValues = Expression.ColumnRawValuesExpressions.find(x => x.ColumnName == columnId)
                if (columnRawValues) {
                    let columnRawValue = getColumnValue(columnRawValues.ColumnName)
                    isColumnSatisfied = columnRawValues.ColumnValues.findIndex(v => v == columnRawValue) != -1;
                }
            }

            // Check for user filter expressions if column fails
            if (!isColumnSatisfied) {
                let columnUserFilters = Expression.UserFilters.find(x => x.ColumnName == columnId)
                if (columnUserFilters) {
                    let filteredUserFilters: IUserFilter[] = UserFilterHelper.GetUserFilters(userFilters, columnUserFilters.UserFilterUids);
                    for (let userFilter of filteredUserFilters) {
                        // System userfilters have a method which we evaluate to get the value; created NamedValueExpressions simply contain an Expression which we evaluate normally
                        if (UserFilterHelper.IsSystemUserFilter(userFilter)) {
                            let valueToCheck: any = getColumnValue(columnId);
                            isColumnSatisfied = userFilter.IsExpressionSatisfied(valueToCheck, blotter);
                        } else {
                            isColumnSatisfied = IsSatisfied(userFilter.Expression, getColumnValue, getDisplayColumnValue, columnBlotterList, userFilters, blotter);
                        }
                        if (isColumnSatisfied) {
                            break;
                        }
                    }
                }
            }

            // Check for ranges if column and user filter expressions have failed
            if (!isColumnSatisfied) {
                let columnRanges = Expression.RangeExpressions.find(x => x.ColumnName == columnId)
                if (columnRanges) {
                    let column = columnBlotterList.find(x => x.ColumnId == columnRanges.ColumnName)

                    for (let range of columnRanges.Ranges) {
                        let rangeEvaluation: IRangeEvaluation = ExpressionHelper.GetRangeEvaluation(range, getColumnValue(columnRanges.ColumnName), column)

                        isColumnSatisfied = ExpressionHelper.TestRangeEvaluation(rangeEvaluation, range.Operator, null);
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

    function ColumnUserFiltersKeyPairToString(userFilters: IUserFilter[], columnFriendlyName: string): string {
        let returnValue = ""
        for (let userFilter of userFilters) {
            if (returnValue != "") {
                returnValue += " OR "
            }
            returnValue += "[" + columnFriendlyName + "] " + userFilter.FriendlyName;
        }
        return returnValue
    }

    export function OperatorToFriendlyString(operator: LeafExpressionOperator): string {
        switch (operator) {
            case LeafExpressionOperator.Unknown:
                return "Select"
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
                return "Starts With"
            case LeafExpressionOperator.EndsWith:
                return "Ends With"
            case LeafExpressionOperator.Regex:
                return "Regex"
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
        return Array.from(new Set(Expression.ColumnDisplayValuesExpressions.map(x => x.ColumnName)
            .concat(Expression.ColumnRawValuesExpressions.map(x => x.ColumnName))
            .concat(Expression.UserFilters.map(x => x.ColumnName))
            .concat(Expression.RangeExpressions.map(x => x.ColumnName))))
    }

    export function IsExpressionEmpty(Expression: Expression): boolean {
        return Expression.ColumnDisplayValuesExpressions.length == 0
            && Expression.ColumnRawValuesExpressions.length == 0
            && Expression.UserFilters.length == 0
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


    export function checkForExpression(Expression: Expression, identifierValue: any, columns: IColumn[], blotter: IAdaptableBlotter): boolean {
        return IsSatisfied(
            Expression,
            blotter.getRecordIsSatisfiedFunction(identifierValue, "getColumnValue"),
            blotter.getRecordIsSatisfiedFunction(identifierValue, "getDisplayColumnValue"),
            columns,
            blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters,
            blotter
        );
    }

    export function checkForExpressionFromRecord(Expression: Expression, record: any, columns: IColumn[], blotter: IAdaptableBlotter): boolean {
        return IsSatisfied(
            Expression,
            blotter.getRecordIsSatisfiedFunctionFromRecord(record, "getColumnValue"),
            blotter.getRecordIsSatisfiedFunctionFromRecord(record, "getDisplayColumnValue"),
            columns,
            blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters,
            blotter
        );
    }

    export function CreateEmptyExpression(): Expression {
        return new Expression([], [], [], [])
    }


    export function GetRangeEvaluation(rangeExpression: IRangeExpression, initialValue: any, column: IColumn): IRangeEvaluation {
        let rangeEvaluation: IRangeEvaluation = {
            operand1: rangeExpression.Operand1,
            operand2: rangeExpression.Operand2,
            newValue: initialValue
        }
        switch (column.DataType) {
            case DataType.Date:
                rangeEvaluation.operand1 = Date.parse(rangeExpression.Operand1)
                if (StringExtensions.IsNotEmpty(rangeExpression.Operand2)) {
                    rangeEvaluation.operand2 = Date.parse(rangeExpression.Operand2)
                }
                rangeEvaluation.newValue = initialValue.setHours(0, 0, 0, 0)
                break
            case DataType.Number:
                rangeEvaluation.operand1 = Number(rangeExpression.Operand1)
                if (StringExtensions.IsNotEmpty(rangeExpression.Operand2)) {
                    rangeEvaluation.operand2 = Number(rangeExpression.Operand2);
                }
                rangeEvaluation.newValue = initialValue;
                break
            case DataType.Boolean:
                rangeEvaluation.newValue = initialValue;
                break;
            case DataType.Object:
            case DataType.String:
                rangeEvaluation.operand1 = rangeExpression.Operand1.toLowerCase();
                rangeEvaluation.operand2 = rangeExpression.Operand2.toLowerCase();
                rangeEvaluation.newValue = initialValue.toLowerCase();
                break;
        }
        return rangeEvaluation;
    }

    export function TestRangeEvaluation(rangeEvaluation: IRangeEvaluation, leafOperator: LeafExpressionOperator, existingValue: any): boolean {

        switch (leafOperator) {
            case LeafExpressionOperator.Equals:
                return rangeEvaluation.newValue == rangeEvaluation.operand1;
            case LeafExpressionOperator.NotEquals:
                return rangeEvaluation.newValue != rangeEvaluation.operand1;
            case LeafExpressionOperator.GreaterThan:
                return rangeEvaluation.newValue > rangeEvaluation.operand1;
            case LeafExpressionOperator.LessThan:
                return rangeEvaluation.newValue < rangeEvaluation.operand1;
            case LeafExpressionOperator.GreaterThanOrEqual:
                return rangeEvaluation.newValue >= rangeEvaluation.operand1;
            case LeafExpressionOperator.LessThanOrEqual:
                return rangeEvaluation.newValue <= rangeEvaluation.operand1;
            case LeafExpressionOperator.PercentChange:
                let oldPercentValue: any = existingValue;
                let percentChange: number = Math.abs(100 - Math.abs(rangeEvaluation.newValue * 100 / oldPercentValue))
                return percentChange < Number(rangeEvaluation.operand1);
            case LeafExpressionOperator.ValueChange:
                let oldChangeValue: any = existingValue;
                let changeInValue: number = Math.abs(rangeEvaluation.newValue - oldChangeValue);
                return changeInValue < Number(rangeEvaluation.operand1);
            case LeafExpressionOperator.Between:
                return (rangeEvaluation.newValue > rangeEvaluation.operand1 && rangeEvaluation.newValue < rangeEvaluation.operand2);
            case LeafExpressionOperator.NotBetween:
                return !(rangeEvaluation.newValue > rangeEvaluation.operand1 && rangeEvaluation.newValue < rangeEvaluation.operand2);
            case LeafExpressionOperator.IsPositive:
                return (rangeEvaluation.newValue > 0);
            case LeafExpressionOperator.IsNegative:
                return (rangeEvaluation.newValue < 0);
            case LeafExpressionOperator.IsTrue:
                return (rangeEvaluation.newValue == true);
            case LeafExpressionOperator.IsFalse:
                return (rangeEvaluation.newValue == false);
            case LeafExpressionOperator.Contains:
                return rangeEvaluation.newValue.indexOf(rangeEvaluation.operand1) >= 0;
            case LeafExpressionOperator.StartsWith:
                return rangeEvaluation.newValue.startsWith(rangeEvaluation.operand1);
            case LeafExpressionOperator.EndsWith:
                return rangeEvaluation.newValue.endsWith(rangeEvaluation.operand1);
            case LeafExpressionOperator.Regex:
                let regex = new RegExp(rangeEvaluation.operand1)
                return regex.test(rangeEvaluation.newValue);
        }
        return false;
    }

} 