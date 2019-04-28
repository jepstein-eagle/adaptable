"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
class PieChartStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.PieChartStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.PieChartStrategyName, ScreenPopups.PieChartPopup, StrategyConstants.PieChartGlyph);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            this.createContextMenuItemShowPopup('See as Pie Chart', ScreenPopups.PieChartPopup, StrategyConstants.PieChartGlyph, column.ColumnId);
        }
    }
    InitState() {
        if (this.PieChartState != this.blotter.adaptableBlotterStore.TheStore.getState().PieChart) {
            this.PieChartState = this.blotter.adaptableBlotterStore.TheStore.getState().PieChart;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.PieChart, this.PieChartState);
            }
        }
    }
}
exports.PieChartStrategy = PieChartStrategy;
