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
    private currentFlashing: Map<any, number>

    protected handleDataSourceChanged(DataChangedEvent: IDataChangedEvent) {

    }

    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn, index: number): void {
    }

    protected InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;

            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            let theBlotter = this.blotter as AdaptableBlotter
            let flashings = this.currentFlashing
            let currentFlashing = this.currentFlashing

            columns.forEach(col => {
                let fc = this.FlashingCellState.FlashingColumns.find(x => x.ColumnName == col.ColumnId && x.IsLive)
                let index = this.FlashingCellState.FlashingColumns.indexOf(fc)
                let cellClassRules: any = {};
                if (fc) {
                    cellClassRules[this.FLASH_UP_STYLE + index] = function (params: any) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node)
                        let auditLogValue = theBlotter.AuditService.getExistingDataValue({ ColumnId: col.ColumnId, IdentifierValue: primaryKey, NewValue: params.value })
                        if (params.value > auditLogValue) {
                            let key = primaryKey + col.ColumnId
                            let currentFlashTimer = currentFlashing.get(key)
                            if (currentFlashTimer) {
                                clearTimeout(currentFlashTimer)
                            }
                            let timer = setTimeout(() => {
                                theBlotter.refreshCells(params.node, [col.ColumnId])
                            }, fc.FlashingCellDuration.Duration)
                            currentFlashing.set(key, timer)
                            return true
                        }
                        return false
                    }
                    cellClassRules[this.FLASH_DOWN_STYLE + index] = function (params: any) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node)
                        let auditLogValue = theBlotter.AuditService.getExistingDataValue({ ColumnId: col.ColumnId, IdentifierValue: primaryKey, NewValue: params.value })
                        if (params.value < auditLogValue) {
                            let key = primaryKey + col.ColumnId
                            let currentFlashTimer = currentFlashing.get(key)
                            if (currentFlashTimer) {
                                clearTimeout(currentFlashTimer)
                            }
                            let timer = setTimeout(() => {
                                theBlotter.refreshCells(params.node, [col.ColumnId])
                            }, fc.FlashingCellDuration.Duration)
                            currentFlashing.set(key, timer)
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
