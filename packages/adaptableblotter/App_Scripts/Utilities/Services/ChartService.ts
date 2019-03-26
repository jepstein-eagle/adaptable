import { IChartService } from './Interface/IChartService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IChartDefinition, ICategoryChartDefinition, IPieChartDefinition } from "../Interface/BlotterObjects/IChartDefinition";
import { IColumnValueExpression } from "../Interface/Expression/IColumnValueExpression";
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import { DistinctCriteriaPairValue, DataType } from '../Enums';
import { IKeyValuePair } from "../Interface/IKeyValuePair";
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { Expression } from '../../Utilities/Expression';
import { ExpressionHelper } from '../Helpers/ExpressionHelper';
import { AxisTotal, SecondaryColumnOperation } from '../ChartEnums';
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

  public BuildPieChartData(chartDefinition: IPieChartDefinition): any[] {

    let dataCounter = new Map<any, number>();

    let hasPrimaryColumn = StringExtensions.IsNotNullOrEmpty(chartDefinition.PrimaryColumnId);
    if (!hasPrimaryColumn) {
      return null; // should never happen but from now on you have to have a primary column...
    }
    let hasSecondaryColumn = StringExtensions.IsNotNullOrEmpty(chartDefinition.SecondaryColumnId);

    console.log("BuildPieChartData:  Primary Column " + hasPrimaryColumn + " Secondary Column " + hasSecondaryColumn);

    let isGroupingColumns = false;
    let valueTotal = 0;

    // get the data for when both primary and secondary are set
    if (hasSecondaryColumn) {

      isGroupingColumns = true; // not quite sure what this does...

      this.blotter.forAllRecordsDo((row) => {
        let primaryCellValue = this.blotter.getRawValueFromRecord(row, chartDefinition.PrimaryColumnId);
        let secondaryCellValue = this.blotter.getRawValueFromRecord(row, chartDefinition.SecondaryColumnId);

        let group: string = "";
        let count: number = 0;
        if (chartDefinition.SecondaryColumnOperation == SecondaryColumnOperation.Sum) {
          count = parseFloat(secondaryCellValue) //+ parseFloat(primaryCellValue);
          group = primaryCellValue;
        } else {
          count = 1;
          group = this.abbreviateStr(primaryCellValue + " " + secondaryCellValue);
        }

        if (dataCounter.has(group)) {
          dataCounter.set(group, dataCounter.get(group) + count);
        } else {
          dataCounter.set(group, count);
        }
        valueTotal += count;
      });

    } else {
      // this is changed and its much simpler.  We always just get a count of the primary column distinct values
      this.blotter.forAllRecordsDo((row) => {
        let cellValue = this.blotter.getRawValueFromRecord(row, chartDefinition.PrimaryColumnId);

        if (dataCounter.has(cellValue)) {
          dataCounter.set(cellValue, dataCounter.get(cellValue) + 1);
        } else {
          dataCounter.set(cellValue, 1);
        }
        valueTotal += 1;
      });
    }

    console.log("BuildPieChartData dataCounter " + dataCounter.keys.length);
    let dataItems: any[] = [];
    dataCounter.forEach((value, name) => {
      let item: any = {};
      item.Name = name.toString();
      item.Value = Helper.RoundNumber(value, 1);
      // calculating ratio of column value to total values of all columns and rounded to 1 decimal place
      item.Ratio = Math.round(value / valueTotal * 1000) / 10;
      if (isGroupingColumns) {
        item.ValueAndName = this.abbreviateNum(item.Value) + " - " + item.Name;
        item.RatioAndName = item.Ratio.toFixed(0) + " - " + item.Name;
      } else {
        item.ValueAndName = item.Name;
        item.RatioAndName = item.Name;
      }
      // ensure strings are not to long for slice labels and legend items
      item.ValueAndName = StringExtensions.abbreviateString(item.ValueAndName, 30);
      item.RatioAndName = StringExtensions.abbreviateString(item.RatioAndName, 30);
      item.Name = StringExtensions.abbreviateString(item.Name, 30);

      dataItems.push(item);
    });

    console.log("BuildPieChartData dataItems " + dataItems.length);

    return dataItems;
  }


  public abbreviateNum(largeValue: number): string {
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

}
