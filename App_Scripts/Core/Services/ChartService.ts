
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IChartService } from './Interface/IChartService';
import { IChartDefinition, IColumnValueExpression } from '../Api/Interface/AdaptableBlotterObjects';
import { DistinctCriteriaPairValue } from '../Enums';
import { IRawValueDisplayValuePair, KeyValuePair } from '../../View/UIInterfaces';
import { Expression } from '../Api/Expression';
import { ExpressionHelper } from '../Helpers/ExpressionHelper';
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from '../Helpers/ColumnHelper';


export class ChartService implements IChartService {

    constructor(private blotter: IAdaptableBlotter) {
    }

    public BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any {
     //   chartDefinition.AdditionalColumnValues = ["Pending", "Completed", "Rejected"]
     //   chartDefinition.AdditionalColumn = "status"

        let yAxisColumnName = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.YAxisColumn, columns)
        let xAxisColumnName = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumn, columns)

        let colValues: IRawValueDisplayValuePair[] = this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.XAxisColumn, DistinctCriteriaPairValue.DisplayValue)

        let chartData: any = colValues.map(cv => {
            let chartDataRow: any = new Object()
            chartDataRow[xAxisColumnName] = cv.DisplayValue

            let xAxisKVP: KeyValuePair = { Key: chartDefinition.XAxisColumn, Value: cv.DisplayValue }
            //  let groupedTotals: number[] = []
            if (chartDefinition.AdditionalColumnValues) {
                chartDefinition.AdditionalColumnValues.forEach((columnValue: string) => {
                    let columnValueKVP: KeyValuePair = { Key: chartDefinition.AdditionalColumn, Value: columnValue }
                    let groupedTotal = this.buildGroupedTotal(chartDefinition.YAxisColumn, [xAxisKVP, columnValueKVP], columns)
                    //  groupedTotals.push(groupedTotal)
                    chartDataRow[columnValue] = groupedTotal
                })
            } else { // just do the first one
                let groupedTotal = this.buildGroupedTotal(chartDefinition.YAxisColumn, [xAxisKVP], columns)
                //   groupedTotals.push(groupedTotal)
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
}
