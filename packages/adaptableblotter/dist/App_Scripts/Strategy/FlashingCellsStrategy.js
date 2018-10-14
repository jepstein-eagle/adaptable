"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ObjectFactory_1 = require("../Core/ObjectFactory");
const Enums_1 = require("../Core/Enums");
const FlashingCellsRedux = require("../Redux/ActionsReducers/FlashingCellsRedux");
const ColumnHelper_1 = require("../Core/Helpers/ColumnHelper");
class FlashingCellsStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.FlashingCellsStrategyId, blotter);
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText));
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.FlashingCellsStrategyName, ScreenPopups.FlashingCellsPopup, StrategyConstants.FlashingCellGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(columnId, this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
            if (column.DataType == Enums_1.DataType.Number) {
                if (this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns.find(c => c.ColumnId == columnId) == null) {
                    let flashingCell = this.FlashingCellState.FlashingCells.find(x => x.ColumnId == columnId);
                    if (flashingCell && flashingCell.IsLive) {
                        this.createContextMenuItemReduxAction("Turn Flashing Cell Off", StrategyConstants.FlashingCellGlyph, FlashingCellsRedux.FlashingCellSelect(flashingCell));
                    }
                    else {
                        if (!flashingCell) {
                            let column = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(x => x.ColumnId == columnId);
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
