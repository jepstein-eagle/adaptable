import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ICellSummaryStrategy } from './Interface/ICellSummaryStrategy';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { CellSummmary } from '../Utilities/Interface/Selection/CellSummmary';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { Helper } from '../Utilities/Helpers/Helper';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { CellSummaryOperationDefinition } from '../PredefinedConfig/CellSummaryState';

export class CellSummaryStrategy extends AdaptableStrategyBase implements ICellSummaryStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.CellSummaryStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CellSummaryStrategyFriendlyName,
      ComponentName: ScreenPopups.CellSummaryPopup,
      Icon: StrategyConstants.CellSummaryGlyph,
    });
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    let popUpParams: StrategyParams = {
      source: 'ContextMenu',
    };
    if (menuInfo.column && menuInfo.isSelectedCell) {
      menuItemShowPopup = this.createMainMenuItemShowPopup({
        Label: 'See Cell Summary',
        ComponentName: ScreenPopups.CellSummaryPopup,
        Icon: StrategyConstants.CellSummaryGlyph,
        PopupParams: popUpParams,
      });
    }
    return menuItemShowPopup;
  }

  public CreateCellSummary(selectedCellInfo: SelectedCellInfo): CellSummmary {
    let selectedCellSummary: CellSummmary;

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
      const operationDefinitions = this.adaptable.api.internalApi.getCellSummaryOperationDefinitions();

      operationDefinitions.forEach((operation: CellSummaryOperationDefinition) => {
        selectedCellSummary[operation.OperationName] = operation.OperationFunction({
          selectedCellInfo,
          distinctCount,
          allValues,
          numericValues,
          numericColumns,
        });
      });
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
}
