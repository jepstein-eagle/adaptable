import { FlashingCellsStrategy } from './FlashingCellsStrategy'
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter'
import { IFlashingCellsStrategy, IFlashingColumn } from '../Strategy/Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { DataType } from '../Core/Enums'
import * as StyleConstants from '../Core/Constants/StyleConstants'

export class FlashingCellsagGridStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
        this.currentFlashing = new Map()
    }
    private currentFlashing: Map<any, number>

    protected handleDataSourceChanged(DataChangedEvent: IDataChangedEvent) {
        // no implementation required

    }

    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingColumn: IFlashingColumn, index: number): void {
        // no implementation required
    }

    protected InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;

            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.filter(c=>c.DataType==DataType.Number);
            let theBlotter = this.blotter as AdaptableBlotter
            let currentFlashing = this.currentFlashing

            columns.forEach(col => {
                let fc = this.FlashingCellState.FlashingColumns.find(x => x.ColumnName == col.ColumnId && x.IsLive)
                let index = this.FlashingCellState.FlashingColumns.indexOf(fc)
                let cellClassRules: any = {};
                if (fc) {
                    cellClassRules[StyleConstants.FLASH_UP_STYLE + index] = function (params: any) {
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
                            }, fc.FlashingCellDuration)
                            currentFlashing.set(key, timer)
                            return true
                        }
                        return false
                    }
                    cellClassRules[StyleConstants.FLASH_DOWN_STYLE + index] = function (params: any) {
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
                            }, fc.FlashingCellDuration)
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
