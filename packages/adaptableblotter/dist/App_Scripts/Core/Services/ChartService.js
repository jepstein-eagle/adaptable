"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const ExpressionHelper_1 = require("../Helpers/ExpressionHelper");
const ColumnHelper_1 = require("../Helpers/ColumnHelper");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
const GeneralConstants = require("../Constants/GeneralConstants");
class ChartService {
    constructor(blotter) {
        this.blotter = blotter;
    }
    BuildChartData(chartDefinition, columns) {
        let yAxisColumnName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.YAxisColumn, columns);
        let xAxisColumnName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumn, columns);
        let xAxisColValues = chartDefinition.XAxisColumnValues.length > 0 && chartDefinition.XAxisColumnValues[0] != GeneralConstants.ALL_COLUMN_VALUES ?
            chartDefinition.XAxisColumnValues :
            this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.XAxisColumn, Enums_1.DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue; });
        let additionalColValues = this.getAdditionalColumnValues(chartDefinition);
        let chartData = xAxisColValues.map(cv => {
            let chartDataRow = new Object();
            chartDataRow[xAxisColumnName] = cv;
            let xAxisKVP = { Key: chartDefinition.XAxisColumn, Value: cv };
            if (ArrayExtensions_1.ArrayExtensions.IsNotEmpty(additionalColValues)) {
                additionalColValues.forEach((columnValue) => {
                    let columnValueKVP = { Key: chartDefinition.AdditionalColumn, Value: columnValue };
                    let groupedTotal = this.buildGroupedTotal(chartDefinition.YAxisColumn, [xAxisKVP, columnValueKVP], columns);
                    chartDataRow[columnValue] = groupedTotal;
                });
            }
            else { // just do the first one
                let groupedTotal = this.buildGroupedTotal(chartDefinition.YAxisColumn, [xAxisKVP], columns);
                chartDataRow[yAxisColumnName] = groupedTotal;
            }
            return chartDataRow;
        });
        return chartData;
    }
    buildGroupedTotal(yAxisColumn, kvps, columns) {
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
        let groupedTotal = 0;
        this.blotter.forAllRecordsDo((row) => {
            if (ExpressionHelper_1.ExpressionHelper.checkForExpressionFromRecord(completedExpression, row, columns, this.blotter)) {
                let columnValue = this.blotter.getRawValueFromRecord(row, yAxisColumn);
                groupedTotal += Number(columnValue);
            }
        });
        return groupedTotal;
    }
    getAdditionalColumnValues(chartDefinition) {
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(chartDefinition.AdditionalColumnValues)) {
            return [];
        }
        return chartDefinition.AdditionalColumnValues.length > 0 && chartDefinition.AdditionalColumnValues[0] != GeneralConstants.ALL_COLUMN_VALUES ?
            chartDefinition.AdditionalColumnValues :
            this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.AdditionalColumn, Enums_1.DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue; });
    }
}
exports.ChartService = ChartService;
