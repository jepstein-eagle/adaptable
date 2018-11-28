import { FlashingCellsStrategy } from '../../App_Scripts/Strategy/FlashingCellsStrategy'
import { AdaptableBlotter } from '../AdaptableBlotter'
import { IFlashingCellsStrategy } from '../../App_Scripts/Strategy/Interface/IFlashingCellsStrategy'
import { IDataChangedEvent } from '../../App_Scripts/Core/Services/Interface/IAuditService'
import { DataType } from '../../App_Scripts/Core/Enums'
import * as StyleConstants from '../../App_Scripts/Core/Constants/StyleConstants'
import { IFlashingCell } from '../../App_Scripts/Core/Api/Interface/IAdaptableBlotterObjects';

export class FlashingCellsagGridStrategy extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
        this.currentFlashing = new Map()
    }
    private currentFlashing: Map<any, number>

    protected handleDataSourceChanged(DataChangedEvent: IDataChangedEvent) {
        // no implementation required

    }

    protected FlashCell(dataChangedEvent: IDataChangedEvent, flashingCell: IFlashingCell, index: number): void {
        // no implementation required
    }

    protected InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;

            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.filter(c=>c.DataType==DataType.Number);
            let theBlotter = this.blotter as AdaptableBlotter
            let currentFlashing = this.currentFlashing

            columns.forEach(col => {
                let fc = this.FlashingCellState.FlashingCells.find(x => x.ColumnId == col.ColumnId && x.IsLive)
                let index = this.FlashingCellState.FlashingCells.indexOf(fc)
                let cellClassRules: any = {};
                if (fc) {
                    cellClassRules[StyleConstants.FLASH_UP_STYLE + index] = function (params: any) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node)
                        let auditLogValue = theBlotter.AuditService.getExistingDataValue({ ColumnId: col.ColumnId, IdentifierValue: primaryKey, NewValue: params.value })
                        if (auditLogValue && params.value > auditLogValue) {
                            let key = primaryKey + col.ColumnId
                            let currentFlashTimer = currentFlashing.get(key)
                            if (currentFlashTimer) {
                                clearTimeout(currentFlashTimer)
                            }
                            let timer = window.setTimeout(() => {
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
                        if (auditLogValue && params.value < auditLogValue) {
                            let key = primaryKey + col.ColumnId
                            let currentFlashTimer = currentFlashing.get(key)
                            if (currentFlashTimer) {
                                clearTimeout(currentFlashTimer)
                            }
                            let timer = window.setTimeout(() => {
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
