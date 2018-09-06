"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ArrayExtensions_1 = require("../Core/Extensions/ArrayExtensions");
class AboutStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.AboutStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.AboutStrategyName, ScreenPopups.AboutPopup, StrategyIds.AboutGlyph);
    }
    CreateAboutInfo() {
        let options = this.blotter.BlotterOptions;
        let output = [];
        output.push({ Key: "Vendor Grid", Value: this.blotter.VendorGridName });
        output.push({ Key: "Adaptable Blotter Version", Value: "2.4" });
        if (options.blotterId != undefined) {
            output.push({ Key: "Blotter Id", Value: options.blotterId });
        }
        if (options.userName != undefined) {
            output.push({ Key: "User", Value: options.userName });
        }
        if (options.enableAuditLog != undefined) {
            output.push({ Key: "Audit Log", Value: (options.enableAuditLog) ? "On" : "Off" });
        }
        if (options.enableRemoteConfigServer != undefined) {
            output.push({ Key: "Remote Configuration", Value: (options.enableRemoteConfigServer) ? "On" : "Off" });
        }
        if (options.serverSearchOption != undefined) {
            output.push({ Key: "Server Search Option", Value: options.serverSearchOption });
        }
        output.push({ Key: "All Rows", Value: this.blotter.getRowCount() });
        output.push({ Key: "Visible Rows", Value: this.blotter.getVisibleRowCount() });
        output.push({ Key: "All Columns", Value: this.blotter.getColumnCount() });
        output.push({ Key: "Visible Columns", Value: this.blotter.getVisibleColumnCount() });
        output.push({ Key: "Can Sort", Value: this.blotter.isSortable() ? "True" : "False" });
        output.push({ Key: "Can Multi Select", Value: this.blotter.isSelectable() ? "True" : "False" });
        let calcColumns = this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns.map(c => c.ColumnId);
        output.push({ Key: "Calculated Columns", Value: ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(calcColumns) ? calcColumns : "None" });
        return output;
    }
}
exports.AboutStrategy = AboutStrategy;
