import { MenuReduxActionItem } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import * as StrategyNames from '../Core/StrategyNames'
import * as StrategyGlyphs from '../Core/StrategyGlyphs'
import * as ScreenPopups from '../Core/ScreenPopups'
import { ObjectFactory } from '../Core/ObjectFactory'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingCellsStrategy, IFlashingColumn } from '../Core/Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import {  DataType } from '../Core/Enums';
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'


export abstract class FlashingCellsStrategy extends AdaptableStrategyBase implements IFlashingCellsStrategy {
    protected FlashingCellState: FlashingCellState
   

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FlashingCellsStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.FlashingCellsStrategyName, ScreenPopups.FlashingCellsConfig, StrategyGlyphs.FlashingCellGlyph);
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
                        StrategyGlyphs.FlashingCellGlyph)))
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
                        StrategyGlyphs.FlashingCellGlyph)))
            }
        }

    }

    protected InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;
        }
    }

    protected handleDataSourceChanged(DataChangedEvent: IDataChangedEvent) {
        let flashingColumn: IFlashingColumn = this.FlashingCellState.FlashingColumns.find(f => f.ColumnName == DataChangedEvent.ColumnId);
        let flashingColumnIndex = this.FlashingCellState.FlashingColumns.indexOf(flashingColumn)
        if (flashingColumn != null && flashingColumn.IsLive) {
            this.FlashCell(DataChangedEvent, flashingColumn, flashingColumnIndex);
        }
    }

    protected abstract FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn, index: number): void ;

}