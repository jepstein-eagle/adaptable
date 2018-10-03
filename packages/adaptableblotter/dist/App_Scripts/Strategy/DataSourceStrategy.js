"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class DataSourceStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.DataSourceStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.DataSourceStrategyName, ScreenPopups.DataSourcePopup, StrategyIds.DataSourceGlyph);
    }
    InitState() {
        if (this.DataSourceState != this.GetDataSourceState()) {
            this.DataSourceState = this.GetDataSourceState();
            this.publishSearchChanged(Enums_1.SearchChangedTrigger.DataSource);
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.DataSource, this.DataSourceState);
            }
        }
    }
    GetDataSourceState() {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().DataSource;
    }
}
exports.DataSourceStrategy = DataSourceStrategy;
