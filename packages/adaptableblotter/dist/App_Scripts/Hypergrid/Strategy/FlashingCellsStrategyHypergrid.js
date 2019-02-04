"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FlashingCellsStrategy_1 = require("../../Strategy/FlashingCellsStrategy");
const IDataService_1 = require("../../Utilities/Services/Interface/IDataService");
class FlashingCellsStrategyHypergrid extends FlashingCellsStrategy_1.FlashingCellsStrategy {
    constructor(blotter) {
        super(blotter);
    }
    shouldHandleDataSourceChanged() {
        return true;
    }
    FlashCell(dataChangedInfo, flashingCell) {
        let theBlotter = this.blotter;
        if (dataChangedInfo.OldValue == null) { // currently should never happen
            dataChangedInfo.OldValue = this.blotter.DataService.GetPreviousColumnValue(dataChangedInfo.ColumnId, dataChangedInfo.IdentifierValue, dataChangedInfo.NewValue, IDataService_1.ChangeDirection.Ignore);
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
