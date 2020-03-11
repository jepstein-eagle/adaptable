import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ICellSummaryStrategy } from './Interface/ICellSummaryStrategy';
import { SelectedCellInfo } from '../PredefinedConfig/Selection/SelectedCellInfo';
import { CellSummmary } from '../PredefinedConfig/Selection/CellSummmary';
import { GridCell } from '../PredefinedConfig/Selection/GridCell';
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
    if (this.canCreateMenuItem('Full')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.CellSummaryStrategyFriendlyName,
        ComponentName: ScreenPopups.CellSummaryPopup,
        Icon: StrategyConstants.CellSummaryGlyph,
      });
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (this.canCreateMenuItem('Full')) {
      let popUpParams: StrategyParams = {
        source: 'ContextMenu',
      };
      if (menuInfo.Column && menuInfo.IsSelectedCell) {
        menuItemShowPopup = this.createMainMenuItemShowPopup({
          Label: 'See Cell Summary',
          ComponentName: ScreenPopups.CellSummaryPopup,
          Icon: StrategyConstants.CellSummaryGlyph,
          PopupParams: popUpParams,
        });
      }
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
        let value = selectedCell.rawValue;
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
        Sum: hasNumericColumns ? Helper.RoundNumberTo4dp(Helper.sumNumberArray(numericValues)) : '',
        Average: hasNumericColumns
          ? Helper.RoundNumberTo4dp(Helper.meanNumberArray(numericValues))
          : '',
        Median: hasNumericColumns
          ? Helper.RoundNumberTo4dp(Helper.medianNumberArray(numericValues))
          : '',
        Mode: hasNumericColumns
          ? Helper.RoundNumberTo4dp(Helper.modeNumberArray(numericValues))
          : '',
        Distinct: distinctCount,
        Max: hasNumericColumns ? Helper.RoundNumberTo4dp(Math.max(...numericValues)) : '',
        Min: hasNumericColumns ? Helper.RoundNumberTo4dp(Math.min(...numericValues)) : '',
        Count: allValues.length,
      };
      const operationDefinitions = this.adaptable.api.cellSummaryApi.getCellSummaryOperationDefinitions();

      operationDefinitions.forEach((operation: CellSummaryOperationDefinition) => {
        if (operation.OperationFunction) {
          const fn = this.adaptable.getUserFunctionHandler(
            'CellSummary.OperationFunction',
            operation.OperationFunction
          );
          selectedCellSummary[operation.OperationName] = fn({
            selectedCellInfo,
            distinctCount,
            allValues,
            numericValues,
            numericColumns,
          });
        }
      });
    }
    return selectedCellSummary;
  }
}
