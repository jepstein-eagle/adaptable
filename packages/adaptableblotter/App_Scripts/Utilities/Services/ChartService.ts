import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../../api/Interface/IAdaptableBlotter';
import { IChartDefinition, IColumnValueExpression } from '../../api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../../api/Interface/IColumn';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import { DistinctCriteriaPairValue } from '../Enums';
import { IKeyValuePair } from '../../api/Interface/Interfaces';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { Expression } from '../../api/Expression';
import { ExpressionHelper } from '../Helpers/ExpressionHelper';


export class ChartService implements IChartService {

    constructor(private blotter: IAdaptableBlotter) {
    }

    public BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any {

        let yAxisColumnName = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.YAxisColumnId, columns)
        let xAxisColumnName = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns)

        let xAxisColValues: string[] = chartDefinition.XAxisColumnValues.length > 0 && chartDefinition.XAxisColumnValues[0] != GeneralConstants.ALL_COLUMN_VALUES ?
            chartDefinition.XAxisColumnValues :
            this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.XAxisColumnId, DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue })

        let additionalColValues: string[] = this.getAdditionalColumnValues(chartDefinition);

        let chartData: any = xAxisColValues.map(cv => {
            let chartDataRow: any = new Object()
            chartDataRow[xAxisColumnName] = cv

            let xAxisKVP: IKeyValuePair = { Key: chartDefinition.XAxisColumnId, Value: cv }

            if (ArrayExtensions.IsNotEmpty(additionalColValues)) {
                additionalColValues.forEach((columnValue: string) => {
                    let columnValueKVP: IKeyValuePair = { Key: chartDefinition.AdditionalColumnId, Value: columnValue }
                    let groupedTotal = this.buildGroupedTotal(chartDefinition.YAxisColumnId, [xAxisKVP, columnValueKVP], columns)
                    chartDataRow[columnValue] = groupedTotal
                })
            } else { // just do the first one
                let groupedTotal = this.buildGroupedTotal(chartDefinition.YAxisColumnId, [xAxisKVP], columns)
                chartDataRow[yAxisColumnName] = groupedTotal
            }
            return chartDataRow
        })
        return chartData
    }

    private buildGroupedTotal(yAxisColumn: string, kvps: IKeyValuePair[], columns: IColumn[]): number {
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
            this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.AdditionalColumnId, DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue })

    }
}
