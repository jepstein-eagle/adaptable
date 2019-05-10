import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy';
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux';
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Utilities/Interface/IColumn';
import { DataType, StateChangedTrigger } from '../Utilities/Enums';
import { IFlashingCell } from '../Utilities/Interface/BlotterObjects/IFlashingCell';
import { IDataChangedInfo } from '../Utilities/Interface/IDataChangedInfo';

export abstract class FlashingCellsStrategy extends AdaptableStrategyBase
  implements IFlashingCellsStrategy {
  protected FlashingCellState: FlashingCellState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.FlashingCellsStrategyId, blotter);
    if (this.shouldHandleDataSourceChanged()) {
      this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) =>
        this.handleDataSourceChanged(eventText)
      );
    }
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.FlashingCellsStrategyName,
      ScreenPopups.FlashingCellsPopup,
      StrategyConstants.FlashingCellGlyph
    );
  }

  public addContextMenuItem(column: IColumn): void {
    if (this.canCreateContextMenuItem(column, this.blotter)) {
      if (column.DataType == DataType.Number) {
        if (
          this.blotter.api.calculatedColumnApi
            .getAllCalculatedColumn()
            .find(c => c.ColumnId == column.ColumnId) == null
        ) {
          let flashingCell = this.FlashingCellState.FlashingCells.find(
            x => x.ColumnId == column.ColumnId
          );
          if (flashingCell && flashingCell.IsLive) {
            this.createContextMenuItemReduxAction(
              'Turn Flashing Cell Off',
              StrategyConstants.FlashingCellGlyph,
              FlashingCellsRedux.FlashingCellSelect(flashingCell)
            );
          } else {
            if (!flashingCell) {
              flashingCell = ObjectFactory.CreateDefaultFlashingCell(
                column,
                this.FlashingCellState.DefaultUpColor,
                this.FlashingCellState.DefautDownColor,
                this.FlashingCellState.DefaultDuration
              );
            }
            this.createContextMenuItemReduxAction(
              'Turn Flashing Cell On',
              StrategyConstants.FlashingCellGlyph,
              FlashingCellsRedux.FlashingCellSelect(flashingCell)
            );
          }
        }
      }
    }
  }

  protected InitState() {
    if (this.FlashingCellState != this.blotter.api.flashingCellApi.getFlashingCellState()) {
      this.FlashingCellState = this.blotter.api.flashingCellApi.getFlashingCellState();

      if (this.blotter.isInitialised) {
        this.publishStateChanged(StateChangedTrigger.FlashingCell, this.FlashingCellState);
      }
    }
  }

  protected handleDataSourceChanged(dataChangedInfo: IDataChangedInfo) {
    let flashingCell: IFlashingCell = this.FlashingCellState.FlashingCells.find(
      f => f.ColumnId == dataChangedInfo.ColumnId
    );
    if (flashingCell && flashingCell.IsLive) {
      this.FlashCell(dataChangedInfo, flashingCell);
    }
  }

  protected abstract shouldHandleDataSourceChanged(): boolean;

  protected abstract FlashCell(
    dataChangedInfo: IDataChangedInfo,
    flashingCell: IFlashingCell
  ): void;
}
