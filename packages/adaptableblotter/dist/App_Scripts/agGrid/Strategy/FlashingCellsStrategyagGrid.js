"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FlashingCellsStrategy_1 = require("../../Strategy/FlashingCellsStrategy");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
class FlashingCellStrategyagGrid extends FlashingCellsStrategy_1.FlashingCellsStrategy {
    constructor(blotter) {
        super(blotter);
        this.currentFlashing = new Map();
    }
    FlashCell(dataChangedInfo, flashingCell) {
        // no implementation required
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
                        let oldValue = theBlotter.DataService.GetPreviousColumnValue(col.ColumnId, primaryKey, params.value);
                        if (params.value > oldValue) {
                            //  console.log("applying up for: " + col.ColumnId)
                            let key = primaryKey + col.ColumnId;
                            let currentFlashTimer = currentFlashing.get(key);
                            theBlotter.refreshCells(params.node, [col.ColumnId]);
                            if (currentFlashTimer) {
                                clearTimeout(currentFlashTimer);
                            }
                            let timer = setTimeout(() => {
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
                        let oldValue = theBlotter.DataService.GetPreviousColumnValue(col.ColumnId, primaryKey, params.value);
                        if (params.value < oldValue) {
                            //  console.log("applying down for: " + col.ColumnId)
                            let key = primaryKey + col.ColumnId;
                            let currentFlashTimer = currentFlashing.get(key);
                            if (currentFlashTimer) {
                                clearTimeout(currentFlashTimer);
                            }
                            let timer = setTimeout(() => {
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
