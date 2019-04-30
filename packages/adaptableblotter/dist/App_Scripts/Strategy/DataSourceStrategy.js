"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
class DataSourceStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.DataSourceStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.DataSourceStrategyName, ScreenPopups.DataSourcePopup, StrategyConstants.DataSourceGlyph);
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
        return this.blotter.api.dataSourceApi.getDataSourceState();
    }
}
exports.DataSourceStrategy = DataSourceStrategy;
