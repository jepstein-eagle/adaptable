"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FlashingCellsStrategy_1 = require("../../Strategy/FlashingCellsStrategy");
class FlashingCellsStrategyHypergrid extends FlashingCellsStrategy_1.FlashingCellsStrategy {
    constructor(blotter) {
        super(blotter);
    }
    FlashCell(dataChangedEvent, flashingCell, index) {
        let theBlotter = this.blotter;
        if (dataChangedEvent.OldValue == null) {
            return;
        }
        var oldvalueNumber = Number(dataChangedEvent.OldValue);
        var newValueNumber = Number(dataChangedEvent.NewValue);
        var cellStyle = (oldvalueNumber > newValueNumber) ? flashingCell.DownColor : flashingCell.UpColor;
        theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, dataChangedEvent.ColumnId, { flashBackColor: cellStyle }, flashingCell.FlashingCellDuration);
    }
}
exports.FlashingCellsStrategyHypergrid = FlashingCellsStrategyHypergrid;
