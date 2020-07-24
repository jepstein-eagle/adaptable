import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy';
import { Adaptable } from '../Adaptable';
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ChangeDirection } from '../../Utilities/Services/Interface/IDataService';
import { FlashingCell } from '../../PredefinedConfig/FlashingCellState';
import { CellClassParams } from '@ag-grid-community/all-modules';

export class FlashingCellStrategyagGrid extends FlashingCellsStrategy
  implements IFlashingCellsStrategy {
  constructor(adaptable: Adaptable) {
    super(adaptable);
    this.currentFlashing = new Map();
  }
  private currentFlashing: Map<any, number>;

  public initStyles(): void {
    let numericColumns = this.adaptable.api.gridApi.getNumericColumns();
    let theadaptable = this.adaptable as Adaptable;
    let currentFlashing = this.currentFlashing;
    let flashingCells: FlashingCell[] = this.adaptable.api.flashingCellApi.getAllFlashingCell();
    numericColumns.forEach(col => {
      let fc = flashingCells.find(x => x.ColumnId == col.ColumnId && x.IsLive);
      let cellClassRules: any = {};
      if (fc) {
        let duration: 250 | 500 | 750 | 1000 = fc.FlashingCellDuration
          ? fc.FlashingCellDuration
          : this.adaptable.api.flashingCellApi.getFlashingCellState().DefaultDuration;
        cellClassRules[StyleConstants.FLASH_CELL_UP_STYLE + '-' + fc.Uuid] = function(
          params: CellClassParams
        ) {
          const newValue: number = Number(params.value);
          // should we check if its not a number?

          if (theadaptable.api.internalApi.isGridInPivotMode()) {
            return false;
          }
          let primaryKey = theadaptable.getPrimaryKeyValueFromRowNode(params.node);
          let key = primaryKey + col.ColumnId + 'up';
          let currentFlashTimer = currentFlashing.get(key);
          if (currentFlashTimer) {
            return true;
          }

          let oldValue: number = theadaptable.DataService.GetPreviousColumnValue(
            col.ColumnId,
            primaryKey,
            newValue,
            ChangeDirection.Up
          );
          if (oldValue && newValue > oldValue) {
            if (currentFlashTimer) {
              window.clearTimeout(currentFlashTimer);
            }
            let timer: number = window.setTimeout(() => {
              currentFlashing.set(key, null);
              theadaptable.refreshCells([params.node], [col.ColumnId]);
            }, duration);
            currentFlashing.set(key, timer);
            return true;
          } else {
            return false;
          }
        };

        cellClassRules[StyleConstants.FLASH_CELL_DOWN_STYLE + '-' + fc.Uuid] = function(
          params: CellClassParams
        ) {
          if (theadaptable.api.internalApi.isGridInPivotMode()) {
            return false;
          }
          const newValue: number = Number(params.value);
          let primaryKey = theadaptable.getPrimaryKeyValueFromRowNode(params.node);
          let key = primaryKey + col.ColumnId + 'down';
          let currentFlashTimer = currentFlashing.get(key);
          if (currentFlashTimer) {
            return true;
          }
          let oldValue = theadaptable.DataService.GetPreviousColumnValue(
            col.ColumnId,
            primaryKey,
            newValue,
            ChangeDirection.Down
          );
          if (oldValue && newValue < oldValue) {
            if (currentFlashTimer) {
              window.clearTimeout(currentFlashTimer);
            }
            let timer: any = window.setTimeout(() => {
              currentFlashing.set(key, null);
              theadaptable.refreshCells([params.node], [col.ColumnId]);
            }, duration);
            currentFlashing.set(key, timer);
            return true;
          } else {
            return false;
          }
        };
      }
      theadaptable.setCellClassRules(cellClassRules, col.ColumnId, 'FlashingCell');
    });
  }
}
