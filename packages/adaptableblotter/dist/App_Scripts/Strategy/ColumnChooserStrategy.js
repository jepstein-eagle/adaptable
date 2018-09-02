"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const GridRedux = require("../Redux/ActionsReducers/GridRedux");
class ColumnChooserStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.ColumnChooserStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ColumnChooserStrategyName, ScreenPopups.ColumnChooserPopup, StrategyGlyphs.ColumnChooserGlyph);
    }
    addContextMenuItem(columnId) {
        if (!this.isReadOnlyStrategy()) {
            this.createContextMenuItemReduxAction("Hide Column", StrategyGlyphs.ColumnChooserGlyph, GridRedux.GridHideColumn(columnId));
        }
    }
}
exports.ColumnChooserStrategy = ColumnChooserStrategy;
