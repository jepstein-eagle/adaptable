"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
class ConditionalStyleStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ConditionalStyleStrategyId, blotter);
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText));
        this.blotter.onGridDataBound().Subscribe((sender, blotter) => this.handleGridDataBound(blotter));
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ConditionalStyleStrategyName, ScreenPopups.ConditionalStylePopup, StrategyConstants.ConditionalStyleGlyph);
    }
    InitState() {
        if (this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle) {
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle;
            this.InitStyles();
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.ConditionalStyle, this.ConditionalStyleState);
            }
        }
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            this.createContextMenuItemShowPopup("Create " + StrategyConstants.ConditionalStyleStrategyName, ScreenPopups.ConditionalStylePopup, StrategyConstants.ConditionalStyleGlyph, "New|" + column.ColumnId);
        }
    }
    // Called when we have re-bound the grid e.g. after sorting a column or even after a smart edit or plus / minus :(
    handleGridDataBound(blotter) {
        if (this.ConditionalStyleState != null && this.ConditionalStyleState.ConditionalStyles.length > 0) {
            this.InitStyles();
        }
    }
}
exports.ConditionalStyleStrategy = ConditionalStyleStrategy;
