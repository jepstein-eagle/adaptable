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
        let currentFlash = this.currentFlashing.get(dataChangedEvent.IdentifierValue)
        let timer = setTimeout(() => {
            this.currentFlashing.delete(dataChangedEvent.IdentifierValue)
            theBlotter.refreshCells(dataChangedEvent.Record, [dataChangedEvent.ColumnId])
        }, flashingColumn.FlashingCellDuration.Duration)
        let isDown = oldvalueNumber > newValueNumber
        if (currentFlash) {
            clearTimeout(currentFlash.timer)
            currentFlash.timer = timer
            currentFlash.down = isDown
        }
        else {
            this.currentFlashing.set(dataChangedEvent.IdentifierValue, { down: isDown, timer: timer })
        }
    }

    protected InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;

            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            let theBlotter = this.blotter as AdaptableBlotter
            let flashings = this.currentFlashing
            // adding this check as things can get mixed up during 'clean user data'
            if (columns.length > 0 && this.FlashingCellState.FlashingColumns.length > 0) {
                this.FlashingCellState.FlashingColumns.forEach((fc, index) => {
                    let cellClassRules: any = {};
                    cellClassRules["Ab-FlashUp" + index] = function (params: any) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node)
                        let currentFlash = flashings.get(theBlotter.getPrimaryKeyValueFromRecord(params.node))
                        if (currentFlash && !currentFlash.down) {
                            return true
                        }
                        return false
                    }
                    cellClassRules["Ab-FlashDown" + index] = function (params: any) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node)
                        let currentFlash = flashings.get(theBlotter.getPrimaryKeyValueFromRecord(params.node))
                        if (currentFlash && currentFlash.down) {
                            return true
                        }
                        return false
                    }
                    theBlotter.setCellClassRules(cellClassRules, fc.ColumnName, "FlashingCell");
                })
            }

        }
    }
}
