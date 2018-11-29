import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { ObjectFactory } from '../Utilities/ObjectFactory'
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter'
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy'
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux'
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../Api/Interface/IColumn';
import { DataType, StateChangedTrigger } from '../Utilities/Enums';
import { IDataChangedEvent } from '../Utilities/Services/Interface/IAuditService';
import { IFlashingCell } from '../Api/Interface/IAdaptableBlotterObjects';

export abstract class FlashingCellsStrategy extends AdaptableStrategyBase implements IFlashingCellsStrategy {
    protected FlashingCellState: FlashingCellState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.FlashingCellsStrategyId, blotter)
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.FlashingCellsStrategyName, ScreenPopups.FlashingCellsPopup, StrategyConstants.FlashingCellGlyph);
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
          
            if (column.DataType == DataType.Number) {
                if (this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns.find(c => c.ColumnId == column.ColumnId) == null) {

                    let flashingCell = this.FlashingCellState.FlashingCells.find(x => x.ColumnId == column.ColumnId)
                    if (flashingCell && flashingCell.IsLive) {
                        this.createContextMenuItemReduxAction(
                            "Turn Flashing Cell Off",
                            StrategyConstants.FlashingCellGlyph,
                            FlashingCellsRedux.FlashingCellSelect(flashingCell)
                        )
                    }
                    else {
                        if (!flashingCell) {
                            flashingCell = ObjectFactory.CreateDefaultFlashingCell(column)
                        }
                        this.createContextMenuItemReduxAction(
                            "Turn Flashing Cell On",
                            StrategyConstants.FlashingCellGlyph,
                            FlashingCellsRedux.FlashingCellSelect(flashingCell)
                        )
                    }
                }
            }
        }
    }

    protected InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.FlashingCell, this.FlashingCellState)
            }
        }
    }

    protected handleDataSourceChanged(DataChangedEvent: IDataChangedEvent) {
        let flashingCell: IFlashingCell = this.FlashingCellState.FlashingCells.find(f => f.ColumnId == DataChangedEvent.ColumnId);
        let flashingCellIndex = this.FlashingCellState.FlashingCells.indexOf(flashingCell)
        if (flashingCell != null && flashingCell.IsLive) {
            this.FlashCell(DataChangedEvent, flashingCell, flashingCellIndex);
        }
    }

    protected abstract FlashCell(dataChangedEvent: IDataChangedEvent, flashingCell: IFlashingCell, index: number): void;

}