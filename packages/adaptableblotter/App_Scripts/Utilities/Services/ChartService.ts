import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IChartDefinition, ICategoryChartDefinition } from "../Interface/BlotterObjects/IChartDefinition";
import { IColumnValueExpression } from "../Interface/Expression/IColumnValueExpression";
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import { DistinctCriteriaPairValue, DataType } from '../Enums';
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

    public BuildCategoryChartData(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): any {

        // NOTE this method is need only when we using Segmented column(s) otherwise,
        // you can assign chart.dataSource to the whole data (e.g. whatever the grid is displaying)
        // and then set chart.includedProperties to array of strings that contain selected data columns:
        // xAxisColumnName and all yAxisColumnNames, e.g. "Trade Date", "Trade Price", "Trade Volume"

        let xAxisColumnName = ColumnHelper.getFriendlyNameFromColumnId(chartDefinition.XAxisColumnId, columns)
        let xAxisColValues: string[] = this.getXAxisColumnValues(chartDefinition, columns);

        //TODO save yAxisColumnNames in chartDefinition so we can populate getCalloutTypeOptions()
        let yAxisColumnNames: string[] = [];

        let chartData: any = xAxisColValues.map(cv => {
            let chartItem: any = new Object()

            chartItem[xAxisColumnName] = cv
            let showAverageTotal: boolean = (chartDefinition.YAxisTotal == AxisTotal.Average);
            let xAxisKVP: IKeyValuePair = { Key: chartDefinition.XAxisColumnId, Value: cv }

            chartDefinition.YAxisColumnIds.forEach(colID => {
                let total = this.buildTotal(colID, [xAxisKVP], columns, showAverageTotal);
                let colName = ColumnHelper.getFriendlyNameFromColumnId(colID, columns);
                if (yAxisColumnNames.indexOf(colName) < 0) {
                    yAxisColumnNames.push(colName);
                }
                chartItem[colName] = total;
            })
            return chartItem
        })

        return chartData;
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
    private getXAxisColumnValues(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): string[] {
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

    public BuildPieChartData(valueColumnId: string, labelColumnId: string): any[] {

        let dataCounter = new Map<any, number>();
        // let dataValueTotal = 0;
        let columns: IColumn[]= this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;

        let hasLabelColumn = StringExtensions.IsNotNullOrEmpty(labelColumnId);
        let hasValueColumn = StringExtensions.IsNotNullOrEmpty(valueColumnId);

        console.log("BuildPieChartData labelColumn " + hasLabelColumn + " valueColumn " + hasValueColumn);

        let isGroupingColumns = false;
        let valueTotal = 0;

        if (hasLabelColumn && hasValueColumn) {
          isGroupingColumns = true;
          let  isValueColumnNumeric : boolean= ColumnHelper.getColumnDataTypeFromColumnId(valueColumnId, columns) == DataType.Number;
          this.blotter.forAllRecordsDo((row) => {
            let group = this.blotter.getRawValueFromRecord(row, labelColumnId);
            let value = this.blotter.getRawValueFromRecord(row, valueColumnId);
            let count: number=(isValueColumnNumeric)? parseFloat(value): 1
            
       
            if (dataCounter.has(group)) {
              dataCounter.set(group, dataCounter.get(group) + count);
            } else {
              dataCounter.set(group, count);
            }
            valueTotal += count;
          });
        } else if (hasValueColumn) {
          let i = 0;
          let  isValueColumnNumeric : boolean =  ColumnHelper.getColumnDataTypeFromColumnId(valueColumnId, columns) == DataType.Number;
          isGroupingColumns = !isValueColumnNumeric;
          this.blotter.forAllRecordsDo((row) => {
            // we have only valueColumnId so let check if it numeric or non-numeric cell values
            let cellValue = this.blotter.getRawValueFromRecord(row, valueColumnId);
           
            let group = isValueColumnNumeric ? i: cellValue ;
            let count = isValueColumnNumeric ? parseFloat(cellValue): 1;
            if (dataCounter.has(group)) {
              dataCounter.set(group, dataCounter.get(group) + count);
            } else {
              dataCounter.set(group, count);
            }
            valueTotal += count;
            i++;
          });
        } else if (hasLabelColumn) {
        
        
           
          let i = 0;
          console.log('label only')
          
          
          
	           
          let  isLabelColumnNumeric : boolean  =  ColumnHelper.getColumnDataTypeFromColumnId(labelColumnId, columns) == DataType.Number;
          isGroupingColumns = !isLabelColumnNumeric;
           this.blotter.forAllRecordsDo((row) => {
            // we have only labelColumnId so let check if it numeric or non-numeric cell values
            let cellValue = this.blotter.getRawValueFromRecord(row, labelColumnId);
            let group = isLabelColumnNumeric ? i: cellValue ;
            let count = isLabelColumnNumeric ? parseFloat(cellValue): 1;


            if (dataCounter.has(group)) {
              dataCounter.set(group, dataCounter.get(group) + count);
            } else {
              dataCounter.set(group, count);
            }
            valueTotal += count;
            i++;
          });
        }

        console.log("BuildPieChartData dataCounter " + dataCounter.keys.length);
        let dataItems: any[] = [];
        dataCounter.forEach((value, name) => {
          let item: any = { };
          item.Name = name;
          item.Value = Helper.RoundNumber(value, 1);// Math.round(value * 10) / 10;
          // calculating ratio of column value to total values of all columns and rounded to 1 decimal place
          item.Ratio = Math.round(value / valueTotal * 1000) / 10;
          if (isGroupingColumns) {
            item.ValueAndName = this.toShort(item.Value) + " : " + name;
            item.RatioAndName = item.Ratio.toFixed(1) + "%" + " : " + name;
          } else {
            item.ValueAndName = name;
            item.RatioAndName = name;
          }
          dataItems.push(item);
        });

        console.log("BuildPieChartData dataItems " + dataItems.length);

        dataItems = dataItems.sort(this.orderAscending);
        return dataItems;
    }

    //TODO add this to string extension?
    public toShort(largeValue: number): string {
      let str: string = "";
      if (largeValue >= 1000000000) {
          str = (largeValue / 1000000000).toFixed(1) + "B";
      } else if (largeValue >= 1000000) {
          str = (largeValue / 1000000).toFixed(1) + "M";
      } else if (largeValue >= 1000) {
          str = (largeValue / 1000).toFixed(1) + "K";
      } else {
        str = largeValue.toString();
      }
      return str;
    }

    public orderAscending(a: any, b: any) {
      if (a.Value > b.Value) { return -1; }
      if (a.Value < b.Value) { return 1; }
      return 0;
  }
}
