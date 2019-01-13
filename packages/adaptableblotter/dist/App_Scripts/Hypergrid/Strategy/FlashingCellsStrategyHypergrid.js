"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FlashingCellsStrategy_1 = require("../../Strategy/FlashingCellsStrategy");
class FlashingCellsStrategyHypergrid extends FlashingCellsStrategy_1.FlashingCellsStrategy {
    constructor(blotter) {
        super(blotter);
    }
    FlashCell(dataChangedInfo, flashingCell) {
        let theBlotter = this.blotter;
        if (dataChangedInfo.OldValue == null) { // currently always
            dataChangedInfo.OldValue = this.blotter.DataService.GetPreviousColumnValue(dataChangedInfo.ColumnId, dataChangedInfo.IdentifierValue, dataChangedInfo.NewValue);
        }
        if (dataChangedInfo.OldValue != dataChangedInfo.NewValue) {
            var oldvalueNumber = Number(dataChangedInfo.OldValue);
            var newValueNumber = Number(dataChangedInfo.NewValue);
            var cellStyle = (oldvalueNumber > newValueNumber) ? flashingCell.DownColor : flashingCell.UpColor;
            theBlotter.addCellStyleHypergrid(dataChangedInfo.IdentifierValue, dataChangedInfo.ColumnId, { flashBackColor: cellStyle }, flashingCell.FlashingCellDuration);
        }
    }
}
exports.FlashingCellsStrategyHypergrid = FlashingCellsStrategyHypergrid;
