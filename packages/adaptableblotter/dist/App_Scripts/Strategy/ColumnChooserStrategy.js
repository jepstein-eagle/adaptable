"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const GridRedux = require("../Redux/ActionsReducers/GridRedux");
class ColumnChooserStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.ColumnChooserStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.ColumnChooserStrategyName, ScreenPopups.ColumnChooserPopup, StrategyIds.ColumnChooserGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            this.createContextMenuItemReduxAction("Hide Column", StrategyIds.ColumnChooserGlyph, GridRedux.GridHideColumn(columnId));
        }
    }
}
exports.ColumnChooserStrategy = ColumnChooserStrategy;
