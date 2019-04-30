"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const ObjectFactory_1 = require("../Utilities/ObjectFactory");
const FlashingCellsRedux = require("../Redux/ActionsReducers/FlashingCellsRedux");
const Enums_1 = require("../Utilities/Enums");
class FlashingCellsStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.FlashingCellsStrategyId, blotter);
        if (this.shouldHandleDataSourceChanged()) {
            this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText));
        }
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.FlashingCellsStrategyName, ScreenPopups.FlashingCellsPopup, StrategyConstants.FlashingCellGlyph);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            if (column.DataType == Enums_1.DataType.Number) {
                if (this.blotter.api.calculatedColumnApi.getAllCalculatedColumn().find(c => c.ColumnId == column.ColumnId) == null) {
                    let flashingCell = this.FlashingCellState.FlashingCells.find(x => x.ColumnId == column.ColumnId);
                    if (flashingCell && flashingCell.IsLive) {
                        this.createContextMenuItemReduxAction("Turn Flashing Cell Off", StrategyConstants.FlashingCellGlyph, FlashingCellsRedux.FlashingCellSelect(flashingCell));
                    }
                    else {
                        if (!flashingCell) {
                            flashingCell = ObjectFactory_1.ObjectFactory.CreateDefaultFlashingCell(column, this.FlashingCellState.DefaultUpColor, this.FlashingCellState.DefautDownColor, this.FlashingCellState.DefaultDuration);
                        }
                        this.createContextMenuItemReduxAction("Turn Flashing Cell On", StrategyConstants.FlashingCellGlyph, FlashingCellsRedux.FlashingCellSelect(flashingCell));
                    }
                }
            }
        }
    }
    InitState() {
        if (this.FlashingCellState != this.blotter.api.flashingCellApi.getFlashingCellState()) {
            this.FlashingCellState = this.blotter.api.flashingCellApi.getFlashingCellState();
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.FlashingCell, this.FlashingCellState);
            }
        }
    }
    handleDataSourceChanged(dataChangedInfo) {
        let flashingCell = this.FlashingCellState.FlashingCells.find(f => f.ColumnId == dataChangedInfo.ColumnId);
        if (flashingCell && flashingCell.IsLive) {
            this.FlashCell(dataChangedInfo, flashingCell);
        }
    }
}
exports.FlashingCellsStrategy = FlashingCellsStrategy;
