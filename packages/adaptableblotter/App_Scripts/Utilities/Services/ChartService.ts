import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../../Api/Interface/IAdaptableBlotter';
import { IChartDefinition, IColumnValueExpression, IChartProperties } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../../Api/Interface/IColumn';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import { DistinctCriteriaPairValue } from '../Enums';
import { IKeyValuePair } from '../../Api/Interface/Interfaces';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { Expression } from '../../Api/Expression';
import { ExpressionHelper } from '../Helpers/ExpressionHelper';


export class ChartService implements IChartService {

    constructor(private blotter: IAdaptableBlotter) {
    }

    public BuildChartData(chartDefinition: IChartDefinition, columns: IColumn[]): any {

        //  let yAxisColumnName = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.YAxisColumnIds[0], columns)
        let xAxisColumnName = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns)

        let xAxisColValues: string[] = [];
        if (ExpressionHelper.IsEmptyExpression(chartDefinition.XAxisExpression)) {
            xAxisColValues = this.blotter.getColumnValueDisplayValuePairDistinctList(chartDefinition.XAxisColumnId, DistinctCriteriaPairValue.DisplayValue).map(cv => { return cv.DisplayValue })
        } else {
            this.blotter.forAllRecordsDo((row) => {
                if (ExpressionHelper.checkForExpressionFromRecord(chartDefinition.XAxisExpression, row, columns, this.blotter)) {
                    let columnValue = this.blotter.getDisplayValueFromRecord(row, chartDefinition.XAxisColumnId)
                    if (ArrayExtensions.NotContainsItem(xAxisColValues, columnValue)) {
                        xAxisColValues.push(columnValue);
                    }
                }
            })
        }

        let additionalColValues: string[] = this.getAdditionalColumnValues(chartDefinition);

        let chartData: any = xAxisColValues.map(cv => {
            let chartDataRow: any = new Object()
            chartDataRow[xAxisColumnName] = cv

            let xAxisKVP: IKeyValuePair = { Key: chartDefinition.XAxisColumnId, Value: cv }

            // need to revisit and see if we really do want always group...
            // if we have additional column values then do those 
            // NB: currently only doing first - want to? or all?
            if (ArrayExtensions.IsNotEmpty(additionalColValues)) {
                additionalColValues.forEach((columnValue: string) => {
                    let columnValueKVP: IKeyValuePair = { Key: chartDefinition.AdditionalColumnId, Value: columnValue }
                    let groupedTotal = this.buildGroupedTotal(chartDefinition.YAxisColumnIds[0], [xAxisKVP, columnValueKVP], columns)
                    chartDataRow[columnValue] = groupedTotal
                })
            } else { // otherwise do the y cols
                chartDefinition.YAxisColumnIds.forEach(colID => {
                    let groupedTotal = this.buildGroupedTotal(colID, [xAxisKVP], columns)
                    let colName = ColumnHelper.getFriendlyNameFromColumnId(colID, columns)
                    chartDataRow[colName] = groupedTotal

                })
            }
            return chartDataRow
        })
        console.log(chartData);
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
