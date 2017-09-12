import { MenuReduxActionItem } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import { ObjectFactory } from '../Core/ObjectFactory'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingCellsStrategy, IFlashingColumn, IFlashingCellDuration } from '../Core/Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { MenuType, DataType } from '../Core/Enums';
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'


export class FlashingCellsStrategy extends AdaptableStrategyBase implements IFlashingCellsStrategy {
    protected FlashingCellState: FlashingCellState
    protected FLASH_UP_STYLE: string = "Ab-FlashUp"
    protected FLASH_DOWN_STYLE: string = "Ab-FlashDown"

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FlashingCellsStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Flashing Cell", 'FlashingCellsConfig', MenuType.ConfigurationPopup, "flash");
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        // TODO: test extension works
    }

    protected addColumnMenuItems(columnId: string): void {
        if (this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(x => x.ColumnId == columnId).DataType == DataType.Number) {
            let flashingCell = this.FlashingCellState.FlashingColumns.find(x => x.ColumnName == columnId)
            if (flashingCell && flashingCell.IsLive) {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                    MenuRedux.AddItemColumnContextMenu(new MenuReduxActionItem(
                        "Turn Flashing Cell Off",
                        this.Id,
                        FlashingCellsRedux.FlashingCellSelect(flashingCell),
                        "flash")))
            }
            else {
                if (!flashingCell) {
                    let column = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(x => x.ColumnId == columnId)
                    flashingCell = ObjectFactory.CreateDefaultFlashingColumn(column)
                }
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                    MenuRedux.AddItemColumnContextMenu(new MenuReduxActionItem(
                        "Turn Flashing Cell On",
                        this.Id,
                        FlashingCellsRedux.FlashingCellSelect(flashingCell),
                        "flash")))
            }
        }

    }

    protected InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;
        }
    }

    private handleDataSourceChanged(DataChangedEvent: IDataChangedEvent) {
        let flashingColumn: IFlashingColumn = this.FlashingCellState.FlashingColumns.find(f => f.ColumnName == DataChangedEvent.ColumnId);
        let flashingColumnIndex = this.FlashingCellState.FlashingColumns.indexOf(flashingColumn)
        if (flashingColumn != null && flashingColumn.IsLive) {
            this.FlashCell(DataChangedEvent, flashingColumn, flashingColumnIndex);
        }
    }

    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn, index: number): void {
        if (dataChangedEvent.OldValue == null) return;
        var oldvalueNumber: Number = Number(dataChangedEvent.OldValue);
        var newValueNumber: Number = Number(dataChangedEvent.NewValue);

        var cellStyle: string = (oldvalueNumber > newValueNumber) ? this.FLASH_DOWN_STYLE : this.FLASH_UP_STYLE
        let columnIndex = this.blotter.getColumnIndex(dataChangedEvent.ColumnId);
        //Jo : we know that this function is wrong as it's not cumulative
        this.blotter.addCellStyle(dataChangedEvent.IdentifierValue, columnIndex, cellStyle + index, flashingColumn.FlashingCellDuration.Duration)
    }

}