import { MenuItemDoReduxAction } from '../Core/MenuItem'
import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { ObjectFactory } from '../Core/ObjectFactory'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingCellsStrategy } from './Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { DataType, StateChangedTrigger } from '../Core/Enums';
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { IFlashingCell } from '../Core/Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../Core/Interface/IColumn';
import { ColumnHelper } from '../Core/Helpers/ColumnHelper';


export abstract class FlashingCellsStrategy extends AdaptableStrategyBase implements IFlashingCellsStrategy {
    protected FlashingCellState: FlashingCellState


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.FlashingCellsStrategyId, blotter)
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.FlashingCellsStrategyName, ScreenPopups.FlashingCellsPopup, StrategyConstants.FlashingCellGlyph);
    }

    public addContextMenuItem(columnId: string): void {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            let column: IColumn = ColumnHelper.getColumnFromId(columnId, this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);

            if (column.DataType == DataType.Number) {
                if (this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns.find(c => c.ColumnId == columnId) == null) {

                    let flashingCell = this.FlashingCellState.FlashingCells.find(x => x.ColumnId == columnId)
                    if (flashingCell && flashingCell.IsLive) {
                        this.createContextMenuItemReduxAction(
                            "Turn Flashing Cell Off",
                            StrategyConstants.FlashingCellGlyph,
                            FlashingCellsRedux.FlashingCellSelect(flashingCell)
                        )
                    }
                    else {
                        if (!flashingCell) {
                            let column = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(x => x.ColumnId == columnId)
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