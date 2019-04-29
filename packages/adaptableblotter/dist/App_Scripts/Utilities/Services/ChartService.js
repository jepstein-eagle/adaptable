"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnHelper_1 = require("../Helpers/ColumnHelper");
const Enums_1 = require("../Enums");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const ExpressionHelper_1 = require("../Helpers/ExpressionHelper");
const ChartEnums_1 = require("../ChartEnums");
const Helper_1 = require("../Helpers/Helper");
const StringExtensions_1 = require("../Extensions/StringExtensions");
const LoggingHelper_1 = require("../Helpers/LoggingHelper");
const NumberExtensions_1 = require("../Extensions/NumberExtensions");
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
        let returnData = xAxisColValues.map(cv => {
            let chartItem = new Object();
            chartItem[xAxisColumnName] = cv;
            let showAverageTotal = (chartDefinition.YAxisTotal == ChartEnums_1.AxisTotal.Average);
            let xAxisKVP = { Key: chartDefinition.XAxisColumnId, Value: cv };
            chartDefinition.YAxisColumnIds.forEach(colID => {
                let total = this.buildYAxisTotal(chartDefinition, colID, [xAxisKVP], columns, showAverageTotal);
                let colName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(colID, columns);
                if (yAxisColumnNames.indexOf(colName) < 0) {
                    yAxisColumnNames.push(colName);
                }
                chartItem[colName] = total;
            });
            return chartItem;
        });
        // no error message built yet but need to add
        let chartData = {
            Data: returnData,
            ErrorMessage: null
        };
        return chartData;
    }
    buildYAxisTotal(chartDefinition, yAxisColumn, kvps, columns, showAverageTotal) {
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
        if (chartDefinition.VisibleRowsOnly) {
            this.blotter.forAllVisibleRecordsDo((row) => {
                if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(completedExpression, row, columns, this.blotter)) {
                    returnedRecordCount++;
                    let columnValue = this.blotter.getRawValueFromRecord(row, yAxisColumn);
                    finalTotal += Number(columnValue);
                }
            });
        }
        else {
            this.blotter.forAllRecordsDo((row) => {
                if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(completedExpression, row, columns, this.blotter)) {
                    returnedRecordCount++;
                    let columnValue = this.blotter.getRawValueFromRecord(row, yAxisColumn);
                    finalTotal += Number(columnValue);
                }
            });
        }
        if (showAverageTotal) {
            finalTotal = (finalTotal / returnedRecordCount);
        }
        return Helper_1.Helper.RoundNumberTo4dp(finalTotal);
    }
    // Gets the unique values in the (horizontal) X Axis column - either through an expression or getting the distinct values
    getXAxisColumnValues(chartDefinition, columns) {
        let xAxisColValues = [];
        if (ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(chartDefinition.XAxisExpression)) {
            xAxisColValues = this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.XAxisColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue, chartDefinition.VisibleRowsOnly).map(cv => { return cv.DisplayValue; });
        }
        else {
            if (chartDefinition.VisibleRowsOnly) {
                this.blotter.forAllVisibleRecordsDo((row) => {
                    this.addXAxisFromExpression(chartDefinition, columns, row, xAxisColValues);
                });
            }
            else {
                this.blotter.forAllRecordsDo((row) => {
                    this.addXAxisFromExpression(chartDefinition, columns, row, xAxisColValues);
                });
            }
        }
        return xAxisColValues;
    }
    addXAxisFromExpression(chartDefinition, columns, row, xAxisColValues) {
        if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(chartDefinition.XAxisExpression, row, columns, this.blotter)) {
            let columnValue = this.blotter.getDisplayValueFromRecord(row, chartDefinition.XAxisColumnId);
            ArrayExtensions_1.ArrayExtensions.AddItem(xAxisColValues, columnValue);
        }
    }
    BuildPieChartData(chartDefinition) {
        let dataCounter = new Map();
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(chartDefinition.PrimaryColumnId)) {
            let errorMessage = "Cannot create pie chart as no Primary Column set.";
            return {
                Data: [],
                ErrorMessage: errorMessage
            };
        }
        let hasSecondaryColumn = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(chartDefinition.SecondaryColumnId);
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
        let dataItems = [];
        let columns = this.blotter.api.gridApi.getColumns();
        // we use ranges if its a numeric column and there are more than 15 slices (N.B. Not completely working)
        let useRanges = this.shouldUseRange(dataCounter, chartDefinition, columns);
        // if we don't use ranges but there are too many slices then we return an error
        if (!useRanges && dataCounter.size > this.blotter.blotterOptions.chartOptions.pieChartMaxItems) {
            let message = "Cannot create pie chart as it contains too many items.";
            LoggingHelper_1.LoggingHelper.LogAdaptableBlotterWarning(message);
            return {
                Data: [],
                ErrorMessage: message
            };
        }
        // if nothing passes (possible if you have visible rows only)
        if (dataCounter.size == 0) {
            let message = "No data returned for Pie Chart.";
            LoggingHelper_1.LoggingHelper.LogAdaptableBlotterWarning(message);
            return {
                Data: [],
                ErrorMessage: message
            };
        }
        if (!useRanges) {
            dataCounter.forEach((value, name) => {
                let sliceItem = this.createNonRangeDataItem(value, name, valueTotal);
                dataItems.push(sliceItem);
            });
        }
        else {
            // too many data values/slices to fit in pie chart so we need to group them into ranges
            let dataMinValue = Number.MAX_VALUE;
            let dataMaxValue = Number.MIN_VALUE;
            // getting min and max values
            dataCounter.forEach((id, value) => {
                dataMinValue = Math.min(value, dataMinValue);
                dataMaxValue = Math.max(value, dataMaxValue);
            });
            // calculating nice/round range interval/divisions
            let dataValueGroups = 20;
            let dataValueRange = dataMaxValue - dataMinValue;
            let dataValueMultiplier = 1;
            if (dataValueRange < 10) {
                dataValueMultiplier = 100; // for very small values (e.g. B/O Spread column)
            }
            let dataRangeInterval = dataValueRange * dataValueMultiplier / dataValueGroups;
            let dataRangeDivisions = Math.floor((dataRangeInterval / 10) + 1) * 10;
            let dataRanges = new Map();
            // grouping all data values into ranges by checking which range a value belongs to
            dataCounter.forEach((id, value) => {
                let rangeKey = Math.floor(value * dataValueMultiplier / dataRangeDivisions);
                if (dataRanges.has(rangeKey)) {
                    let range = dataRanges.get(rangeKey);
                    range.values.push(value);
                    ;
                    dataRanges.set(rangeKey, range);
                }
                else {
                    let rangeMin = (rangeKey / dataValueMultiplier * dataRangeDivisions);
                    let rangeMax = (rangeKey + 1) / dataValueMultiplier * dataRangeDivisions;
                    let range = { min: rangeMin, max: rangeMax, values: [value] };
                    if (dataValueMultiplier > 1) {
                        range.min = rangeMin.toFixed(1);
                        range.max = rangeMax.toFixed(1);
                    }
                    else {
                        range.min = NumberExtensions_1.NumberExtensions.abbreviateNumber(rangeMin);
                        range.max = NumberExtensions_1.NumberExtensions.abbreviateNumber(rangeMax);
                    }
                    dataRanges.set(rangeKey, range);
                }
            });
            //   console.log("ChartService grouped data items into " + dataRanges.size + " ranges of " + dataRangeDivisions)
            // finally we can generate slice items based on data ranges
            dataRanges.forEach((range, key) => {
                let sliceItem = {
                    Name: "[" + range.min + " to " + range.max + "]",
                    Value: range.values.length,
                    // calculating ratio of number of values in this range to total number of all data rows and rounded to 1 decimal place
                    Ratio: Math.round(range.values.length / dataCounter.size * 1000) / 10
                };
                sliceItem.ValueAndName = sliceItem.Value + " - " + sliceItem.Name;
                sliceItem.RatioAndName = sliceItem.Ratio.toFixed(0) + " - " + sliceItem.Name;
                sliceItem.ValueAndName = StringExtensions_1.StringExtensions.abbreviateString(sliceItem.ValueAndName, 50);
                sliceItem.RatioAndName = StringExtensions_1.StringExtensions.abbreviateString(sliceItem.RatioAndName, 50);
                sliceItem.Name = StringExtensions_1.StringExtensions.abbreviateString(sliceItem.Name, 50);
                dataItems.push(sliceItem);
            });
        }
        return {
            Data: dataItems,
            ErrorMessage: null
        };
    }
    createNonRangeDataItem(value, name, valueTotal) {
        let pieChartDataItem = {
            Name: name.toString(),
            Value: Helper_1.Helper.RoundNumber(value, 1),
            // calculating ratio of column value to total values of all columns and rounded to 1 decimal place
            Ratio: Math.round(value / valueTotal * 1000) / 10
        };
        pieChartDataItem.ValueAndName = NumberExtensions_1.NumberExtensions.abbreviateNumber(pieChartDataItem.Value) + " - " + pieChartDataItem.Name;
        pieChartDataItem.RatioAndName = pieChartDataItem.Ratio.toFixed(0) + " - " + pieChartDataItem.Name;
        pieChartDataItem.ValueAndName = StringExtensions_1.StringExtensions.abbreviateString(pieChartDataItem.ValueAndName, 50);
        pieChartDataItem.RatioAndName = StringExtensions_1.StringExtensions.abbreviateString(pieChartDataItem.RatioAndName, 50);
        pieChartDataItem.Name = StringExtensions_1.StringExtensions.abbreviateString(pieChartDataItem.Name, 50);
        return pieChartDataItem;
    }
    shouldUseRange(dataCounter, chartDefinition, columns) {
        let returnValue = false;
        if (dataCounter.size > 15) {
            let primaryColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(chartDefinition.PrimaryColumnId, columns);
            let primaryColumnIsNumeric = ColumnHelper_1.ColumnHelper.isNumericColumn(primaryColumn);
            returnValue = (primaryColumnIsNumeric);
        }
        return returnValue;
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
        return valueTotal;
    }
}
exports.ChartService = ChartService;
