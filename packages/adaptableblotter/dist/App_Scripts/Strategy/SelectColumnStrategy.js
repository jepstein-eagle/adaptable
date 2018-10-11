"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const GridRedux = require("../Redux/ActionsReducers/GridRedux");
class SelectColumnStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstantsSelectColumnStrategyId, blotter);
    }
    addContextMenuItem(columnId) {
        if (this.blotter.isSelectable()) {
            if (this.canCreateContextMenuItem(columnId, this.blotter)) {
                this.createContextMenuItemReduxAction(StrategyConstantsSelectColumnStrategyName, StrategyConstantsSelectColumnGlyph, GridRedux.GridSelectColumn(columnId));
            }
        }
    }
}
exports.SelectColumnStrategy = SelectColumnStrategy;
