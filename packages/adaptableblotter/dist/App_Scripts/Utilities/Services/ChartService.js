"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnHelper_1 = require("../Helpers/ColumnHelper");
const Enums_1 = require("../Enums");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const ExpressionHelper_1 = require("../Helpers/ExpressionHelper");
const ChartEnums_1 = require("../ChartEnums");
const Helper_1 = require("../Helpers/Helper");
const StringExtensions_1 = require("../Extensions/StringExtensions");
/*
Class that buils the chart - probably needs some refactoring but working for the time being.
Makes use of Expressions to get the data required.
Returns a ChartData object that the ChartDisplay will receive and then show to teh user
*/
class ChartService {
    constructor(blotter) {
        this.blotter = blotter;
    }
    BuildCategoryChartData(chartDefinition, columns) {
        // NOTE this method is need only when we using Segmented column(s) otherwise,
        // you can assign chart.dataSource to the whole data (e.g. whatever the grid is displaying)
        // and then set chart.includedProperties to array of strings that contain selected data columns:
        // xAxisColumnName and all yAxisColumnNames, e.g. "Trade Date", "Trade Price", "Trade Volume"
        let xAxisColumnName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns);
        let xAxisColValues = this.getXAxisColumnValues(chartDefinition, columns);
        //TODO save yAxisColumnNames in chartDefinition so we can populate getCalloutTypeOptions()
        let yAxisColumnNames = [];
        let chartData = xAxisColValues.map(cv => {
            let chartItem = new Object();
            chartItem[xAxisColumnName] = cv;
            let showAverageTotal = (chartDefinition.YAxisTotal == ChartEnums_1.AxisTotal.Average);
            let xAxisKVP = { Key: chartDefinition.XAxisColumnId, Value: cv };
            chartDefinition.YAxisColumnIds.forEach(colID => {
                let total = this.buildTotal(colID, [xAxisKVP], columns, showAverageTotal);
                let colName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(colID, columns);
                if (yAxisColumnNames.indexOf(colName) < 0) {
                    yAxisColumnNames.push(colName);
                }
                chartItem[colName] = total;
            });
            return chartItem;
        });
        return chartData;
    }
    buildTotal(yAxisColumn, kvps, columns, showAverageTotal) {
        let columnValueExpressions = kvps.map(kvp => {
            return {
                ColumnId: kvp.Key,
                ColumnDisplayValues: [kvp.Value],
                ColumnRawValues: []
            };
        });
        let completedExpression = {
            ColumnValueExpressions: columnValueExpressions,
            FilterExpressions: [],
            RangeExpressions: []
        };
        let finalTotal = 0;
        let returnedRecordCount = 0;
        this.blotter.forAllRecordsDo((row) => {
            if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(completedExpression, row, columns, this.blotter)) {
                returnedRecordCount++;
                let columnValue = this.blotter.getRawValueFromRecord(row, yAxisColumn);
                finalTotal += Number(columnValue);
            }
        });
        if (showAverageTotal) {
            finalTotal = (finalTotal / returnedRecordCount);
        }
        return Helper_1.Helper.RoundNumberTo4dp(finalTotal);
    }
    // Gets the unique values in the (horizontal) X Axis column - either through an expression or getting the distinct values
    getXAxisColumnValues(chartDefinition, columns) {
        let xAxisColValues = [];
        if (ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(chartDefinition.XAxisExpression)) {
            xAxisColValues = this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.XAxisColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue; });
        }
        else {
            this.blotter.forAllRecordsDo((row) => {
                if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(chartDefinition.XAxisExpression, row, columns, this.blotter)) {
                    let columnValue = this.blotter.getDisplayValueFromRecord(row, chartDefinition.XAxisColumnId);
                    ArrayExtensions_1.ArrayExtensions.AddItem(xAxisColValues, columnValue);
                }
            });
        }
        return xAxisColValues;
    }
    BuildPieChartData(valueColumnId, labelColumnId) {
        let dataCounter = new Map();
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let hasLabelColumn = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(labelColumnId);
        let hasValueColumn = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(valueColumnId);
        console.log("BuildPieChartData label " + hasLabelColumn + " value " + hasValueColumn);
        let isGroupingColumns = false;
        let valueTotal = 0;
        if (hasLabelColumn && hasValueColumn) {
            isGroupingColumns = true;
            let valueColumnType = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(valueColumnId, columns);
            let valueColumnIsNumeric = valueColumnType == Enums_1.DataType.Number;
            let labelColumnType = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(labelColumnId, columns);
            let labelColumnIsNumeric = labelColumnType == Enums_1.DataType.Number;
            this.blotter.forAllRecordsDo((row) => {
                let labelCell = this.blotter.getRawValueFromRecord(row, labelColumnId);
                let valueCell = this.blotter.getRawValueFromRecord(row, valueColumnId);
                let group = "";
                let count = 0;
                if (valueColumnIsNumeric && labelColumnIsNumeric) {
                    // counting sum of both value and label columns
                    count = parseFloat(valueCell) + parseFloat(labelCell);
                    group = labelCell;
                }
                else if (valueColumnIsNumeric && !labelColumnIsNumeric) {
                    count = parseFloat(valueCell);
                    group = labelCell;
                }
                else if (!valueColumnIsNumeric && labelColumnIsNumeric) {
                    count = parseFloat(labelCell);
                    group = valueCell;
                }
                else if (!valueColumnIsNumeric && !labelColumnIsNumeric) {
                    // counting instances of both value and label columns
                    count = 1;
                    // checking for selected 2 the same columns
                    if (labelCell == valueCell) {
                        group = labelCell;
                    }
                    else {
                        group = this.abbreviateStr(labelCell + " " + valueCell);
                    }
                }
                if (dataCounter.has(group)) {
                    dataCounter.set(group, dataCounter.get(group) + count);
                }
                else {
                    dataCounter.set(group, count);
                }
                valueTotal += count;
            });
        }
        else if (hasValueColumn) {
            let i = 0;
            // we have only valueColumnId so let's check if it has numeric or non-numeric cell values
            let columnType = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(valueColumnId, columns);
            let columnIsNumeric = columnType == Enums_1.DataType.Number;
            isGroupingColumns = !columnIsNumeric;
            this.blotter.forAllRecordsDo((row) => {
                let cellValue = this.blotter.getRawValueFromRecord(row, valueColumnId);
                let group = columnIsNumeric ? i : cellValue;
                let count = columnIsNumeric ? parseFloat(cellValue) : 1;
                if (dataCounter.has(group)) {
                    dataCounter.set(group, dataCounter.get(group) + count);
                }
                else {
                    dataCounter.set(group, count);
                }
                valueTotal += count;
                i++;
            });
        }
        else if (hasLabelColumn) {
            let i = 0;
            // we have only labelColumnId so let's check if it has numeric or non-numeric cell values
            let columnType = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(labelColumnId, columns);
            let columnIsNumeric = columnType == Enums_1.DataType.Number;
            isGroupingColumns = !columnIsNumeric;
            this.blotter.forAllRecordsDo((row) => {
                let cellValue = this.blotter.getRawValueFromRecord(row, labelColumnId);
                let group = columnIsNumeric ? i : cellValue;
                let count = columnIsNumeric ? parseFloat(cellValue) : 1;
                if (dataCounter.has(group)) {
                    dataCounter.set(group, dataCounter.get(group) + count);
                }
                else {
                    dataCounter.set(group, count);
                }
                valueTotal += count;
                i++;
            });
        }
        console.log("BuildPieChartData dataCounter " + dataCounter.keys.length);
        let dataItems = [];
        dataCounter.forEach((value, name) => {
            let item = {};
            item.Name = name.toString();
            item.Value = Helper_1.Helper.RoundNumber(value, 1);
            // calculating ratio of column value to total values of all columns and rounded to 1 decimal place
            item.Ratio = Math.round(value / valueTotal * 1000) / 10;
            if (isGroupingColumns) {
                item.ValueAndName = this.abbreviateNum(item.Value) + " - " + item.Name;
                item.RatioAndName = item.Ratio.toFixed(0) + " - " + item.Name;
            }
            else {
                item.ValueAndName = item.Name;
                item.RatioAndName = item.Name;
            }
            // ensure strings are not to long for slice labels and legend items
            item.ValueAndName = this.abbreviateStr(item.ValueAndName);
            item.RatioAndName = this.abbreviateStr(item.RatioAndName);
            item.Name = this.abbreviateStr(item.Name);
            dataItems.push(item);
        });
        console.log("BuildPieChartData dataItems " + dataItems.length);
        return dataItems;
    }
    abbreviateStr(str, maxLength) {
        if (maxLength === undefined)
            maxLength = 18;
        return str.length < maxLength ? str : str.substr(0, maxLength) + "...";
    }
    abbreviateNum(largeValue) {
        let str = "";
        if (largeValue >= 1000000000) {
            str = (largeValue / 1000000000).toFixed(1) + "B";
        }
        else if (largeValue >= 1000000) {
            str = (largeValue / 1000000).toFixed(1) + "M";
        }
        else if (largeValue >= 1000) {
            str = (largeValue / 1000).toFixed(1) + "K";
        }
        else {
            str = largeValue.toString();
        }
        return str;
    }
}
exports.ChartService = ChartService;
