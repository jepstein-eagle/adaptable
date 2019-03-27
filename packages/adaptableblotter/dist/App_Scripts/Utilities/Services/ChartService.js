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
                let total = this.buildYAxisTotal(colID, [xAxisKVP], columns, showAverageTotal);
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
    buildYAxisTotal(yAxisColumn, kvps, columns, showAverageTotal) {
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
    BuildPieChartData(chartDefinition) {
        let dataCounter = new Map();
        let hasPrimaryColumn = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(chartDefinition.PrimaryColumnId);
        if (!hasPrimaryColumn) {
            return null; // should never happen but from now on you have to have a primary column...
        }
        let hasSecondaryColumn = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(chartDefinition.SecondaryColumnId);
        console.log("BuildPieChartData:  Primary Column " + hasPrimaryColumn + " Secondary Column " + hasSecondaryColumn);
        let valueTotal = 0;
        if (chartDefinition.VisibleRowsOnly) {
            this.blotter.forAllVisibleRecordsDo((row) => {
                valueTotal = (hasSecondaryColumn) ?
                    this.getGroupValueTotalForRow(row, chartDefinition, dataCounter, valueTotal)
                    :
                        this.getSingleValueTotalForRow(row, chartDefinition, dataCounter, valueTotal);
            });
        }
        else {
            this.blotter.forAllRecordsDo((row) => {
                valueTotal = (hasSecondaryColumn) ?
                    this.getGroupValueTotalForRow(row, chartDefinition, dataCounter, valueTotal)
                    :
                        this.getSingleValueTotalForRow(row, chartDefinition, dataCounter, valueTotal);
            });
        }
        console.log("BuildPieChartData dataCounter " + dataCounter.keys.length);
        let dataItems = [];
        dataCounter.forEach((value, name) => {
            let pieChartDataItem = {
                Name: name.toString(),
                Value: Helper_1.Helper.RoundNumber(value, 1),
                // calculating ratio of column value to total values of all columns and rounded to 1 decimal place
                Ratio: Math.round(value / valueTotal * 1000) / 10
            };
            pieChartDataItem.ValueAndName = this.abbreviateNum(pieChartDataItem.Value) + " - " + pieChartDataItem.Name;
            pieChartDataItem.RatioAndName = pieChartDataItem.Ratio.toFixed(0) + " - " + pieChartDataItem.Name;
            pieChartDataItem.ValueAndName = StringExtensions_1.StringExtensions.abbreviateString(pieChartDataItem.ValueAndName, 50);
            pieChartDataItem.RatioAndName = StringExtensions_1.StringExtensions.abbreviateString(pieChartDataItem.RatioAndName, 50);
            pieChartDataItem.Name = StringExtensions_1.StringExtensions.abbreviateString(pieChartDataItem.Name, 50);
            dataItems.push(pieChartDataItem);
        });
        console.log("BuildPieChartData dataItems " + dataItems.length);
        console.log("dataItems " + dataItems);
        return dataItems;
    }
    getGroupValueTotalForRow(row, chartDefinition, dataCounter, valueTotal) {
        let primaryCellValue = this.blotter.getRawValueFromRecord(row, chartDefinition.PrimaryColumnId);
        let secondaryCellValue = this.blotter.getRawValueFromRecord(row, chartDefinition.SecondaryColumnId);
        let group = "";
        let count = 0;
        if (chartDefinition.SecondaryColumnOperation == ChartEnums_1.SecondaryColumnOperation.Sum) {
            count = parseFloat(secondaryCellValue); //+ parseFloat(primaryCellValue);
            group = primaryCellValue;
        }
        else {
            count = 1;
            group = StringExtensions_1.StringExtensions.abbreviateString(primaryCellValue + " " + secondaryCellValue, 50);
        }
        if (dataCounter.has(group)) {
            dataCounter.set(group, dataCounter.get(group) + count);
        }
        else {
            dataCounter.set(group, count);
        }
        valueTotal += count;
        console.log('value total' + valueTotal);
        return valueTotal;
    }
    getSingleValueTotalForRow(row, chartDefinition, dataCounter, valueTotal) {
        let cellValue = this.blotter.getRawValueFromRecord(row, chartDefinition.PrimaryColumnId);
        if (dataCounter.has(cellValue)) {
            dataCounter.set(cellValue, dataCounter.get(cellValue) + 1);
        }
        else {
            dataCounter.set(cellValue, 1);
        }
        valueTotal += 1;
        console.log('value total' + valueTotal);
        return valueTotal;
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
