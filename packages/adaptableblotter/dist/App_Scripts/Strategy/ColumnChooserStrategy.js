"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const GridRedux = require("../Redux/ActionsReducers/GridRedux");
class ColumnChooserStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ColumnChooserStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ColumnChooserStrategyName, ScreenPopups.ColumnChooserPopup, StrategyConstants.ColumnChooserGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            this.createContextMenuItemReduxAction("Hide Column", StrategyConstants.ColumnChooserGlyph, GridRedux.GridHideColumn(columnId));
        }
    }
}
exports.ColumnChooserStrategy = ColumnChooserStrategy;
