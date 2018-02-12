import { MenuItemDoReduxAction } from '../Core/MenuItem'
import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { ObjectFactory } from '../Core/ObjectFactory'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingCellsStrategy, IFlashingColumn } from '../Strategy/Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { DataType } from '../Core/Enums';
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'


export abstract class FlashingCellsStrategy extends AdaptableStrategyBase implements IFlashingCellsStrategy {
    protected FlashingCellState: FlashingCellState


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FlashingCellsStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.FlashingCellsStrategyName, ScreenPopups.FlashingCellsPopup, StrategyGlyphs.FlashingCellGlyph);
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
    }

    protected addColumnMenuItems(columnId: string): void {
        if (this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(x => x.ColumnId == columnId).DataType == DataType.Number) {
            if (!this.isReadOnlyStrategy()) {
                let flashingCell = this.FlashingCellState.FlashingColumns.find(x => x.ColumnName == columnId)
                if (flashingCell && flashingCell.IsLive) {
                    this.createMenuItemReduxAction(
                        "Turn Flashing Cell Off",
                        StrategyGlyphs.FlashingCellGlyph,
                        FlashingCellsRedux.FlashingCellSelect(flashingCell)
                    )
                }
                else {
                    if (!flashingCell) {
                        let column = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(x => x.ColumnId == columnId)
                        flashingCell = ObjectFactory.CreateDefaultFlashingColumn(column)
                    }
                    this.createMenuItemReduxAction(
                        "Turn Flashing Cell On",
                        StrategyGlyphs.FlashingCellGlyph,
                        FlashingCellsRedux.FlashingCellSelect(flashingCell)
                    )
                }
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

    protected abstract FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn, index: number): void;

}