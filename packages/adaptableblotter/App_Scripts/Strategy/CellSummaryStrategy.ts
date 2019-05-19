import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ICellSummaryStrategy } from './Interface/ICellSummaryStrategy';
import { ISelectedCellInfo } from '../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { ICellSummmary } from '../Utilities/Interface/SelectedCell/ICellSummmary';
import { ISelectedCell } from '../Utilities/Interface/SelectedCell/ISelectedCell';
import { DataType, CellSummaryOptionalOperation } from '../Utilities/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { Helper } from '../Utilities/Helpers/Helper';

export class CellSummaryStrategy extends AdaptableStrategyBase implements ICellSummaryStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CellSummaryStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.CellSummaryStrategyName,
      ScreenPopups.CellSummaryPopup,
      StrategyConstants.CellSummaryGlyph
    );
  }

  public CreateCellSummary(selectedCellInfo: ISelectedCellInfo): ICellSummmary {
    let selectedCellSummary: ICellSummmary;

    if (selectedCellInfo && selectedCellInfo.Selection.size > 0) {
      let numericValues: number[] = [];
      let allValues: any[] = [];
      let numericColumns: number[] = [];

      selectedCellInfo.Columns.map((c, index) => {
        if (c.DataType == DataType.Number) {
          numericColumns.push(index);
        }
      });

      selectedCellInfo.Selection.forEach(selectedCells => {
        let i: number;
        for (i = 0; i < selectedCells.length; i++) {
          let selectedCell: ISelectedCell = selectedCells[i];
          let value = selectedCell.value;
          allValues.push(value);

          if (numericColumns.indexOf(i) != -1) {
            let valueAsNumber = Number(value);
            // possible that its not a number despite it being a numeric column
            if (!isNaN(Number(valueAsNumber))) {
              numericValues.push(valueAsNumber);
            }
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
        Distinct: distinctCount,
        Max: hasNumericColumns ? Helper.RoundNumberTo4dp(Math.max(...numericValues)) : '',
        Min: hasNumericColumns ? Helper.RoundNumberTo4dp(Math.min(...numericValues)) : '',
        Count: allValues.length,
        Only: this.calculateOnly(distinctCount, allValues),
        VWAP: this.calculateVwap(numericValues, numericColumns),
      };
    }
    return selectedCellSummary;
  }

  private sumNumberArray(numericValues: number[]): number {
    return numericValues.reduce(function(a, b) {
      return a + b;
    }, 0);
  }

  private meanNumberArray(numericValues: number[]): number {
    return this.sumNumberArray(numericValues) / numericValues.length;
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

  private calculateOnly(distinctCount: number, allValues: any[]): any {
    if (
      ArrayExtensions.NotContainsItem(
        this.blotter.api.cellSummaryApi.getCellSummaryState().OptionalSummaryOperations,
        CellSummaryOptionalOperation.Only
      )
    ) {
      return null;
    }
    return distinctCount == 1 ? allValues[0] : '';
  }

  private calculateVwap(numericValues: number[], numericColumns: number[]): any {
    if (
      ArrayExtensions.NotContainsItem(
        this.blotter.api.cellSummaryApi.getCellSummaryState().OptionalSummaryOperations,
        CellSummaryOptionalOperation.VWAP
      )
    ) {
      return null;
    }
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
