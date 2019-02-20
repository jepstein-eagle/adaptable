"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FilterHelper_1 = require("./FilterHelper");
const Enums_1 = require("../Enums");
const Expression_1 = require("../Expression");
const ColumnHelper_1 = require("./ColumnHelper");
const StringExtensions_1 = require("../Extensions/StringExtensions");
const LoggingHelper_1 = require("./LoggingHelper");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const ObjectFactory_1 = require("../ObjectFactory");
var ExpressionHelper;
(function (ExpressionHelper) {
    function CreateSingleColumnExpression(columnId, columnDisplayValues, columnRawValues, userFilters, ranges) {
        return new Expression_1.Expression(((columnDisplayValues && columnDisplayValues.length > 0) || (columnRawValues && columnRawValues.length > 0)) ? [{ ColumnId: columnId, ColumnDisplayValues: columnDisplayValues, ColumnRawValues: columnRawValues }] : [], userFilters && userFilters.length > 0 ? [{ ColumnId: columnId, Filters: userFilters }] : [], ranges && ranges.length > 0 ? [{ ColumnId: columnId, Ranges: ranges }] : []);
    }
    ExpressionHelper.CreateSingleColumnExpression = CreateSingleColumnExpression;
    function ConvertExpressionToString(Expression, columns, includeColumnName = true) {
        let returnValue = "";
        if (IsEmptyExpression(Expression)) {
            return "Any";
        }
        let columnList = GetColumnListFromExpression(Expression);
        for (let columnId of columnList) {
            let columnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(columnId, columns);
            let columnToString = "";
            // Column Display Values
            let columnValueExpression = Expression.ColumnValueExpressions.find(x => x.ColumnId == columnId);
            if (columnValueExpression) {
                columnToString = ColumnValueExpressionToString(columnValueExpression, columnFriendlyName, includeColumnName);
            }
            // User Filters
            let columnUserFilters = Expression.FilterExpressions.find(x => x.ColumnId == columnId);
            if (columnUserFilters) {
                if (columnToString != "") {
                    columnToString += " OR ";
                }
                columnToString += UserFiltersToString(columnUserFilters.Filters, columnFriendlyName, includeColumnName);
            }
            // Column Ranges
            let columnRange = Expression.RangeExpressions.find(x => x.ColumnId == columnId);
            if (columnRange) {
                if (columnToString != "") {
                    columnToString += " OR ";
                }
                columnToString += RangesToString(columnRange, columnFriendlyName, columns, includeColumnName);
            }
            if (returnValue != "") {
                returnValue += " AND ";
            }
            if (includeColumnName) {
                returnValue += "(";
            }
            returnValue += columnToString;
            if (includeColumnName) {
                returnValue += ")";
            }
        }
        return returnValue;
    }
    ExpressionHelper.ConvertExpressionToString = ConvertExpressionToString;
    // doesnt do columns and stuff....
    function ConvertRangeToString(range, columns) {
        let returnValue = range.Operator + " " + range.Operand1;
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(range.Operand2)) {
            returnValue += range.Operand2;
        }
        return returnValue;
    }
    ExpressionHelper.ConvertRangeToString = ConvertRangeToString;
    function IsSatisfied(Expression, getColumnValue, getDisplayColumnValue, getOtherColumnValue, columnBlotterList, userFilters, systemFilters, blotter) {
        let expressionColumnList = GetColumnListFromExpression(Expression);
        for (let columnId of expressionColumnList) {
            //we need either a column value or user filter expression or range to match the column
            let isColumnSatisfied = false;
            let column = columnBlotterList.find(x => x.ColumnId == columnId);
            if (!column) {
                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterWarning("Could not find column id:" + columnId);
                isColumnSatisfied = true;
            }
            // check for display column values
            if (!isColumnSatisfied) {
                let columnValues = Expression.ColumnValueExpressions.find(x => x.ColumnId == columnId);
                if (columnValues) {
                    let columnDisplayValue = getDisplayColumnValue(columnValues.ColumnId);
                    isColumnSatisfied = ArrayExtensions_1.ArrayExtensions.ContainsItem(columnValues.ColumnDisplayValues, columnDisplayValue);
                }
            }
            // Check for filter expressions if column fails
            if (!isColumnSatisfied) {
                let columnFilters = Expression.FilterExpressions.find(x => x.ColumnId == columnId);
                if (columnFilters) {
                    // first evaluate any user filters
                    let filteredUserFilters = FilterHelper_1.FilterHelper.GetUserFilters(userFilters, columnFilters.Filters);
                    for (let userFilter of filteredUserFilters) {
                        isColumnSatisfied = IsSatisfied(userFilter.Expression, getColumnValue, getDisplayColumnValue, getOtherColumnValue, columnBlotterList, userFilters, systemFilters, blotter);
                        if (isColumnSatisfied) {
                            break;
                        }
                    }
                    // then evaluate any system filters
                    if (!isColumnSatisfied) {
                        let filteredSystemFilters = systemFilters.filter(f => columnFilters.Filters.find(u => u == f) != null);
                        for (let systemFilter of filteredSystemFilters) {
                            let valueToCheck = getColumnValue(columnId);
                            let satisfyFunction = FilterHelper_1.FilterHelper.GetFunctionForSystemFilter(systemFilter);
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
                let columnRanges = Expression.RangeExpressions.find(x => x.ColumnId == columnId);
                if (columnRanges) {
                    let column = columnBlotterList.find(x => x.ColumnId == columnRanges.ColumnId);
                    for (let range of columnRanges.Ranges) {
                        let rangeEvaluation = ExpressionHelper.GetRangeEvaluation(range, getColumnValue(columnRanges.ColumnId), null, column, blotter, getOtherColumnValue);
                        isColumnSatisfied = ExpressionHelper.TestRangeEvaluation(rangeEvaluation, blotter);
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
    ExpressionHelper.IsSatisfied = IsSatisfied;
    function ColumnValueExpressionToString(columnValueExpression, columnFriendlyName, includeColumnName) {
        let returnValue = "";
        if (includeColumnName) {
            returnValue += "[" + columnFriendlyName + "]";
        }
        returnValue += " In (" + columnValueExpression.ColumnDisplayValues.join(", ") + ")";
        return returnValue;
    }
    function UserFiltersToString(userFilters, columnFriendlyName, includeColumnName) {
        let returnValue = "";
        for (let userFilter of userFilters) {
            if (returnValue != "") {
                returnValue += " OR ";
            }
            if (includeColumnName) {
                returnValue += "[" + columnFriendlyName + "] ";
            }
            returnValue += userFilter;
        }
        return returnValue;
    }
    function RangesToString(rangeExpression, columnFriendlyName, columns, includeColumnName) {
        let returnValue = "";
        for (let range of rangeExpression.Ranges) {
            if (returnValue != "") {
                returnValue += " OR ";
            }
            if (range.Operator == Enums_1.LeafExpressionOperator.Between) {
                if (includeColumnName) {
                    returnValue += "[" + columnFriendlyName + "] ";
                }
                returnValue += OperatorToShortFriendlyString(range.Operator) + " " + getOperandValue(range.Operand1Type, range.Operand1, columns) + " AND " + getOperandValue(range.Operand2Type, range.Operand2, columns);
            }
            else {
                if (includeColumnName) {
                    returnValue += "[" + columnFriendlyName + "] ";
                }
                returnValue += OperatorToShortFriendlyString(range.Operator) + " " + getOperandValue(range.Operand1Type, range.Operand1, columns);
            }
        }
        return returnValue;
    }
    function OperatorToOneCharacterString(operator) {
        switch (operator) {
            case Enums_1.LeafExpressionOperator.Unknown:
                return "X";
            case Enums_1.LeafExpressionOperator.GreaterThan:
                return ">";
            case Enums_1.LeafExpressionOperator.LessThan:
                return "<";
            case Enums_1.LeafExpressionOperator.Equals:
                return "=";
            case Enums_1.LeafExpressionOperator.NotEquals:
                return "<>";
            case Enums_1.LeafExpressionOperator.GreaterThanOrEqual:
                return ">=";
            case Enums_1.LeafExpressionOperator.LessThanOrEqual:
                return "<=";
            case Enums_1.LeafExpressionOperator.Between:
                return "In";
            case Enums_1.LeafExpressionOperator.Contains:
                return "C";
            case Enums_1.LeafExpressionOperator.NotContains:
                return "!C";
            case Enums_1.LeafExpressionOperator.StartsWith:
                return "S";
            case Enums_1.LeafExpressionOperator.EndsWith:
                return "E";
            case Enums_1.LeafExpressionOperator.Regex:
                return "R";
        }
    }
    ExpressionHelper.OperatorToOneCharacterString = OperatorToOneCharacterString;
    function OperatorToShortFriendlyString(operator) {
        switch (operator) {
            case Enums_1.LeafExpressionOperator.Unknown:
                return "Select";
            case Enums_1.LeafExpressionOperator.GreaterThan:
                return ">";
            case Enums_1.LeafExpressionOperator.LessThan:
                return "<";
            case Enums_1.LeafExpressionOperator.Equals:
                return "=";
            case Enums_1.LeafExpressionOperator.NotEquals:
                return "<>";
            case Enums_1.LeafExpressionOperator.GreaterThanOrEqual:
                return ">=";
            case Enums_1.LeafExpressionOperator.LessThanOrEqual:
                return "<=";
            case Enums_1.LeafExpressionOperator.Between:
                return "Between";
            case Enums_1.LeafExpressionOperator.Contains:
                return "Contains";
            case Enums_1.LeafExpressionOperator.NotContains:
                return "Not Contains";
            case Enums_1.LeafExpressionOperator.StartsWith:
                return "Starts With";
            case Enums_1.LeafExpressionOperator.EndsWith:
                return "Ends With";
            case Enums_1.LeafExpressionOperator.Regex:
                return "Regex";
        }
    }
    ExpressionHelper.OperatorToShortFriendlyString = OperatorToShortFriendlyString;
    function OperatorToLongFriendlyString(leafExpressionOperator, dataType) {
        switch (leafExpressionOperator) {
            case Enums_1.LeafExpressionOperator.None:
                return "Any Edit";
            case Enums_1.LeafExpressionOperator.Unknown:
                return "Select Operator ";
            case Enums_1.LeafExpressionOperator.Equals:
                return "Equals ";
            case Enums_1.LeafExpressionOperator.NotEquals:
                return "Not Equals ";
            case Enums_1.LeafExpressionOperator.GreaterThan:
                if (dataType == Enums_1.DataType.Date) {
                    return "After ";
                }
                else {
                    return "Greater Than ";
                }
            case Enums_1.LeafExpressionOperator.LessThan:
                if (dataType == Enums_1.DataType.Date) {
                    return "Before ";
                }
                else {
                    return "Less Than ";
                }
            case Enums_1.LeafExpressionOperator.GreaterThanOrEqual:
                if (dataType == Enums_1.DataType.Date) {
                    return "After or On ";
                }
                else {
                    return "Greater Than or Equals ";
                }
            case Enums_1.LeafExpressionOperator.LessThanOrEqual:
                if (dataType == Enums_1.DataType.Date) {
                    return "Before or On ";
                }
                else {
                    return "Less Than or Equals ";
                }
            case Enums_1.LeafExpressionOperator.Between:
                return " Between ";
            case Enums_1.LeafExpressionOperator.NotBetween:
                return "Not Between ";
            case Enums_1.LeafExpressionOperator.IsPositive:
                return "Is Positive ";
            case Enums_1.LeafExpressionOperator.IsNegative:
                return "Is Negative ";
            case Enums_1.LeafExpressionOperator.ValueChange:
                return "Change In Value Greater Than ";
            case Enums_1.LeafExpressionOperator.PercentChange:
                return "% Change Is Greater Than ";
            case Enums_1.LeafExpressionOperator.IsNotNumber:
                return "Is Not Number ";
            case Enums_1.LeafExpressionOperator.IsTrue:
                return "Is True ";
            case Enums_1.LeafExpressionOperator.IsFalse:
                return "Is False ";
            case Enums_1.LeafExpressionOperator.Contains:
                return "Contains ";
            case Enums_1.LeafExpressionOperator.NotContains:
                return "Not Contains ";
            case Enums_1.LeafExpressionOperator.StartsWith:
                return "Starts With ";
            case Enums_1.LeafExpressionOperator.EndsWith:
                return "Ends With ";
            case Enums_1.LeafExpressionOperator.Regex:
                return "Matches Expression ";
            case Enums_1.LeafExpressionOperator.NoDuplicates:
                return "No Duplicates ";
        }
    }
    ExpressionHelper.OperatorToLongFriendlyString = OperatorToLongFriendlyString;
    function GetOperatorsForDataType(dataType) {
        switch (dataType) {
            case Enums_1.DataType.Boolean:
                return null;
            case Enums_1.DataType.Number:
            case Enums_1.DataType.Date:
                return [
                    Enums_1.LeafExpressionOperator.Unknown,
                    Enums_1.LeafExpressionOperator.GreaterThan,
                    Enums_1.LeafExpressionOperator.GreaterThanOrEqual,
                    Enums_1.LeafExpressionOperator.LessThan,
                    Enums_1.LeafExpressionOperator.LessThanOrEqual,
                    Enums_1.LeafExpressionOperator.Equals,
                    Enums_1.LeafExpressionOperator.NotEquals,
                    Enums_1.LeafExpressionOperator.Between
                ];
            case Enums_1.DataType.String:
                return [
                    Enums_1.LeafExpressionOperator.Unknown,
                    Enums_1.LeafExpressionOperator.Contains,
                    Enums_1.LeafExpressionOperator.NotContains,
                    Enums_1.LeafExpressionOperator.StartsWith,
                    Enums_1.LeafExpressionOperator.EndsWith,
                    Enums_1.LeafExpressionOperator.Equals,
                    Enums_1.LeafExpressionOperator.NotEquals,
                    Enums_1.LeafExpressionOperator.Regex
                ];
            default:
                return [Enums_1.LeafExpressionOperator.Unknown, Enums_1.LeafExpressionOperator.GreaterThan, Enums_1.LeafExpressionOperator.Between];
        }
    }
    ExpressionHelper.GetOperatorsForDataType = GetOperatorsForDataType;
    function getOperandValue(rangeOperandType, operand, columns) {
        if (rangeOperandType == "Value") {
            return operand;
        }
        else {
            return "[" + ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(operand, columns) + "]";
        }
    }
    function GetColumnListFromExpression(expression) {
        return Array.from(new Set(expression.ColumnValueExpressions.map(x => x.ColumnId)
            .concat(expression.FilterExpressions.map(x => x.ColumnId))
            .concat(expression.RangeExpressions.map(x => x.ColumnId))));
    }
    ExpressionHelper.GetColumnListFromExpression = GetColumnListFromExpression;
    function IsEmptyExpression(expression) {
        return expression.ColumnValueExpressions.length == 0
            && expression.FilterExpressions.length == 0
            && expression.RangeExpressions.length == 0;
    }
    ExpressionHelper.IsEmptyExpression = IsEmptyExpression;
    function IsNotEmptyExpression(expression) {
        return !IsEmptyExpression(expression);
    }
    ExpressionHelper.IsNotEmptyExpression = IsNotEmptyExpression;
    function IsNotEmptyOrInvalidExpression(expression) {
        return IsNotEmptyExpression(expression) && IsExpressionValid(expression);
    }
    ExpressionHelper.IsNotEmptyOrInvalidExpression = IsNotEmptyOrInvalidExpression;
    function IsEmptyOrValidExpression(expression) {
        if (IsEmptyExpression(expression)) {
            return true;
        }
        return IsExpressionValid(expression);
    }
    ExpressionHelper.IsEmptyOrValidExpression = IsEmptyOrValidExpression;
    function IsExpressionValid(expression) {
        //nothing to check for ColumnValues. 
        //we check that all ranges are properly populated
        return expression.RangeExpressions.every(x => {
            return x.Ranges.every(range => {
                if (range.Operator == Enums_1.LeafExpressionOperator.Unknown) {
                    return false;
                }
                else if (range.Operator == Enums_1.LeafExpressionOperator.Between) {
                    return range.Operand1 != "" && range.Operand2 != "";
                }
                else {
                    return range.Operand1 != "";
                }
            });
        });
    }
    ExpressionHelper.IsExpressionValid = IsExpressionValid;
    function IsEmptyRange(range) {
        return StringExtensions_1.StringExtensions.IsNullOrEmpty(range.Operand1); // more??
    }
    ExpressionHelper.IsEmptyRange = IsEmptyRange;
    function checkForExpression(Expression, identifierValue, columns, blotter) {
        return IsSatisfied(Expression, blotter.getRecordIsSatisfiedFunction(identifierValue, Enums_1.DistinctCriteriaPairValue.RawValue), // this value
        blotter.getRecordIsSatisfiedFunction(identifierValue, Enums_1.DistinctCriteriaPairValue.DisplayValue), // this value
        blotter.getRecordIsSatisfiedFunction(identifierValue, Enums_1.DistinctCriteriaPairValue.RawValue), // other column value
        columns, blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters, blotter.AdaptableBlotterStore.TheStore.getState().SystemFilter.SystemFilters, blotter);
    }
    ExpressionHelper.checkForExpression = checkForExpression;
    function checkForExpressionFromRecord(Expression, record, columns, blotter) {
        return IsSatisfied(Expression, blotter.getRecordIsSatisfiedFunctionFromRecord(record, Enums_1.DistinctCriteriaPairValue.RawValue), // this value
        blotter.getRecordIsSatisfiedFunctionFromRecord(record, Enums_1.DistinctCriteriaPairValue.DisplayValue), // this value
        blotter.getRecordIsSatisfiedFunctionFromRecord(record, Enums_1.DistinctCriteriaPairValue.RawValue), // other column value
        columns, blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters, blotter.AdaptableBlotterStore.TheStore.getState().SystemFilter.SystemFilters, blotter);
    }
    ExpressionHelper.checkForExpressionFromRecord = checkForExpressionFromRecord;
    function CreateEmptyExpression() {
        return new Expression_1.Expression([], [], []);
    }
    ExpressionHelper.CreateEmptyExpression = CreateEmptyExpression;
    function CreateEmptyRangeExpression() {
        return { Operator: Enums_1.LeafExpressionOperator.Unknown, Operand1: "", Operand2: "", Operand1Type: Enums_1.RangeOperandType.Value, Operand2Type: Enums_1.RangeOperandType.Value };
    }
    ExpressionHelper.CreateEmptyRangeExpression = CreateEmptyRangeExpression;
    function GetRangeEvaluation(rangeExpression, newValue, initialValue, column, blotter, getOtherColumnValue) {
        let rangeEvaluation = ObjectFactory_1.ObjectFactory.CreateRangeEvaluation(rangeExpression.Operator, rangeExpression.Operand1, rangeExpression.Operand2, newValue, initialValue, column.ColumnId);
        switch (column.DataType) {
            case Enums_1.DataType.Date:
                if (rangeExpression.Operand1Type == Enums_1.RangeOperandType.Column) {
                    let columnValue = getOtherColumnValue(rangeExpression.Operand1);
                    rangeEvaluation.operand2 = new Date(columnValue).setHours(0, 0, 0, 0);
                }
                else {
                    rangeEvaluation.operand1 = new Date(rangeExpression.Operand1).setHours(0, 0, 0, 0);
                }
                if (StringExtensions_1.StringExtensions.IsNotEmpty(rangeExpression.Operand2)) { // between
                    if (rangeExpression.Operand2Type == Enums_1.RangeOperandType.Column) {
                        let columnValue = getOtherColumnValue(rangeExpression.Operand2);
                        rangeEvaluation.operand2 = new Date(columnValue).setHours(0, 0, 0, 0);
                    }
                    else {
                        rangeEvaluation.operand2 = new Date(rangeExpression.Operand2).setHours(0, 0, 0, 0);
                    }
                }
                rangeEvaluation.newValue = new Date(newValue).setHours(0, 0, 0, 0);
                break;
            case Enums_1.DataType.Number:
                if (rangeExpression.Operand1Type == Enums_1.RangeOperandType.Column) {
                    let otherValue = getOtherColumnValue(rangeExpression.Operand1);
                    rangeEvaluation.operand1 = Number(otherValue);
                }
                else {
                    rangeEvaluation.operand1 = Number(rangeExpression.Operand1);
                }
                if (StringExtensions_1.StringExtensions.IsNotEmpty(rangeExpression.Operand2)) { // between
                    if (rangeExpression.Operand2Type == Enums_1.RangeOperandType.Column) {
                        rangeEvaluation.operand2 = Number(getOtherColumnValue(rangeExpression.Operand2));
                    }
                    else {
                        rangeEvaluation.operand2 = Number(rangeExpression.Operand2);
                    }
                }
                rangeEvaluation.newValue = Number(newValue);
                break;
            case Enums_1.DataType.Boolean:
                rangeEvaluation.newValue = newValue;
                break;
            case Enums_1.DataType.Object:
            case Enums_1.DataType.String:
                if (blotter.BlotterOptions.queryOptions.ignoreCaseInQueries) {
                    rangeEvaluation.newValue = StringExtensions_1.StringExtensions.ToLowerCase(rangeEvaluation.newValue);
                }
                rangeEvaluation.operand1 = rangeExpression.Operand1Type == Enums_1.RangeOperandType.Column ?
                    getOtherColumnValue(rangeExpression.Operand1) :
                    (rangeExpression.Operand1 == null) ? null :
                        (blotter.BlotterOptions.queryOptions.ignoreCaseInQueries) ?
                            StringExtensions_1.StringExtensions.ToLowerCase(rangeExpression.Operand1) :
                            rangeExpression.Operand1;
                rangeEvaluation.operand2 = rangeExpression.Operand2Type == Enums_1.RangeOperandType.Column ?
                    getOtherColumnValue(rangeExpression.Operand2) :
                    (rangeExpression.Operand2 == null) ? null :
                        (blotter.BlotterOptions.queryOptions.ignoreCaseInQueries) ?
                            StringExtensions_1.StringExtensions.ToLowerCase(rangeExpression.Operand2) :
                            rangeExpression.Operand2;
                break;
        }
        return rangeEvaluation;
    }
    ExpressionHelper.GetRangeEvaluation = GetRangeEvaluation;
    function TestRangeEvaluation(rangeEvaluation, blotter) {
        if (rangeEvaluation.newValue == null) {
            return false;
        }
        switch (rangeEvaluation.operator) {
            case Enums_1.LeafExpressionOperator.Equals:
                return rangeEvaluation.newValue == rangeEvaluation.operand1;
            case Enums_1.LeafExpressionOperator.NotEquals:
                return rangeEvaluation.newValue != rangeEvaluation.operand1;
            case Enums_1.LeafExpressionOperator.GreaterThan:
                return rangeEvaluation.newValue > rangeEvaluation.operand1;
            case Enums_1.LeafExpressionOperator.LessThan:
                return rangeEvaluation.newValue < rangeEvaluation.operand1;
            case Enums_1.LeafExpressionOperator.GreaterThanOrEqual:
                return rangeEvaluation.newValue >= rangeEvaluation.operand1;
            case Enums_1.LeafExpressionOperator.LessThanOrEqual:
                return rangeEvaluation.newValue <= rangeEvaluation.operand1;
            case Enums_1.LeafExpressionOperator.PercentChange:
                let oldPercentValue = rangeEvaluation.initialValue;
                let percentChange = Math.abs(100 - Math.abs(rangeEvaluation.newValue * 100 / oldPercentValue));
                return percentChange > Number(rangeEvaluation.operand1);
            case Enums_1.LeafExpressionOperator.ValueChange:
                let oldChangeValue = rangeEvaluation.initialValue;
                let changeInValue = Math.abs(rangeEvaluation.newValue - oldChangeValue);
                return changeInValue > Number(rangeEvaluation.operand1);
            case Enums_1.LeafExpressionOperator.Between:
                return (rangeEvaluation.newValue >= rangeEvaluation.operand1 && rangeEvaluation.newValue <= rangeEvaluation.operand2);
            case Enums_1.LeafExpressionOperator.NotBetween:
                return !(rangeEvaluation.newValue >= rangeEvaluation.operand1 && rangeEvaluation.newValue <= rangeEvaluation.operand2);
            case Enums_1.LeafExpressionOperator.IsNotNumber:
                return (isNaN(Number(rangeEvaluation.newValue)));
            case Enums_1.LeafExpressionOperator.IsPositive:
                return (rangeEvaluation.newValue > 0);
            case Enums_1.LeafExpressionOperator.IsNegative:
                return (rangeEvaluation.newValue < 0);
            case Enums_1.LeafExpressionOperator.IsTrue:
                return (rangeEvaluation.newValue == true);
            case Enums_1.LeafExpressionOperator.IsFalse:
                return (rangeEvaluation.newValue == false);
            case Enums_1.LeafExpressionOperator.Contains:
                if (rangeEvaluation.newValue == undefined) {
                    return false;
                }
                return String(rangeEvaluation.newValue).indexOf(rangeEvaluation.operand1) >= 0;
            case Enums_1.LeafExpressionOperator.NotContains:
                if (rangeEvaluation.newValue == undefined) {
                    return false;
                }
                return String(rangeEvaluation.newValue).indexOf(rangeEvaluation.operand1) < 0;
            case Enums_1.LeafExpressionOperator.StartsWith:
                // alert("new value: " + rangeEvaluation.newValue)
                if (rangeEvaluation.newValue == undefined) {
                    return false;
                }
                return String(rangeEvaluation.newValue).startsWith(rangeEvaluation.operand1);
            case Enums_1.LeafExpressionOperator.EndsWith:
                return rangeEvaluation.newValue.endsWith(rangeEvaluation.operand1);
            case Enums_1.LeafExpressionOperator.Regex:
                let regex = new RegExp(rangeEvaluation.operand1);
                return regex.test(rangeEvaluation.newValue);
            case Enums_1.LeafExpressionOperator.NoDuplicates:
                let displayValuePairs = blotter.getColumnValueDisplayValuePairDistinctList(rangeEvaluation.columnId, Enums_1.DistinctCriteriaPairValue.DisplayValue);
                let existingItem = displayValuePairs.find(dv => dv.DisplayValue.toLowerCase() == rangeEvaluation.newValue);
                return existingItem != null;
        }
        return false;
    }
    ExpressionHelper.TestRangeEvaluation = TestRangeEvaluation;
    function ExpressionContainsFilter(expression, filter) {
        let hasFilter = false;
        if (expression != null && expression.FilterExpressions.length > 0) {
            expression.FilterExpressions.forEach(fe => {
                if (!hasFilter) {
                    hasFilter = fe.Filters.find(f => f == filter.Name) != null;
                }
            });
        }
        return hasFilter;
    }
    ExpressionHelper.ExpressionContainsFilter = ExpressionContainsFilter;
    function OperatorRequiresValue(operator) {
        return operator != Enums_1.LeafExpressionOperator.None
            && operator != Enums_1.LeafExpressionOperator.IsPositive
            && operator != Enums_1.LeafExpressionOperator.IsNegative
            && operator != Enums_1.LeafExpressionOperator.IsNotNumber
            && operator != Enums_1.LeafExpressionOperator.IsTrue
            && operator != Enums_1.LeafExpressionOperator.IsFalse
            && operator != Enums_1.LeafExpressionOperator.NoDuplicates;
    }
    ExpressionHelper.OperatorRequiresValue = OperatorRequiresValue;
})(ExpressionHelper = exports.ExpressionHelper || (exports.ExpressionHelper = {}));
