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
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText));
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.FlashingCellsStrategyName, ScreenPopups.FlashingCellsPopup, StrategyConstants.FlashingCellGlyph);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            if (column.DataType == Enums_1.DataType.Number) {
                if (this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns.find(c => c.ColumnId == column.ColumnId) == null) {
                    let flashingCell = this.FlashingCellState.FlashingCells.find(x => x.ColumnId == column.ColumnId);
                    if (flashingCell && flashingCell.IsLive) {
                        this.createContextMenuItemReduxAction("Turn Flashing Cell Off", StrategyConstants.FlashingCellGlyph, FlashingCellsRedux.FlashingCellSelect(flashingCell));
                    }
                    else {
                        if (!flashingCell) {
                            flashingCell = ObjectFactory_1.ObjectFactory.CreateDefaultFlashingCell(column);
                        }
                        this.createContextMenuItemReduxAction("Turn Flashing Cell On", StrategyConstants.FlashingCellGlyph, FlashingCellsRedux.FlashingCellSelect(flashingCell));
                    }
                }
            }
        }
    }
    InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.FlashingCell, this.FlashingCellState);
            }
        }
    }
    handleDataSourceChanged(DataChangedEvent) {
        let flashingCell = this.FlashingCellState.FlashingCells.find(f => f.ColumnId == DataChangedEvent.ColumnId);
        let flashingCellIndex = this.FlashingCellState.FlashingCells.indexOf(flashingCell);
        if (flashingCell != null && flashingCell.IsLive) {
            this.FlashCell(DataChangedEvent, flashingCell, flashingCellIndex);
        }
    }
}
exports.FlashingCellsStrategy = FlashingCellsStrategy;
