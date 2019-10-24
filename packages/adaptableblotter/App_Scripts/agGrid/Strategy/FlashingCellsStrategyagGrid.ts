import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { DataChangedInfo } from '../../Utilities/Interface/DataChangedInfo';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { ChangeDirection } from '../../Utilities/Services/Interface/IDataService';
import { FlashingCell } from '../../PredefinedConfig/RunTimeState/FlashingCellState';

export class FlashingCellStrategyagGrid extends FlashingCellsStrategy
  implements IFlashingCellsStrategy {
  constructor(blotter: AdaptableBlotter) {
    super(blotter);
    this.currentFlashing = new Map();
  }
  private currentFlashing: Map<any, number>;

  public initStyles(): void {
    let numericColumns = ColumnHelper.getNumericColumns(this.blotter.api.gridApi.getColumns());
    let theBlotter = this.blotter as AdaptableBlotter;
    let currentFlashing = this.currentFlashing;
    let flashingCells: FlashingCell[] = this.blotter.api.flashingCellApi.getAllFlashingCell();
    numericColumns.forEach(col => {
      let fc = flashingCells.find(x => x.ColumnId == col.ColumnId && x.IsLive);
      let cellClassRules: any = {};
      if (fc) {
        cellClassRules[StyleConstants.FLASH_UP_STYLE + '-' + fc.Uuid] = function(params: any) {
          let primaryKey = theBlotter.getPrimaryKeyValueFromRowNode(params.node);
          let key = primaryKey + col.ColumnId + 'up';
          let currentFlashTimer = currentFlashing.get(key);
          if (currentFlashTimer) {
            return true;
          }

          let oldValue = theBlotter.DataService.GetPreviousColumnValue(
            col.ColumnId,
            primaryKey,
            params.value,
            ChangeDirection.Up
          );
          if (oldValue && params.value > oldValue) {
            if (currentFlashTimer) {
              window.clearTimeout(currentFlashTimer);
            }
            let timer: number = window.setTimeout(() => {
              currentFlashing.set(key, null);
              theBlotter.refreshCells([params.node], [col.ColumnId]);
            }, fc.FlashingCellDuration);
            currentFlashing.set(key, timer);
            return true;
          } else {
            return false;
          }
        };

        cellClassRules[StyleConstants.FLASH_DOWN_STYLE + '-' + fc.Uuid] = function(params: any) {
          let primaryKey = theBlotter.getPrimaryKeyValueFromRowNode(params.node);
          let key = primaryKey + col.ColumnId + 'down';
          let currentFlashTimer = currentFlashing.get(key);
          if (currentFlashTimer) {
            return true;
          }
          let oldValue = theBlotter.DataService.GetPreviousColumnValue(
            col.ColumnId,
            primaryKey,
            params.value,
            ChangeDirection.Down
          );
          if (oldValue && params.value < oldValue) {
            if (currentFlashTimer) {
              window.clearTimeout(currentFlashTimer);
            }
            let timer: any = window.setTimeout(() => {
              currentFlashing.set(key, null);
              theBlotter.refreshCells([params.node], [col.ColumnId]);
            }, fc.FlashingCellDuration);
            currentFlashing.set(key, timer);
            return true;
          } else {
            return false;
          }
        };
      }
      theBlotter.setCellClassRules(cellClassRules, col.ColumnId, 'FlashingCell');
    });
  }
}
