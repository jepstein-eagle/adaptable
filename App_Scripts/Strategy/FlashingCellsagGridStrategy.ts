import { FlashingCellsStrategy } from './FlashingCellsStrategy'
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter'
import { IFlashingCellsStrategy, IFlashingColumn, IFlashingCellDuration } from '../Core/Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { FlashingCellState } from '../Redux/ActionsReducers/Interface/IState';
import { MenuType } from '../Core/Enums';
import * as FlashingCellsRedux from '../Redux/ActionsReducers/FlashingCellsRedux'

export class FlashingCellsagGridStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(private blotterBypass: AdaptableBlotter) {
        super(blotterBypass)
        this.currentFlashing = new Map()
    }
    private currentFlashing: Map<any, { down: boolean, timer: number }>


    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn, index: number): void {
        if (dataChangedEvent.OldValue == null) { return; }
        let oldvalueNumber: Number = Number(dataChangedEvent.OldValue);
        let newValueNumber: Number = Number(dataChangedEvent.NewValue);
        let theBlotter = this.blotter as AdaptableBlotter;
        let key = dataChangedEvent.IdentifierValue + flashingColumn.ColumnName
        let currentFlash = this.currentFlashing.get(key)
        let timer = setTimeout(() => {
            this.currentFlashing.delete(key)
            theBlotter.refreshCells(dataChangedEvent.Record, [dataChangedEvent.ColumnId])
        }, flashingColumn.FlashingCellDuration.Duration)
        let isDown = oldvalueNumber > newValueNumber
        if (currentFlash) {
            clearTimeout(currentFlash.timer)
            currentFlash.timer = timer
            currentFlash.down = isDown
        }
        else {
            this.currentFlashing.set(key, { down: isDown, timer: timer })
        }
        //TODO : since upgrading to v11 it looks like events are dispatched async so we get this
        //after the cellclassrules eval.... I've put that as a workaround for now but that needs
        //proper fixing
        theBlotter.refreshCells(dataChangedEvent.Record, [dataChangedEvent.ColumnId])
    }

    protected InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;

            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            let theBlotter = this.blotter as AdaptableBlotter
            let flashings = this.currentFlashing

            columns.forEach(col => {
                let fc = this.FlashingCellState.FlashingColumns.find(x => x.ColumnName == col.ColumnId)
                let index = this.FlashingCellState.FlashingColumns.indexOf(fc)
                let cellClassRules: any = {};
                if (fc) {
                    cellClassRules["Ab-FlashUp" + index] = function (params: any) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node)
                        let key = primaryKey + col.ColumnId
                        let currentFlash = flashings.get(key)
                        if (currentFlash && !currentFlash.down) {
                            return true
                        }
                        return false
                    }
                    cellClassRules["Ab-FlashDown" + index] = function (params: any) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node)
                        let key = primaryKey + col.ColumnId
                        let currentFlash = flashings.get(key)
                        if (currentFlash && currentFlash.down) {
                            return true
                        }
                        return false
                    }
                }
                theBlotter.setCellClassRules(cellClassRules, col.ColumnId, "FlashingCell");
            })
        }
    }
}
