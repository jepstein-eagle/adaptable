import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IChartDefinition } from "../Interface/BlotterObjects/IChartDefinition";
import { IColumnValueExpression } from "../Interface/Expression/IColumnValueExpression";
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import { DistinctCriteriaPairValue } from '../Enums';
import { IKeyValuePair } from "../Interface/IKeyValuePair";
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { Expression } from '../../Utilities/Expression';
import { ExpressionHelper } from '../Helpers/ExpressionHelper';
import { AxisTotal } from '../ChartEnums';
import { Helper } from '../Helpers/Helper';
import { StringExtensions } from '../Extensions/StringExtensions';

/* 
Class that buils the chart - probably needs some refactoring but working for the time being.
Makes use of Expressions to get the data required.
Returns a ChartData object that the ChartDisplay will receive and then show to teh user
*/
export class ChartService implements IChartService {

    constructor(private blotter: IAdaptableBlotter) {
    }

    public BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any {

        let xAxisColumnName = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns)

        let xAxisColValues: string[] = this.getXAxisColumnValues(chartDefinition, columns);

        let xSegmentColValues: string[] = this.getXSegmentColumnValues(chartDefinition, columns);

        let chartData: any = xAxisColValues.map(cv => {
            let chartDataRow: any = new Object()
            chartDataRow[xAxisColumnName] = cv
            let showAverageTotal: boolean = (chartDefinition.YAxisTotal == AxisTotal.Average);

            let xAxisKVP: IKeyValuePair = { Key: chartDefinition.XAxisColumnId, Value: cv }

            if (ArrayExtensions.IsNotEmpty(xSegmentColValues)) {
                xSegmentColValues.forEach((columnValue: string) => {
                    let columnValueKVP: IKeyValuePair = { Key: chartDefinition.XSegmentColumnId, Value: columnValue }
                    chartDefinition.YAxisColumnIds.forEach(colID => {
                        let colFriendlyName = ColumnHelper.getFriendlyNameFromColumnId(colID, columns)
                        let total = this.buildTotal(colID, [xAxisKVP, columnValueKVP], columns, showAverageTotal)
                        chartDataRow[colFriendlyName + '(' + columnValue + ")"] = total;
                    });
                })
            } else { // otherwise do the y cols
                chartDefinition.YAxisColumnIds.forEach(colID => {
                    let total = this.buildTotal(colID, [xAxisKVP], columns, showAverageTotal);
                    let colName = ColumnHelper.getFriendlyNameFromColumnId(colID, columns);
                    chartDataRow[colName] = total;
                })
            }
            return chartDataRow
        })
        // console.log(chartData);
        return chartData
    }

    private buildTotal(yAxisColumn: string, kvps: IKeyValuePair[], columns: IColumn[], showAverageTotal: boolean): number {
        let columnValueExpressions: IColumnValueExpression[] = kvps.map(kvp => {
            return {
                ColumnId: kvp.Key,
                ColumnDisplayValues: [kvp.Value],
                ColumnRawValues: []
            }
        })

        let completedExpression: Expression = {
            ColumnValueExpressions: columnValueExpressions,
            FilterExpressions: [],
            RangeExpressions: []
        }

        let finalTotal: number = 0;
        let returnedRecordCount: number = 0;
        this.blotter.forAllRecordsDo((row) => {
            if (ExpressionHelper.checkForExpressionFromRecord(completedExpression, row, columns, this.blotter)) {
                returnedRecordCount++;
                let columnValue = this.blotter.getRawValueFromRecord(row, yAxisColumn)
                finalTotal += Number(columnValue)
            }
        })
        if (showAverageTotal) {
            finalTotal = (finalTotal / returnedRecordCount)
        }
        return Helper.RoundNumberTo4dp(finalTotal);
    }

    // Gets the unique values in the (horizontal) X Axis column - either through an expression or getting the distinct values
    private getXAxisColumnValues(chartDefinition: IChartDefinition, columns: IColumn[]): string[] {
        let xAxisColValues: string[] = [];
        if (ExpressionHelper.IsEmptyExpression(chartDefinition.XAxisExpression)) {
            xAxisColValues = this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.XAxisColumnId, DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue })
        } else {
            this.blotter.forAllRecordsDo((row) => {
                if (ExpressionHelper.checkForExpressionFromRecord(chartDefinition.XAxisExpression, row, columns, this.blotter)) {
                    let columnValue = this.blotter.getDisplayValueFromRecord(row, chartDefinition.XAxisColumnId)
                    ArrayExtensions.AddItem(xAxisColValues, columnValue);
                }
            })
        }
        return xAxisColValues;
    }

    // Gets the unique values in the X Sgegmet column - either through an Extension or as unique values.
    private getXSegmentColumnValues(chartDefinition: IChartDefinition, columns: IColumn[]): string[] {
        let xSegmentColValues: string[] = [];
        if (StringExtensions.IsNullOrEmpty(chartDefinition.XSegmentColumnId)) {
            return xSegmentColValues;
        }
        if (ExpressionHelper.IsEmptyExpression(chartDefinition.XSegmentExpression)) {
            xSegmentColValues = this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.XSegmentColumnId, DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue })
        } else {
            this.blotter.forAllRecordsDo((row) => {
                if (ExpressionHelper.checkForExpressionFromRecord(chartDefinition.XSegmentExpression, row, columns, this.blotter)) {
                    let columnValue = this.blotter.getDisplayValueFromRecord(row, chartDefinition.XSegmentColumnId)
                    ArrayExtensions.AddItem(xSegmentColValues, columnValue);
                }
            })
        }
        return xSegmentColValues;
    }
}
