"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FlashingCellsStrategy_1 = require("../../App_Scripts/Strategy/FlashingCellsStrategy");
const Enums_1 = require("../../App_Scripts/Utilities/Enums");
const StyleConstants = require("../../App_Scripts/Core/Constants/StyleConstants");
class FlashingCellsagGridStrategy extends FlashingCellsStrategy_1.FlashingCellsStrategy {
    constructor(blotter) {
        super(blotter);
        this.currentFlashing = new Map();
    }
    handleDataSourceChanged(DataChangedEvent) {
        // no implementation required
    }
    FlashCell(dataChangedEvent, flashingCell, index) {
        // no implementation required
    }
    InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;
            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.filter(c => c.DataType == Enums_1.DataType.Number);
            let theBlotter = this.blotter;
            let currentFlashing = this.currentFlashing;
            columns.forEach(col => {
                let fc = this.FlashingCellState.FlashingCells.find(x => x.ColumnId == col.ColumnId && x.IsLive);
                let index = this.FlashingCellState.FlashingCells.indexOf(fc);
                let cellClassRules = {};
                if (fc) {
                    cellClassRules[StyleConstants.FLASH_UP_STYLE + index] = function (params) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node);
                        let auditLogValue = theBlotter.AuditService.getExistingDataValue({ ColumnId: col.ColumnId, IdentifierValue: primaryKey, NewValue: params.value });
                        if (auditLogValue && params.value > auditLogValue) {
                            let key = primaryKey + col.ColumnId;
                            let currentFlashTimer = currentFlashing.get(key);
                            if (currentFlashTimer) {
                                clearTimeout(currentFlashTimer);
                            }
                            let timer = window.setTimeout(() => {
                                theBlotter.refreshCells(params.node, [col.ColumnId]);
                            }, fc.FlashingCellDuration);
                            currentFlashing.set(key, timer);
                            return true;
                        }
                        return false;
                    };
                    cellClassRules[StyleConstants.FLASH_DOWN_STYLE + index] = function (params) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node);
                        let auditLogValue = theBlotter.AuditService.getExistingDataValue({ ColumnId: col.ColumnId, IdentifierValue: primaryKey, NewValue: params.value });
                        if (auditLogValue && params.value < auditLogValue) {
                            let key = primaryKey + col.ColumnId;
                            let currentFlashTimer = currentFlashing.get(key);
                            if (currentFlashTimer) {
                                clearTimeout(currentFlashTimer);
                            }
                            let timer = window.setTimeout(() => {
                                theBlotter.refreshCells(params.node, [col.ColumnId]);
                            }, fc.FlashingCellDuration);
                            currentFlashing.set(key, timer);
                            return true;
                        }
                        return false;
                    };
                }
                theBlotter.setCellClassRules(cellClassRules, col.ColumnId, "FlashingCell");
            });
        }
    }
}
exports.FlashingCellsagGridStrategy = FlashingCellsagGridStrategy;
