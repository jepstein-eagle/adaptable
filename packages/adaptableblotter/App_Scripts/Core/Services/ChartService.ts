
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IChartService } from './Interface/IChartService';
import { IChartDefinition, IColumnValueExpression } from '../Api/Interface/AdaptableBlotterObjects';
import { DistinctCriteriaPairValue } from '../Enums';
import { IRawValueDisplayValuePair, KeyValuePair } from '../../View/UIInterfaces';
import { Expression } from '../Api/Expression';
import { ExpressionHelper } from '../Helpers/ExpressionHelper';
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import * as GeneralConstants from '../Constants/GeneralConstants';

export class ChartService implements IChartService {

    constructor(private blotter: IAdaptableBlotter) {
    }

    public BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any {

        let yAxisColumnName = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.YAxisColumn, columns)
        let xAxisColumnName = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumn, columns)

        let xAxisColValues: string[] = chartDefinition.XAxisColumnValues.length > 0 && chartDefinition.XAxisColumnValues[0] != GeneralConstants.ALL_COLUMN_VALUES ?
            chartDefinition.XAxisColumnValues :
            this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.XAxisColumn, DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue })

        let additionalColValues: string[] = this.getAdditionalColumnValues(chartDefinition);

        let chartData: any = xAxisColValues.map(cv => {
            let chartDataRow: any = new Object()
            chartDataRow[xAxisColumnName] = cv

            let xAxisKVP: KeyValuePair = { Key: chartDefinition.XAxisColumn, Value: cv }

            if (ArrayExtensions.IsNotEmpty(additionalColValues)) {
                additionalColValues.forEach((columnValue: string) => {
                    let columnValueKVP: KeyValuePair = { Key: chartDefinition.AdditionalColumn, Value: columnValue }
                    let groupedTotal = this.buildGroupedTotal(chartDefinition.YAxisColumn, [xAxisKVP, columnValueKVP], columns)
                    chartDataRow[columnValue] = groupedTotal
                })
            } else { // just do the first one
                let groupedTotal = this.buildGroupedTotal(chartDefinition.YAxisColumn, [xAxisKVP], columns)
                chartDataRow[yAxisColumnName] = groupedTotal
            }
            return chartDataRow
        })
        return chartData
    }

    private buildGroupedTotal(yAxisColumn: string, kvps: KeyValuePair[], columns: IColumn[]): number {
        let columnValueExpressions: IColumnValueExpression[] = kvps.map(kvp => {
            return {
                ColumnId: kvp.Key,
                ColumnValues: [kvp.Value]
            }
        })

        let completedExpression: Expression = {
            ColumnValueExpressions: columnValueExpressions,
            FilterExpressions: [],
            RangeExpressions: []
        }

        let groupedTotal: number = 0;
        this.blotter.forAllRecordsDo((row) => {
            if (ExpressionHelper.checkForExpressionFromRecord(completedExpression, row, columns, this.blotter)) {
                let columnValue = this.blotter.getRawValueFromRecord(row, yAxisColumn)
                groupedTotal += Number(columnValue)
            }
        })
        return groupedTotal;
    }

    private getAdditionalColumnValues(chartDefinition: IChartDefinition): string[] {
        if (ArrayExtensions.IsNullOrEmpty(chartDefinition.AdditionalColumnValues)) {
            return []
        }
        return chartDefinition.AdditionalColumnValues.length > 0 && chartDefinition.AdditionalColumnValues[0] != GeneralConstants.ALL_COLUMN_VALUES ?
            chartDefinition.AdditionalColumnValues :
            this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.AdditionalColumn, DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue })

    }
}
