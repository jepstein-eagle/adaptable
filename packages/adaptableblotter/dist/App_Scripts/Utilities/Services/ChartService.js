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
    BuildChartData(chartDefinition, columns) {
        let xAxisColumnName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns);
        let xAxisColValues = this.getXAxisColumnValues(chartDefinition, columns);
        let xSegmentColValues = this.getXSegmentColumnValues(chartDefinition, columns);
        let chartData = xAxisColValues.map(cv => {
            let chartDataRow = new Object();
            chartDataRow[xAxisColumnName] = cv;
            let showAverageTotal = (chartDefinition.YAxisTotal == ChartEnums_1.AxisTotal.Average);
            let xAxisKVP = { Key: chartDefinition.XAxisColumnId, Value: cv };
            if (ArrayExtensions_1.ArrayExtensions.IsNotEmpty(xSegmentColValues)) {
                xSegmentColValues.forEach((columnValue) => {
                    let columnValueKVP = { Key: chartDefinition.XSegmentColumnId, Value: columnValue };
                    chartDefinition.YAxisColumnIds.forEach(colID => {
                        let colFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(colID, columns);
                        let total = this.buildTotal(colID, [xAxisKVP, columnValueKVP], columns, showAverageTotal);
                        chartDataRow[colFriendlyName + '(' + columnValue + ")"] = total;
                    });
                });
            }
            else { // otherwise do the y cols
                chartDefinition.YAxisColumnIds.forEach(colID => {
                    let total = this.buildTotal(colID, [xAxisKVP], columns, showAverageTotal);
                    let colName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(colID, columns);
                    chartDataRow[colName] = total;
                });
            }
            return chartDataRow;
        });
        // console.log(chartData);
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
    // Gets the unique values in the X Sgegmet column - either through an Extension or as unique values.
    getXSegmentColumnValues(chartDefinition, columns) {
        let xSegmentColValues = [];
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(chartDefinition.XSegmentColumnId)) {
            return xSegmentColValues;
        }
        if (ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(chartDefinition.XSegmentExpression)) {
            xSegmentColValues = this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.XSegmentColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue; });
        }
        else {
            this.blotter.forAllRecordsDo((row) => {
                if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(chartDefinition.XSegmentExpression, row, columns, this.blotter)) {
                    let columnValue = this.blotter.getDisplayValueFromRecord(row, chartDefinition.XSegmentColumnId);
                    ArrayExtensions_1.ArrayExtensions.AddItem(xSegmentColValues, columnValue);
                }
            });
        }
        return xSegmentColValues;
    }
}
exports.ChartService = ChartService;
