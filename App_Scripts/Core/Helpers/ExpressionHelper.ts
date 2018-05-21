import { FilterHelper } from '../Helpers/FilterHelper'
import { LeafExpressionOperator, RangeOperandType } from '../Enums'
import { DataType } from '../Enums'
import { Helper } from '../../Core/Helpers/Helper';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants';
import { IColumn } from '../Interface/IColumn';
import { IRange, IUserFilter } from '../Api/Interface/AdaptableBlotterObjects';
import { Expression } from '../Api/Expression';
import { ColumnHelper } from './ColumnHelper';

export interface IRangeEvaluation {
    operand1: any;
    operand2: any;
    newValue: any;
    operator: LeafExpressionOperator;
    initialValue: any
  }

export module ExpressionHelper {
    export function CreateSingleColumnExpression(columnId: string,
        columnValues: Array<string>,
        userFilters: Array<string>,
        ranges: Array<IRange>) {
        return new Expression(columnValues && columnValues.length > 0 ? [{ ColumnId: columnId, ColumnValues: columnValues }] : [],
             userFilters && userFilters.length > 0 ? [{ ColumnId: columnId, Filters: userFilters }] : [],
            ranges && ranges.length > 0 ? [{ ColumnId: columnId, Ranges: ranges }] : []
        )
    }

    export function ConvertExpressionToString(Expression: Expression, columns: Array<IColumn>, filters: any): string {
        let returnValue = ""
        if (IsEmptyExpression(Expression)) {
            return "Any";
        }

        let columnList = GetColumnListFromExpression(Expression)
        for (let columnId of columnList) {
            let columnFriendlyName: string = ColumnHelper.getFriendlyNameFromColumnId(columnId, columns)
       
            let columnToString = ""

            // Column Display Values
            let columnValues = Expression.ColumnValueExpressions.find(x => x.ColumnId == columnId)
            if (columnValues) {
                columnToString = ColumnValuesKeyValuePairToString(columnValues, columnFriendlyName)
            }

                // User Filters
            let columnUserFilters = Expression.FilterExpressions.find(x => x.ColumnId == columnId)
            if (columnUserFilters) {
                if (columnToString != "") {
                    columnToString += " OR "
                }
                columnToString += UserFiltersKeyPairToString(columnUserFilters.Filters, columnFriendlyName)
            }

            // Column Ranges
            let columnRanges = Expression.RangeExpressions.find(x => x.ColumnId == columnId)
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

    // doesnt do columns and stuff....
    export function ConvertRangeToString(range: IRange, columns: IColumn[]): string {
        let returnValue: string = range.Operator + " " + range.Operand1
        if (StringExtensions.IsNotNullOrEmpty(range.Operand2)) {
            returnValue += range.Operand2
        }
        return returnValue
    }


    export function IsSatisfied(Expression: Expression, getColumnValue: (columnId: string) => any, getDisplayColumnValue: (columnId: string) => string, getOtherColumnValue: (columnId: string) => any, columnBlotterList: IColumn[], userFilters: IUserFilter[], systemFilters: string[], blotter: IAdaptableBlotter): boolean {
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
                let columnValues = Expression.ColumnValueExpressions.find(x => x.ColumnId == columnId)
                if (columnValues) {
                    let columnDisplayValue = getDisplayColumnValue(columnValues.ColumnId)
                    isColumnSatisfied = columnValues.ColumnValues.findIndex(v => v == columnDisplayValue) != -1;
                }
            }

           // Check for filter expressions if column fails
            if (!isColumnSatisfied) {
                let columnFilters = Expression.FilterExpressions.find(x => x.ColumnId == columnId)
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
                let columnRanges = Expression.RangeExpressions.find(x => x.ColumnId == columnId)
                if (columnRanges) {
                    let column = columnBlotterList.find(x => x.ColumnId == columnRanges.ColumnId)

                    for (let range of columnRanges.Ranges) {
                        let rangeEvaluation: IRangeEvaluation = ExpressionHelper.GetRangeEvaluation(range, getColumnValue(columnRanges.ColumnId), null, column, blotter, getOtherColumnValue)

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

    function ColumnValuesKeyValuePairToString(keyValuePair: { ColumnId: string, ColumnValues: Array<any> }, columnFriendlyName: string): string {
        return "[" + columnFriendlyName + "]"
            + " In (" + keyValuePair.ColumnValues.join(", ") + ")"
    }

     function UserFiltersKeyPairToString(userFilters: string[], columnFriendlyName: string): string {
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

    function RangesToString(keyValuePair: { ColumnId: string, Ranges: Array<IRange> }, columnFriendlyName: string, columns: IColumn[]): string {
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

    function getOperandValue(rangeOperandType: string, operand: string, columns: IColumn[]): string {
        if (rangeOperandType == "Value") {
            return operand;
        } else {
            return "[" + ColumnHelper.getFriendlyNameFromColumnId(operand, columns)+ "]";
         }
    }

    export function GetColumnListFromExpression(expression: Expression): Array<string> {
        return Array.from(new Set(expression.ColumnValueExpressions.map(x => x.ColumnId)
            .concat(expression.FilterExpressions.map(x => x.ColumnId))
            .concat(expression.RangeExpressions.map(x => x.ColumnId))))
    }

    export function IsEmptyExpression(expression: Expression): boolean {
        return expression.ColumnValueExpressions.length == 0
            && expression.FilterExpressions.length == 0
            && expression.RangeExpressions.length == 0
    }

    export function IsNotEmptyExpression(expression: Expression): boolean {
        return !IsEmptyExpression(expression)
    }

    export function IsNotEmptyOrInvalidExpression(expression: Expression): boolean {
        return IsNotEmptyExpression(expression) && IsExpressionValid(expression)
    }

    export function IsExpressionValid(expression: Expression): boolean {
        //nothing to check for ColumnValues. 
        //we check that all ranges are properly populated
        return expression.RangeExpressions.every(x => {
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

    export function IsEmptyRange(range: IRange): boolean {
        return StringExtensions.IsNullOrEmpty (range.Operand1) // more??
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
        return new Expression([],  [], [])
    }

    export function CreateEmptyRangeExpression(): IRange {
        return { Operator: LeafExpressionOperator.Unknown, Operand1: "", Operand2: "", Operand1Type: RangeOperandType.Value, Operand2Type:  RangeOperandType.Value }
    }

    export function GetRangeEvaluation(rangeExpression: IRange, newValue: any, initialValue: any, column: IColumn, blotter: IAdaptableBlotter, getOtherColumnValue: (columnId: string) => any, ): IRangeEvaluation {
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