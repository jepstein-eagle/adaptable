"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormatColumnStrategy_1 = require("./FormatColumnStrategy");
const StringExtensions_1 = require("../Core/Extensions/StringExtensions");
const StyleHelper_1 = require("../Core/Helpers/StyleHelper");
const StrategyIds = require("../Core/Constants/StrategyIds");
class FormatColumnKendoStrategy extends FormatColumnStrategy_1.FormatColumnStrategy {
    constructor(blotter) {
        super(blotter);
    }
    InitStyles() {
        let theBlotter = this.blotter;
        let columns = theBlotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.FormatColumnState.FormatColumns.length > 0) {
            this.FormatColumnState.FormatColumns.forEach((fc) => {
                let columnIndex = columns.findIndex(c => c.ColumnId == fc.ColumnId);
                if (columnIndex > 0) {
                    theBlotter.forAllRecordsDo((row) => {
                        let primaryKey = this.blotter.getPrimaryKeyValueFromRecord(row);
                        let styleName = (StringExtensions_1.StringExtensions.IsNullOrEmpty(fc.Style.ClassName)) ?
                            StyleHelper_1.StyleHelper.CreateIndexedStyleName(StrategyIds.FormatColumnStrategyId, this.FormatColumnState.FormatColumns.indexOf(fc), this.blotter) :
                            fc.Style.ClassName;
                        theBlotter.addCellStyle(primaryKey, columnIndex, styleName);
                    });
                }
            });
        }
    }
}
exports.FormatColumnKendoStrategy = FormatColumnKendoStrategy;
