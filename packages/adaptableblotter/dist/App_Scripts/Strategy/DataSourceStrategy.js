"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class DataSourceStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstantsDataSourceStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstantsDataSourceStrategyName, ScreenPopups.DataSourcePopup, StrategyConstantsDataSourceGlyph);
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
