import { Expression } from '../Expression'
import { FilterHelper } from '../Helpers/FilterHelper'
import { IRange, IRangeEvaluation } from '../Interface/IRange';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { LeafExpressionOperator, RangeOperandType } from '../Enums'
import { DataType } from '../Enums'
import { Helper } from '../../Core/Helpers/Helper';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants';
import { IColumn } from '../Interface/IColumn';


export module ExpressionHelper {
    export function CreateSingleColumnExpression(columnName: string,
        ColumnDisplayValues: Array<string>,
        ColumnRawValues: Array<any>,
        UserFilters: Array<string>,
        Ranges: Array<IRange>) {
        return new Expression(ColumnDisplayValues && ColumnDisplayValues.length > 0 ? [{ ColumnName: columnName, ColumnDisplayValues: ColumnDisplayValues }] : [],
            ColumnRawValues && ColumnRawValues.length > 0 ? [{ ColumnName: columnName, ColumnRawValues: ColumnRawValues }] : [],
            UserFilters && UserFilters.length > 0 ? [{ ColumnName: columnName, Filters: UserFilters }] : [],
            Ranges && Ranges.length > 0 ? [{ ColumnName: columnName, Ranges: Ranges }] : []
        )
    }

    export function ConvertExpressionToString(Expression: Expression, columns: Array<IColumn>, filters: any): string {
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
                columnFriendlyName = columnId + GeneralConstants.MISSING_COLUMN
                console.warn("Could not find column id:" + columnId)
            }
            let columnToString = ""

            // Column Display Values
            let columnDisplayValues = Expression.ColumnDisplayValuesExpressions.find(x => x.ColumnName == columnId)
            if (columnDisplayValues) {
                columnToString = ColumnDisplayValuesKeyValuePairToString(columnDisplayValues, columnFriendlyName)
            }

            // Column Raw Values
            let columnRawValues = Expression.ColumnRawValuesExpressions.find(x => x.ColumnName == columnId)
            if (columnRawValues) {
                if (columnToString != "") {
                    columnToString += " OR "
                }
                columnToString += ColumnRawValuesKeyValuePairToString(columnRawValues, columnFriendlyName)
            }

            // User Filters
            let columnUserFilters = Expression.FilterExpressions.find(x => x.ColumnName == columnId)
            if (columnUserFilters) {
                if (columnToString != "") {
                    columnToString += " OR "
                }
                columnToString += ColumnUserFiltersKeyPairToString(columnUserFilters.Filters, columnFriendlyName)
            }

            // Column Ranges
            let columnRanges = Expression.RangeExpressions.find(x => x.ColumnName == columnId)
            if (columnRanges) {
                if (columnToString != "") {
                    columnToString += " OR "
                }
                columnToString += RangesToString(columnRanges, columnFriendlyName, columns)
            }
            if (returnValue != "") {
                returnValue += " AND "
            }
            returnValue += "(" + columnToString + ")";
        }
        return returnValue
    }


    export function IsSatisfied(Expression: Expression, getColumnValue: (columnName: string) => any, getDisplayColumnValue: (columnName: string) => string, getOtherColumnValue: (columnName: string) => any, columnBlotterList: IColumn[], userFilters: IUserFilter[], systemFilters: string[], blotter: IAdaptableBlotter): boolean {
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
                    isColumnSatisfied = columnDisplayValues.ColumnDisplayValues.findIndex(v => v == columnDisplayValue) != -1;
                }
            }

            // check for raw column values
            if (!isColumnSatisfied) {
                let columnRawValues = Expression.ColumnRawValuesExpressions.find(x => x.ColumnName == columnId)
                if (columnRawValues) {
                    let columnRawValue = getColumnValue(columnRawValues.ColumnName)
                    isColumnSatisfied = columnRawValues.ColumnRawValues.findIndex(v => v == columnRawValue) != -1;
                }
            }

            // Check for filter expressions if column fails
            if (!isColumnSatisfied) {
                let columnFilters = Expression.FilterExpressions.find(x => x.ColumnName == columnId)
                if (columnFilters) {
                    // first evaluate any user filters
                    let filteredUserFilters: IUserFilter[] = FilterHelper.GetUserFilters(userFilters, columnFilters.Filters);
                    for (let userFilter of filteredUserFilters) {
                        isColumnSatisfied = IsSatisfied(userFilter.Expression, getColumnValue, getDisplayColumnValue, getOtherColumnValue, columnBlotterList, userFilters, systemFilters, blotter);
                        if (isColumnSatisfied) {
                            break;
                        }
                    }

                    // then evaluate any system filters
                    if (!isColumnSatisfied) {
                        let filteredSystemFilters: string[] = systemFilters.filter(f => columnFilters.Filters.find(u => u == f) != null)
                        for (let systemFilter of filteredSystemFilters) {
                            let valueToCheck: any = getColumnValue(columnId);
                            let satisfyFunction: any = FilterHelper.GetFunctionForSystemFilter(systemFilter)
                            isColumnSatisfied = satisfyFunction.IsExpressionSatisfied(valueToCheck, blotter);
                            if (isColumnSatisfied) {
                                break;
                            }
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
                        let rangeEvaluation: IRangeEvaluation = ExpressionHelper.GetRangeEvaluation(range, getColumnValue(columnRanges.ColumnName), null, column, blotter, getOtherColumnValue)

                        isColumnSatisfied = ExpressionHelper.TestRangeEvaluation(rangeEvaluation);
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

    function ColumnDisplayValuesKeyValuePairToString(keyValuePair: { ColumnName: string, ColumnDisplayValues: Array<any> }, columnFriendlyName: string): string {
        return "[" + columnFriendlyName + "]"
            + " In (" + keyValuePair.ColumnDisplayValues.join(", ") + ")"
    }

    function ColumnRawValuesKeyValuePairToString(keyValuePair: { ColumnName: string, ColumnRawValues: Array<any> }, columnFriendlyName: string): string {
        return "[" + columnFriendlyName + "]"
            + " In (" + keyValuePair.ColumnRawValues.join(", ") + ")"
    }

    function ColumnUserFiltersKeyPairToString(userFilters: string[], columnFriendlyName: string): string {
        let returnValue = ""
        for (let userFilter of userFilters) {
            if (returnValue != "") {
                returnValue += " OR "
            }
            returnValue += "[" + columnFriendlyName + "] " + userFilter;
        }
        return returnValue
    }

    export function OperatorToShortFriendlyString(operator: LeafExpressionOperator): string {
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
            case LeafExpressionOperator.NotContains:
                return "Not Contains"
            case LeafExpressionOperator.StartsWith:
                return "Starts With"
            case LeafExpressionOperator.EndsWith:
                return "Ends With"
            case LeafExpressionOperator.Regex:
                return "Regex"
        }
    }

    export function OperatorToLongFriendlyString(leafExpressionOperator: LeafExpressionOperator, dataType: DataType): string {
        switch (leafExpressionOperator) {
            case LeafExpressionOperator.None:
                return "Any Edit"
            case LeafExpressionOperator.Unknown:
                return "Select Operator "
            case LeafExpressionOperator.Equals:
                return "Equals "
            case LeafExpressionOperator.NotEquals:
                return "Not Equals "
            case LeafExpressionOperator.GreaterThan:
                if (dataType == DataType.Date) {
                    return "After "
                } else {
                    return "Greater Than "
                }
            case LeafExpressionOperator.LessThan:
                if (dataType == DataType.Date) {
                    return "Before "
                } else {
                    return "Less Than "
                }
            case LeafExpressionOperator.GreaterThanOrEqual:
                if (dataType == DataType.Date) {
                    return "After or On "
                } else {
                    return "Greater Than or Equals "
                }
            case LeafExpressionOperator.LessThanOrEqual:
                if (dataType == DataType.Date) {
                    return "Before or On "
                } else {
                    return "Less Than or Equals "
                }
            case LeafExpressionOperator.Between:
                return " Between "
            case LeafExpressionOperator.NotBetween:
                return "Not Between "
            case LeafExpressionOperator.IsPositive:
                return "Is Positive ";
            case LeafExpressionOperator.IsNegative:
                return "Is Negative ";
            case LeafExpressionOperator.ValueChange:
                return "Change In Value Greater Than "
            case LeafExpressionOperator.PercentChange:
                return "% Change Is Greater Than "
            case LeafExpressionOperator.IsTrue:
                return "Is True "
            case LeafExpressionOperator.IsFalse:
                return "Is False "
            case LeafExpressionOperator.Contains:
                return "Contains "
            case LeafExpressionOperator.NotContains:
                return "Not Contains "
            case LeafExpressionOperator.StartsWith:
                return "Starts With "
            case LeafExpressionOperator.EndsWith:
                return "Ends With "
            case LeafExpressionOperator.Regex:
                return "Matches Expression "

        }
    }

    export function GetOperatorsForDataType(dataType: DataType): LeafExpressionOperator[] {
        switch (dataType) {
            case DataType.Boolean:
                return null;
            case DataType.Number:
            case DataType.Date:
                return [
                    LeafExpressionOperator.Unknown,
                    LeafExpressionOperator.GreaterThan,
                    LeafExpressionOperator.GreaterThanOrEqual,
                    LeafExpressionOperator.LessThan,
                    LeafExpressionOperator.LessThanOrEqual,
                    LeafExpressionOperator.Equals,
                    LeafExpressionOperator.NotEquals,
                    LeafExpressionOperator.Between];
            case DataType.String:
                return [
                    LeafExpressionOperator.Unknown,
                    LeafExpressionOperator.Contains,
                    LeafExpressionOperator.NotContains,
                    LeafExpressionOperator.StartsWith,
                    LeafExpressionOperator.EndsWith,
                    LeafExpressionOperator.Equals,
                    LeafExpressionOperator.NotEquals,
                    LeafExpressionOperator.Regex];
            default:
                return [LeafExpressionOperator.Unknown, LeafExpressionOperator.GreaterThan, LeafExpressionOperator.Between];
        }
    }

    function RangesToString(keyValuePair: { ColumnName: string, Ranges: Array<IRange> }, columnFriendlyName: string, columns: IColumn[]): string {
        let returnValue = ""
        for (let range of keyValuePair.Ranges) {
            if (returnValue != "") {
                returnValue += " OR "
            }
            if (range.Operator == LeafExpressionOperator.Between) {
                returnValue += "[" + columnFriendlyName + "] " + OperatorToShortFriendlyString(range.Operator) + " " + getOperandValue(range.Operand1Type, range.Operand1, columns) + " AND " + getOperandValue(range.Operand2Type, range.Operand2, columns)
            } else {
                returnValue += "[" + columnFriendlyName + "] " + OperatorToShortFriendlyString(range.Operator) + " " + getOperandValue(range.Operand1Type, range.Operand1, columns)
            }
        }
        return returnValue

    }

    function getOperandValue(rangeOperatorType: RangeOperandType, operand: string, columns: IColumn[]): string {
        if (rangeOperatorType == RangeOperandType.Value) {
            return operand;
        } else {
            let column: IColumn = columns.find(c => c.ColumnId == operand);
            return (column) ? "[" + column.FriendlyName + "]" : GeneralConstants.MISSING_COLUMN
        }
    }

    export function GetColumnListFromExpression(Expression: Expression): Array<string> {
        return Array.from(new Set(Expression.ColumnDisplayValuesExpressions.map(x => x.ColumnName)
            .concat(Expression.ColumnRawValuesExpressions.map(x => x.ColumnName))
            .concat(Expression.FilterExpressions.map(x => x.ColumnName))
            .concat(Expression.RangeExpressions.map(x => x.ColumnName))))
    }

    export function IsExpressionEmpty(Expression: Expression): boolean {
        return Expression.ColumnDisplayValuesExpressions.length == 0
            && Expression.ColumnRawValuesExpressions.length == 0
            && Expression.FilterExpressions.length == 0
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
            blotter.getRecordIsSatisfiedFunction(identifierValue, "getColumnValue"), // this value
            blotter.getRecordIsSatisfiedFunction(identifierValue, "getDisplayColumnValue"), // this value
            blotter.getRecordIsSatisfiedFunction(identifierValue, "getColumnValue"),  // other column value
            columns,
            blotter.AdaptableBlotterStore.TheStore.getState().Filter.UserFilters,
            blotter.AdaptableBlotterStore.TheStore.getState().Filter.SystemFilters,
            blotter
        );
    }

    export function checkForExpressionFromRecord(Expression: Expression, record: any, columns: IColumn[], blotter: IAdaptableBlotter): boolean {
        return IsSatisfied(
            Expression,
            blotter.getRecordIsSatisfiedFunctionFromRecord(record, "getColumnValue"),  // this value
            blotter.getRecordIsSatisfiedFunctionFromRecord(record, "getDisplayColumnValue"),  // this value
            blotter.getRecordIsSatisfiedFunctionFromRecord(record, "getColumnValue"), // other column value
            columns,
            blotter.AdaptableBlotterStore.TheStore.getState().Filter.UserFilters,
            blotter.AdaptableBlotterStore.TheStore.getState().Filter.SystemFilters,
            blotter
        );
    }

    export function CreateEmptyExpression(): Expression {
        return new Expression([], [], [], [])
    }

    export function CreateEmptyRangeExpression(): IRange {
        return { Operator: LeafExpressionOperator.Unknown, Operand1: "", Operand2: "", Operand1Type: RangeOperandType.Value, Operand2Type: RangeOperandType.Value }
    }

    export function GetRangeEvaluation(rangeExpression: IRange, newValue: any, initialValue: any, column: IColumn, blotter: IAdaptableBlotter, getOtherColumnValue: (columnName: string) => any, ): IRangeEvaluation {
        let rangeEvaluation: IRangeEvaluation = {
            operand1: rangeExpression.Operand1,
            operand2: rangeExpression.Operand2,
            newValue: newValue,
            operator: rangeExpression.Operator,
            initialValue: initialValue
        }
        switch (column.DataType) {
            case DataType.Date:
                if (rangeExpression.Operand1Type == RangeOperandType.Column) {
                    rangeEvaluation.operand1 = Date.parse(getOtherColumnValue(rangeExpression.Operand1))
                } else {
                    rangeEvaluation.operand1 = Date.parse(rangeExpression.Operand1)
                }
                if (StringExtensions.IsNotEmpty(rangeExpression.Operand2)) {  // between
                    if (rangeExpression.Operand2Type == RangeOperandType.Column) {
                        rangeEvaluation.operand2 = Date.parse(getOtherColumnValue(rangeExpression.Operand2))
                    } else {
                        rangeEvaluation.operand2 = Date.parse(rangeExpression.Operand2)
                    }
                }
                rangeEvaluation.newValue = newValue.setHours(0, 0, 0, 0)
                break
            case DataType.Number:
                if (rangeExpression.Operand1Type == RangeOperandType.Column) {
                    let otherValue = getOtherColumnValue(rangeExpression.Operand1);
                    rangeEvaluation.operand1 = Number(otherValue);
                } else {
                    rangeEvaluation.operand1 = Number(rangeExpression.Operand1)
                }
                if (StringExtensions.IsNotEmpty(rangeExpression.Operand2)) {  // between
                    if (rangeExpression.Operand2Type == RangeOperandType.Column) {
                        rangeEvaluation.operand2 = Number(getOtherColumnValue(rangeExpression.Operand2));
                    } else {
                        rangeEvaluation.operand2 = Number(rangeExpression.Operand2);
                    }
                }
                rangeEvaluation.newValue = Number(newValue);
                break
            case DataType.Boolean:
                rangeEvaluation.newValue = newValue;
                break;
            case DataType.Object:
            case DataType.String:
                rangeEvaluation.operand1 = rangeExpression.Operand1Type == RangeOperandType.Column ?
                    getOtherColumnValue(rangeExpression.Operand1) :
                    rangeExpression.Operand1;//.toLowerCase() - not sure what to do about case but this is currently breaking...
                rangeEvaluation.operand2 = rangeExpression.Operand2Type == RangeOperandType.Column ?
                    getOtherColumnValue(rangeExpression.Operand2) :
                    rangeExpression.Operand2;//.toLowerCase();
                break;
        }
        return rangeEvaluation;
    }

    export function TestRangeEvaluation(rangeEvaluation: IRangeEvaluation): boolean {

        switch (rangeEvaluation.operator) {
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
                let oldPercentValue: any = rangeEvaluation.initialValue;
                let percentChange: number = Math.abs(100 - Math.abs(rangeEvaluation.newValue * 100 / oldPercentValue))
                return percentChange > Number(rangeEvaluation.operand1);
            case LeafExpressionOperator.ValueChange:
                let oldChangeValue: any = rangeEvaluation.initialValue;
                let changeInValue: number = Math.abs(rangeEvaluation.newValue - oldChangeValue);
                return changeInValue > Number(rangeEvaluation.operand1);
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
            case LeafExpressionOperator.NotContains:
                return rangeEvaluation.newValue.indexOf(rangeEvaluation.operand1) < 0;
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

    export function ExpressionContainsFilter(expression: Expression, filter: IUserFilter): boolean {
        let hasFilter: boolean = false;
        if (expression != null && expression.FilterExpressions.length > 0) {
            expression.FilterExpressions.forEach(fe => {
                if (!hasFilter) {
                    hasFilter = fe.Filters.find(f => f == filter.Name) != null;
                }
            })
        }
        return hasFilter;
    }

} 