import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { ICellSummaryStrategy } from './Interface/ICellSummaryStrategy';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { ICellSummmary } from '../Utilities/Interface/Selection/ICellSummmary';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { DataType, CellSummaryOptionalOperation } from '../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { Helper } from '../Utilities/Helpers/Helper';
import {
  AdaptableBlotterMenuItem,
  ContextMenuInfo,
  MenuItemShowPopup,
} from '../Utilities/MenuItem';

export class CellSummaryStrategy extends AdaptableStrategyBase implements ICellSummaryStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CellSummaryStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CellSummaryStrategyName,
      ComponentName: ScreenPopups.CellSummaryPopup,
      Icon: StrategyConstants.CellSummaryGlyph,
    });
  }

  public addContextMenuItem(
    contextMenuInfo: ContextMenuInfo
  ): AdaptableBlotterMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (contextMenuInfo.column && contextMenuInfo.isSelectedCell) {
      menuItemShowPopup = this.createMainMenuItemShowPopup({
        Label: StrategyConstants.CellSummaryStrategyName,
        ComponentName: ScreenPopups.CellSummaryPopup,
        Icon: StrategyConstants.CellSummaryGlyph,
      });
    }
    return menuItemShowPopup;
  }

  public CreateCellSummary(selectedCellInfo: SelectedCellInfo): ICellSummmary {
    let selectedCellSummary: ICellSummmary;

    if (selectedCellInfo && ArrayExtensions.IsNotNullOrEmpty(selectedCellInfo.Columns)) {
      let numericValues: number[] = [];
      let allValues: any[] = [];
      let numericColumns: string[] = [];

      selectedCellInfo.Columns.map(c => {
        if (c && c.DataType == DataType.Number) {
          numericColumns.push(c.ColumnId);
        }
      });

      selectedCellInfo.GridCells.forEach((selectedCell: GridCell) => {
        let value = selectedCell.value;
        allValues.push(value);

        if (ArrayExtensions.ContainsItem(numericColumns, selectedCell.columnId)) {
          let valueAsNumber = Number(value);
          // possible that its not a number despite it being a numeric column
          if (!isNaN(Number(valueAsNumber))) {
            numericValues.push(valueAsNumber);
          }
        }
      });

      let hasNumericColumns: boolean = numericValues.length > 0;
      let distinctCount: number = ArrayExtensions.RetrieveDistinct(allValues).length;
      selectedCellSummary = {
        Sum: hasNumericColumns ? Helper.RoundNumberTo4dp(this.sumNumberArray(numericValues)) : '',
        Average: hasNumericColumns
          ? Helper.RoundNumberTo4dp(this.meanNumberArray(numericValues))
          : '',
        Median: hasNumericColumns
          ? Helper.RoundNumberTo4dp(this.medianNumberArray(numericValues))
          : '',
        Mode: hasNumericColumns ? Helper.RoundNumberTo4dp(this.modeNumberArray(numericValues)) : '',
        Distinct: distinctCount,
        Max: hasNumericColumns ? Helper.RoundNumberTo4dp(Math.max(...numericValues)) : '',
        Min: hasNumericColumns ? Helper.RoundNumberTo4dp(Math.min(...numericValues)) : '',
        Count: allValues.length,
      };
      if (this.blotter.api.cellSummaryApi.hasOnlySummary()) {
        selectedCellSummary.Only = this.calculateOnly(distinctCount, allValues);
      }
      if (this.blotter.api.cellSummaryApi.hasVWAPSummary()) {
        selectedCellSummary.VWAP = this.calculateVwap(numericValues, numericColumns);
      }
    }
    return selectedCellSummary;
  }

  private sumNumberArray(numericValues: number[]): number {
    if (numericValues.length) {
      let sum = numericValues.reduce(function(a, b) {
        return a + b;
      });
      return sum;
    } else {
      return 0;
    }
  }

  private meanNumberArray(numericValues: number[]): number {
    // dividing by 0 will return Infinity
    // arr must contain at least 1 element to use reduce
    if (numericValues.length) {
      let sum = this.sumNumberArray(numericValues);
      return sum / numericValues.length;
    } else {
      return 0;
    }
  }

  private medianNumberArray(numericValues: number[]): number {
    // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
    var median = 0,
      numsLen = numericValues.length;
    numericValues.sort();

    if (
      numsLen % 2 ===
      0 // is even
    ) {
      // average of two middle numbers
      median = (numericValues[numsLen / 2 - 1] + numericValues[numsLen / 2]) / 2;
    } else {
      // is odd
      // middle number only
      median = numericValues[(numsLen - 1) / 2];
    }
    return median;
  }

  private modeNumberArray(numbers: number[]): number {
    if (numbers.length === 0) {
      return 0;
    }

    const m = numbers
      .reduce((items, current) => {
        const item = items.length === 0 ? null : items.find(x => x.value === current);
        item ? item.occurrence++ : items.push({ value: current, occurrence: 1 });
        return items;
      }, [])
      .sort((a, b) => {
        if (a.occurrence < b.occurrence) {
          return 1;
        } else if (a.occurrence > b.occurrence || a.value < b.value) {
          return -1;
        } else {
          return a.value === b.value ? 0 : 1;
        }
      });

    return m[0].value;
  }

  private calculateOnly(distinctCount: number, allValues: any[]): any {
    return distinctCount == 1 ? allValues[0] : '';
  }

  private calculateVwap(numericValues: number[], numericColumns: string[]): any {
    if (numericColumns.length == 2) {
      return '';
    }

    let firstColValues: number[] = [];
    let secondColComputedValues: number[] = [];
    for (var i = 0; i < numericValues.length; i++) {
      if (i % 2 === 0) {
        // index is odd
        firstColValues.push(numericValues[i]);
      } else {
        let newValue: any = numericValues[i] * numericValues[i - 1];
        secondColComputedValues.push(newValue);
      }
    }
    let firstColTotal: number = this.sumNumberArray(firstColValues);
    let secondColTotal: number = this.sumNumberArray(secondColComputedValues);
    let result: any = Helper.RoundNumberTo4dp(secondColTotal / firstColTotal);
    return result;
  }
}
