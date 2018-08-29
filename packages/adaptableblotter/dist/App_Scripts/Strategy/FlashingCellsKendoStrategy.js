"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FlashingCellsStrategy_1 = require("./FlashingCellsStrategy");
const StyleConstants = require("../Core/Constants/StyleConstants");
class FlashingCellsKendoStrategy extends FlashingCellsStrategy_1.FlashingCellsStrategy {
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
        var cellStyle = (oldvalueNumber > newValueNumber) ? StyleConstants.FLASH_DOWN_STYLE : StyleConstants.FLASH_UP_STYLE;
        let columnIndex = this.blotter.getColumnIndex(dataChangedEvent.ColumnId);
        //Jo : we know that this function is wrong as it's not cumulative
        theBlotter.addCellStyle(dataChangedEvent.IdentifierValue, columnIndex, cellStyle + index, flashingCell.FlashingCellDuration);
    }
}
exports.FlashingCellsKendoStrategy = FlashingCellsKendoStrategy;
