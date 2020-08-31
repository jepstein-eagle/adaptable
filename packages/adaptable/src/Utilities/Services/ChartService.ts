import { IChartService } from './Interface/IChartService';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { CellValueType } from '../../PredefinedConfig/Common/Enums';
import { KeyValuePair } from '../Interface/KeyValuePair';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { ExpressionHelper } from '../Helpers/ExpressionHelper';
import { Helper } from '../Helpers/Helper';
import { StringExtensions } from '../Extensions/StringExtensions';
import { LoggingHelper } from '../Helpers/LoggingHelper';
import { NumberExtensions } from '../Extensions/NumberExtensions';
import { createUuid } from '../../PredefinedConfig/Uuid';
import {
  CategoryChartDefinition,
  ChartData,
  ChartDefinition,
  PieChartDefinition,
  PieChartDataItem,
  SparklinesChartDefinition,
  FinancialChartDataItem,
  FinancialChartDataSource,
  FinancialChartDefinition,
} from '../../PredefinedConfig/ChartState';
import { AxisTotal, SecondaryColumnOperation } from '../../PredefinedConfig/Common/ChartEnums';
import * as parser from '../../parser/src';
import { RowNode } from '@ag-grid-community/all-modules';

/*
Class that buils the chart - probably needs some refactoring but working for the time being.
Makes use of Expressions to get the data required.
Returns a ChartData object that the ChartDisplay will receive and then show to teh user
*/
export class ChartService implements IChartService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  public BuildCategoryChartData(
    chartDefinition: CategoryChartDefinition,
    columns: AdaptableColumn[]
  ): ChartData {
    // NOTE this method is need only when we using Segmented column(s) otherwise,
    // you can assign chart.dataSource to the whole data (e.g. whatever the grid is displaying)
    // and then set chart.includedProperties to array of strings that contain selected data columns:
    // xAxisColumnName and all yAxisColumnNames, e.g. "Trade Date", "Trade Price", "Trade Volume"

    let xAxisColumnName = this.adaptable.api.columnApi.getFriendlyNameFromColumnId(
      chartDefinition.XAxisColumnId
    );
    let xAxisColValues: string[] = this.getXAxisColumnValues(chartDefinition, columns);

    //TODO save yAxisColumnNames in chartDefinition so we can populate getCalloutTypeOptions()
    let yAxisColumnNames: string[] = [];

    let returnData: any = xAxisColValues.map(cv => {
      let chartItem: any = new Object();

      chartItem[xAxisColumnName] = cv;
      let showAverageTotal: boolean = chartDefinition.YAxisTotal == AxisTotal.Average;
      let xAxisKVP: KeyValuePair = { Key: chartDefinition.XAxisColumnId, Value: cv };

      chartDefinition.YAxisColumnIds.forEach(colID => {
        let total = this.buildYAxisTotal(
          chartDefinition,
          colID,
          [xAxisKVP],
          columns,
          showAverageTotal
        );
        let colName = this.adaptable.api.columnApi.getFriendlyNameFromColumnId(colID);
        if (yAxisColumnNames.indexOf(colName) < 0) {
          yAxisColumnNames.push(colName);
        }
        chartItem[colName] = total;
      });
      return chartItem;
    });

    // no error message built yet but need to add
    let chartData: ChartData = {
      Data: returnData,
      ErrorMessage: null,
    };
    return chartData;
  }

  public BuildFinancialChartData(chartDefinition: FinancialChartDefinition): ChartData {
    const chartDataSources: FinancialChartDataItem[][] = [];

    const dataSources = chartDefinition.DataSources;
    chartDataSources;

    const forEach = (row: any) => {
      dataSources.forEach((dataSource: FinancialChartDataSource, i: number) => {
        chartDataSources[i] = chartDataSources[i] || [];

        let time = this.adaptable.getRawValueFromRowNode(row, dataSource.XAxisDateColumnId);

        if (typeof time === 'number') {
          time = new Date(time);
        }
        const valuePoint: FinancialChartDataItem = {
          time,
          high: this.adaptable.getRawValueFromRowNode(row, dataSource.YAxisNumericHighColumnId),
          low: this.adaptable.getRawValueFromRowNode(row, dataSource.YAxisNumericLowColumnId),
          open: this.adaptable.getRawValueFromRowNode(row, dataSource.YAxisNumericOpenColumnId),
          close: this.adaptable.getRawValueFromRowNode(row, dataSource.YAxisNumericCloseColumnId),
          volume: this.adaptable.getRawValueFromRowNode(row, dataSource.YAxisNumericVolumeColumnId),
        };
        chartDataSources[i].push(valuePoint);
      });
    };

    if (chartDefinition.VisibleRowsOnly) {
      this.adaptable.forAllVisibleRowNodesDo(forEach);
    } else {
      this.adaptable.forAllRowNodesDo(forEach);
    }

    dataSources.forEach((dataSource: FinancialChartDataSource, i: number) => {
      ((chartDataSources[i] as unknown) as any).title = dataSource.Name;
    });

    const chartData: ChartData = {
      Data: chartDataSources,
      ErrorMessage: null,
    };

    return chartData;
  }

  public BuildSparklinesChartData(
    chartDefinition: SparklinesChartDefinition,
    columns: AdaptableColumn[]
  ): ChartData {
    let values: number[];
    // TODO - is this correct?

    if (chartDefinition.Expression) {
      values = [];
      const forEach = (node: RowNode) => {
        if (
          parser.evaluate(chartDefinition.Expression, {
            node: node,
            api: this.adaptable.api,
          })
        ) {
          let columnValue = this.adaptable.getRawValueFromRowNode(node, chartDefinition.ColumnId);
          values.push(columnValue);
        }
      };
      if (chartDefinition.VisibleRowsOnly) {
        this.adaptable.forAllVisibleRowNodesDo(forEach);
      } else {
        this.adaptable.forAllRowNodesDo(forEach);
      }
    } else {
      values = [];

      let onlyIncludeIds;

      if (chartDefinition.PrimaryKeyValues) {
        onlyIncludeIds = chartDefinition.PrimaryKeyValues.reduce((allowedIds, primaryKey) => {
          allowedIds[primaryKey] = true;
          return allowedIds;
        }, {} as { [key: string]: boolean });
      }
      values = this.adaptable
        .getColumnValueDisplayValuePairList(
          chartDefinition.ColumnId,
          chartDefinition.VisibleRowsOnly,
          onlyIncludeIds
        )
        .filter(cv => {
          return Helper.objectExists(cv.RawValue);
        })
        .map(cv => {
          return cv.RawValue;
        });
    }

    let chartData: ChartData = {
      Data: values,
      ErrorMessage: null,
    };
    return chartData;
  }

  private buildYAxisTotal(
    chartDefinition: ChartDefinition,
    yAxisColumn: string,
    kvps: KeyValuePair[],
    columns: AdaptableColumn[],
    showAverageTotal: boolean
  ): number {
    /*
    // think we need this to help me work out what is being evaluated here!
    let columnValueExpressions: ColumnValueExpression[] = kvps.map(kvp => {
      return {
        ColumnId: kvp.Key,
        ColumnDisplayValues: [kvp.Value],
        ColumnRawValues: [],
      };
    });

    let completedExpression: Expression = {
      Uuid: createUuid(),
      ColumnValueExpressions: columnValueExpressions,
      FilterExpressions: [],
      RangeExpressions: [],
    };
    */

    // need here to create a 'completedExpresson' based on the kvp passed in
    // but for now lets just create an empty one
    // TODO - to fix!!!!
    let completedExpressionTemp: string = '';

    let finalTotal: number = 0;
    let returnedRecordCount: number = 0;

    if (chartDefinition.VisibleRowsOnly) {
      this.adaptable.forAllVisibleRowNodesDo(node => {
        if (
          parser.evaluate(completedExpressionTemp, {
            node: node,
            api: this.adaptable.api,
          })
        ) {
          returnedRecordCount++;
          let columnValue = this.adaptable.getRawValueFromRowNode(node, yAxisColumn);
          finalTotal += Number(columnValue);
        }
      });
    } else {
      this.adaptable.forAllRowNodesDo(node => {
        if (
          parser.evaluate(completedExpressionTemp, {
            node: node,
            api: this.adaptable.api,
          })
        ) {
          returnedRecordCount++;
          let columnValue = this.adaptable.getRawValueFromRowNode(node, yAxisColumn);
          finalTotal += Number(columnValue);
        }
      });
    }

    if (showAverageTotal) {
      finalTotal = finalTotal / returnedRecordCount;
    }
    return Helper.RoundNumberTo4dp(finalTotal);
  }

  // Gets the unique values in the (horizontal) X Axis column - either through an expression or getting the distinct values
  private getXAxisColumnValues(
    chartDefinition: CategoryChartDefinition,
    columns: AdaptableColumn[]
  ): string[] {
    let xAxisColValues: string[] = [];
    if (StringExtensions.IsNullOrEmpty(chartDefinition.XAxisExpression)) {
      xAxisColValues = chartDefinition.VisibleRowsOnly
        ? this.adaptable.api.columnApi.getDistinctVisibleDisplayValuesForColumn(
            chartDefinition.XAxisColumnId
          )
        : this.adaptable.api.columnApi.getDistinctDisplayValuesForColumn(
            chartDefinition.XAxisColumnId
          );
    } else {
      if (chartDefinition.VisibleRowsOnly) {
        this.adaptable.forAllVisibleRowNodesDo(row => {
          this.addXAxisFromExpression(chartDefinition, columns, row, xAxisColValues);
        });
      } else {
        this.adaptable.forAllRowNodesDo(row => {
          this.addXAxisFromExpression(chartDefinition, columns, row, xAxisColValues);
        });
      }
    }
    return xAxisColValues;
  }

  private addXAxisFromExpression(
    chartDefinition: CategoryChartDefinition,
    columns: AdaptableColumn[],
    node: RowNode,
    xAxisColValues: string[]
  ): void {
    if (
      parser.evaluate(chartDefinition.XAxisExpression, {
        node: node,
        api: this.adaptable.api,
      })
    ) {
      let columnValue = this.adaptable.getValueFromRowNode(
        node,
        chartDefinition.XAxisColumnId,
        CellValueType.DisplayValue
      );
      ArrayExtensions.AddItem(xAxisColValues, columnValue);
    }
  }

  public BuildPieChartData(chartDefinition: PieChartDefinition): ChartData {
    let dataCounter = new Map<any, number>();

    if (StringExtensions.IsNullOrEmpty(chartDefinition.PrimaryColumnId)) {
      let errorMessage: string = 'Cannot create pie chart as no Primary Column set.';
      return {
        Data: [],
        ErrorMessage: errorMessage,
      };
    }

    let hasSecondaryColumn = StringExtensions.IsNotNullOrEmpty(chartDefinition.SecondaryColumnId);

    let valueTotal: number = 0;

    if (ArrayExtensions.IsNotNullOrEmpty(chartDefinition.PrimaryKeyValues)) {
      // if doing Primary Key Values then we know that we have no secondary column and no need to worry about visible rows
      this.adaptable.getRowNodesForPrimaryKeys(chartDefinition.PrimaryKeyValues).forEach(row => {
        this.getSingleValueTotalForRow(row, chartDefinition, dataCounter, valueTotal);
      });
    } else {
      if (chartDefinition.VisibleRowsOnly) {
        this.adaptable.forAllVisibleRowNodesDo(row => {
          valueTotal = hasSecondaryColumn
            ? this.getGroupValueTotalForRow(row, chartDefinition, dataCounter, valueTotal)
            : this.getSingleValueTotalForRow(row, chartDefinition, dataCounter, valueTotal);
        });
      } else {
        this.adaptable.forAllRowNodesDo(row => {
          valueTotal = hasSecondaryColumn
            ? this.getGroupValueTotalForRow(row, chartDefinition, dataCounter, valueTotal)
            : this.getSingleValueTotalForRow(row, chartDefinition, dataCounter, valueTotal);
        });
      }
    }

    let dataItems: PieChartDataItem[] = [];

    let columns: AdaptableColumn[] = this.adaptable.api.columnApi.getColumns();
    // we use ranges if its a numeric column and there are more than 15 slices (N.B. Not completely working)
    let useRanges: boolean = this.shouldUseRange(dataCounter, chartDefinition, columns);

    // if we don't use ranges but there are too many slices then we return an error
    if (
      !useRanges &&
      dataCounter.size > this.adaptable.adaptableOptions.chartOptions.pieChartMaxItems
    ) {
      let message: string = 'Cannot create pie chart as it contains too many items.';
      LoggingHelper.LogAdaptableWarning(message);
      return {
        Data: [],
        ErrorMessage: message,
      };
    }

    // if nothing passes (possible if you have visible rows only)
    if (dataCounter.size == 0) {
      let message: string = 'No data returned for Pie Chart.';
      LoggingHelper.LogAdaptableWarning(message);
      return {
        Data: [],
        ErrorMessage: message,
      };
    }

    if (!useRanges) {
      dataCounter.forEach((value, name) => {
        let sliceItem: PieChartDataItem = this.createNonRangeDataItem(value, name, valueTotal);
        dataItems.push(sliceItem);
      });
    } else {
      // too many data values/slices to fit in pie chart so we need to group them into ranges
      let dataMinValue: number = Number.MAX_VALUE;
      let dataMaxValue: number = Number.MIN_VALUE;
      // getting min and max values
      dataCounter.forEach((id, value) => {
        dataMinValue = Math.min(value, dataMinValue);
        dataMaxValue = Math.max(value, dataMaxValue);
      });
      // calculating nice/round range interval/divisions
      let dataValueGroups = 20;
      let dataValueRange = dataMaxValue - dataMinValue;

      let dataValueMultiplier = 1;
      if (dataValueRange < 10) {
        dataValueMultiplier = 100; // for very small values (e.g. B/O Spread column)
      }
      let dataRangeInterval = (dataValueRange * dataValueMultiplier) / dataValueGroups;
      let dataRangeDivisions = Math.floor(dataRangeInterval / 10 + 1) * 10;

      let dataRanges = new Map<number, any>();
      // grouping all data values into ranges by checking which range a value belongs to
      dataCounter.forEach((id, value) => {
        let rangeKey = Math.floor((value * dataValueMultiplier) / dataRangeDivisions);
        if (dataRanges.has(rangeKey)) {
          let range = dataRanges.get(rangeKey);
          range.values.push(value);
          dataRanges.set(rangeKey, range);
        } else {
          let rangeMin: any = (rangeKey / dataValueMultiplier) * dataRangeDivisions;
          let rangeMax: any = ((rangeKey + 1) / dataValueMultiplier) * dataRangeDivisions;

          let range = { min: rangeMin, max: rangeMax, values: [value] };
          if (dataValueMultiplier > 1) {
            range.min = rangeMin.toFixed(1);
            range.max = rangeMax.toFixed(1);
          } else {
            range.min = NumberExtensions.abbreviateNumber(rangeMin);
            range.max = NumberExtensions.abbreviateNumber(rangeMax);
          }
          dataRanges.set(rangeKey, range);
        }
      });

      // finally we can generate slice items based on data ranges
      dataRanges.forEach((range, key) => {
        let sliceItem: PieChartDataItem = {
          Name: '[' + range.min + ' to ' + range.max + ']',
          Value: range.values.length,
          // calculating ratio of number of values in this range to total number of all data rows and rounded to 1 decimal place
          Ratio: Math.round((range.values.length / dataCounter.size) * 1000) / 10,
        };
        sliceItem.ValueAndName = sliceItem.Value + ' - ' + sliceItem.Name;
        sliceItem.RatioAndName = sliceItem.Ratio.toFixed(0) + ' - ' + sliceItem.Name;
        sliceItem.ValueAndName = StringExtensions.abbreviateString(sliceItem.ValueAndName, 50);
        sliceItem.RatioAndName = StringExtensions.abbreviateString(sliceItem.RatioAndName, 50);
        sliceItem.Name = StringExtensions.abbreviateString(sliceItem.Name, 50);
        dataItems.push(sliceItem);
      });
    }
    return {
      Data: dataItems,
      ErrorMessage: null,
    };
  }

  private createNonRangeDataItem(value: number, name: any, valueTotal: number): PieChartDataItem {
    let pieChartDataItem: PieChartDataItem = {
      Name: name.toString(),
      Value: Helper.RoundNumber(value, 1),
      // calculating ratio of column value to total values of all columns and rounded to 1 decimal place
      Ratio: Math.round((value / valueTotal) * 1000) / 10,
    };
    pieChartDataItem.ValueAndName =
      NumberExtensions.abbreviateNumber(pieChartDataItem.Value) + ' - ' + pieChartDataItem.Name;
    pieChartDataItem.RatioAndName =
      pieChartDataItem.Ratio.toFixed(0) + ' - ' + pieChartDataItem.Name;
    pieChartDataItem.ValueAndName = StringExtensions.abbreviateString(
      pieChartDataItem.ValueAndName,
      50
    );
    pieChartDataItem.RatioAndName = StringExtensions.abbreviateString(
      pieChartDataItem.RatioAndName,
      50
    );
    pieChartDataItem.Name = StringExtensions.abbreviateString(pieChartDataItem.Name, 50);

    return pieChartDataItem;
  }

  private shouldUseRange(
    dataCounter: Map<any, number>,
    chartDefinition: PieChartDefinition,
    columns: AdaptableColumn[]
  ): boolean {
    let returnValue: boolean = false;
    if (dataCounter.size > 15) {
      let primaryColumn = this.adaptable.api.columnApi.getColumnFromId(
        chartDefinition.PrimaryColumnId
      );
      let primaryColumnIsNumeric: boolean = this.adaptable.api.columnApi.isNumericColumn(
        primaryColumn
      );

      returnValue = primaryColumnIsNumeric;
    }
    return returnValue;
  }

  private getGroupValueTotalForRow(
    row: any,
    chartDefinition: PieChartDefinition,
    dataCounter: Map<any, number>,
    valueTotal: number
  ): number {
    let primaryCellValue = this.adaptable.getRawValueFromRowNode(
      row,
      chartDefinition.PrimaryColumnId
    );
    let secondaryCellValue = this.adaptable.getRawValueFromRowNode(
      row,
      chartDefinition.SecondaryColumnId
    );
    if (Helper.objectNotExists(secondaryCellValue)) {
      return valueTotal;
    }

    let group: string = '';
    let count: number = 0;
    if (chartDefinition.SecondaryColumnOperation == SecondaryColumnOperation.Sum) {
      count = parseFloat(secondaryCellValue); //+ parseFloat(primaryCellValue);
      group = primaryCellValue;
    } else {
      count = 1;
      group = StringExtensions.abbreviateString(primaryCellValue + ' ' + secondaryCellValue, 50);
    }

    if (dataCounter.has(group)) {
      dataCounter.set(group, dataCounter.get(group) + count);
    } else {
      dataCounter.set(group, count);
    }
    valueTotal += count;
    return valueTotal;
  }

  private getSingleValueTotalForRow(
    row: any,
    chartDefinition: PieChartDefinition,
    dataCounter: Map<any, number>,
    valueTotal: number
  ): number {
    let cellValue = this.adaptable.getRawValueFromRowNode(row, chartDefinition.PrimaryColumnId);
    if (Helper.objectNotExists(cellValue)) {
      return valueTotal;
    }
    if (dataCounter.has(cellValue)) {
      dataCounter.set(cellValue, dataCounter.get(cellValue) + 1);
    } else {
      dataCounter.set(cellValue, 1);
    }
    valueTotal += 1;
    return valueTotal;
  }
}
