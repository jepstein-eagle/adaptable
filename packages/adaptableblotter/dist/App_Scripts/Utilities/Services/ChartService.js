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
        // let dataValueTotal = 0;
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let hasLabelColumn = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(labelColumnId);
        let hasValueColumn = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(valueColumnId);
        console.log("BuildPieChartData labelColumn " + hasLabelColumn + " valueColumn " + hasValueColumn);
        let isGroupingColumns = false;
        let valueTotal = 0;
        if (hasLabelColumn && hasValueColumn) {
            isGroupingColumns = true;
            let isValueColumnNumeric = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(valueColumnId, columns) == Enums_1.DataType.Number;
            this.blotter.forAllRecordsDo((row) => {
                let group = this.blotter.getRawValueFromRecord(row, labelColumnId);
                let value = this.blotter.getRawValueFromRecord(row, valueColumnId);
                let count = (isValueColumnNumeric) ? parseFloat(value) : 1;
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
            let isValueColumnNumeric = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(valueColumnId, columns) == Enums_1.DataType.Number;
            isGroupingColumns = !isValueColumnNumeric;
            this.blotter.forAllRecordsDo((row) => {
                // we have only valueColumnId so let check if it numeric or non-numeric cell values
                let cellValue = this.blotter.getRawValueFromRecord(row, valueColumnId);
                let group = isValueColumnNumeric ? i : cellValue;
                let count = isValueColumnNumeric ? parseFloat(cellValue) : 1;
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
            console.log('label only');
            let isLabelColumnNumeric = ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(labelColumnId, columns) == Enums_1.DataType.Number;
            isGroupingColumns = !isLabelColumnNumeric;
            this.blotter.forAllRecordsDo((row) => {
                // we have only labelColumnId so let check if it numeric or non-numeric cell values
                let cellValue = this.blotter.getRawValueFromRecord(row, labelColumnId);
                let group = isLabelColumnNumeric ? i : cellValue;
                let count = isLabelColumnNumeric ? parseFloat(cellValue) : 1;
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
            item.Name = name;
            item.Value = Helper_1.Helper.RoundNumber(value, 1); // Math.round(value * 10) / 10;
            // calculating ratio of column value to total values of all columns and rounded to 1 decimal place
            item.Ratio = Math.round(value / valueTotal * 1000) / 10;
            if (isGroupingColumns) {
                item.ValueAndName = this.toShort(item.Value) + " : " + name;
                item.RatioAndName = item.Ratio.toFixed(1) + "%" + " : " + name;
            }
            else {
                item.ValueAndName = name;
                item.RatioAndName = name;
            }
            dataItems.push(item);
        });
        console.log("BuildPieChartData dataItems " + dataItems.length);
        dataItems = dataItems.sort(this.orderAscending);
        return dataItems;
    }
    //TODO add this to string extension?
    toShort(largeValue) {
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
    orderAscending(a, b) {
        if (a.Value > b.Value) {
            return -1;
        }
        if (a.Value < b.Value) {
            return 1;
        }
        return 0;
    }
}
exports.ChartService = ChartService;
