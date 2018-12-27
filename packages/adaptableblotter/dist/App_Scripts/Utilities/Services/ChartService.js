"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
const ColumnHelper_1 = require("../Helpers/ColumnHelper");
const Enums_1 = require("../Enums");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const ExpressionHelper_1 = require("../Helpers/ExpressionHelper");
const ChartEnums_1 = require("../ChartEnums");
const Helper_1 = require("../Helpers/Helper");
class ChartService {
    constructor(blotter) {
        this.blotter = blotter;
    }
    BuildChartData(chartDefinition, columns) {
        //  let yAxisColumnName = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.YAxisColumnIds[0], columns)
        let xAxisColumnName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns);
        let xAxisColValues = [];
        if (ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(chartDefinition.XAxisExpression)) {
            xAxisColValues = this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.XAxisColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue; });
        }
        else {
            this.blotter.forAllRecordsDo((row) => {
                if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(chartDefinition.XAxisExpression, row, columns, this.blotter)) {
                    let columnValue = this.blotter.getDisplayValueFromRecord(row, chartDefinition.XAxisColumnId);
                    if (ArrayExtensions_1.ArrayExtensions.NotContainsItem(xAxisColValues, columnValue)) {
                        xAxisColValues.push(columnValue);
                    }
                }
            });
        }
        let additionalColValues = this.getAdditionalColumnValues(chartDefinition);
        let chartData = xAxisColValues.map(cv => {
            let chartDataRow = new Object();
            chartDataRow[xAxisColumnName] = cv;
            let showAverageTotal = chartDefinition.YAxisTotal == ChartEnums_1.AxisTotal.Average;
            let xAxisKVP = { Key: chartDefinition.XAxisColumnId, Value: cv };
            if (ArrayExtensions_1.ArrayExtensions.IsNotEmpty(additionalColValues)) {
                additionalColValues.forEach((columnValue) => {
                    let columnValueKVP = { Key: chartDefinition.AdditionalColumnId, Value: columnValue };
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
    getAdditionalColumnValues(chartDefinition) {
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(chartDefinition.AdditionalColumnValues)) {
            return [];
        }
        return chartDefinition.AdditionalColumnValues.length > 0 && chartDefinition.AdditionalColumnValues[0] != GeneralConstants.ALL_COLUMN_VALUES ?
            chartDefinition.AdditionalColumnValues :
            this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.AdditionalColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue; });
    }
}
exports.ChartService = ChartService;
