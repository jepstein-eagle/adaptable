"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const GridRedux = require("../Redux/ActionsReducers/GridRedux");
class SelectColumnStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.SelectColumnStrategyId, blotter);
    }
    addContextMenuItem(columnId) {
        if (this.blotter.isSelectable()) {
            this.createContextMenuItemReduxAction(StrategyNames.SelectColumnStrategyName, StrategyGlyphs.SelectColumnGlyph, GridRedux.GridSelectColumn(columnId));
        }
    }
}
exports.SelectColumnStrategy = SelectColumnStrategy;
