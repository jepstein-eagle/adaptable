"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FlashingCellsStrategy_1 = require("../../Strategy/FlashingCellsStrategy");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const IDataService_1 = require("../../Utilities/Services/Interface/IDataService");
class FlashingCellStrategyagGrid extends FlashingCellsStrategy_1.FlashingCellsStrategy {
    constructor(blotter) {
        super(blotter);
        this.currentFlashing = new Map();
    }
    shouldHandleDataSourceChanged() {
        return false;
    }
    FlashCell(dataChangedInfo, flashingCell) {
        // dont handle 
    }
    InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;
            let numericColumns = ColumnHelper_1.ColumnHelper.getNumericColumns(this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
            let theBlotter = this.blotter;
            let currentFlashing = this.currentFlashing;
            numericColumns.forEach(col => {
                let fc = this.FlashingCellState.FlashingCells.find(x => x.ColumnId == col.ColumnId && x.IsLive);
                let index = this.FlashingCellState.FlashingCells.indexOf(fc);
                let cellClassRules = {};
                if (fc) {
                    cellClassRules[StyleConstants.FLASH_UP_STYLE + index] = function (params) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node);
                        let rowNode = params.node;
                        let test = theBlotter.BlotterOptions.vendorGrid;
                        let key = primaryKey + col.ColumnId + "up";
                        let currentFlashTimer = currentFlashing.get(key);
                        if (currentFlashTimer) {
                            return true;
                        }
                        let oldValue = theBlotter.DataService.GetPreviousColumnValue(col.ColumnId, primaryKey, params.value, IDataService_1.ChangeDirection.Up);
                        if (oldValue && params.value > oldValue) {
                            if (currentFlashTimer) {
                                window.clearTimeout(currentFlashTimer);
                            }
                            let timer = window.setTimeout(() => {
                                currentFlashing.set(key, null);
                                theBlotter.refreshCells(params.node, [col.ColumnId]);
                            }, fc.FlashingCellDuration);
                            currentFlashing.set(key, timer);
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                    cellClassRules[StyleConstants.FLASH_DOWN_STYLE + index] = function (params) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node);
                        let key = primaryKey + col.ColumnId + "down";
                        let currentFlashTimer = currentFlashing.get(key);
                        if (currentFlashTimer) {
                            return true;
                        }
                        let oldValue = theBlotter.DataService.GetPreviousColumnValue(col.ColumnId, primaryKey, params.value, IDataService_1.ChangeDirection.Down);
                        if (oldValue && params.value < oldValue) {
                            if (currentFlashTimer) {
                                window.clearTimeout(currentFlashTimer);
                            }
                            let timer = window.setTimeout(() => {
                                currentFlashing.set(key, null);
                                theBlotter.refreshCells(params.node, [col.ColumnId]);
                            }, fc.FlashingCellDuration);
                            currentFlashing.set(key, timer);
                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                }
                theBlotter.setCellClassRules(cellClassRules, col.ColumnId, "FlashingCell");
            });
        }
    }
}
exports.FlashingCellStrategyagGrid = FlashingCellStrategyagGrid;
