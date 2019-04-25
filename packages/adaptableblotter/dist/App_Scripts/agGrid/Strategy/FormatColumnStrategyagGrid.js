"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormatColumnStrategy_1 = require("../../Strategy/FormatColumnStrategy");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const StyleHelper_1 = require("../../Utilities/Helpers/StyleHelper");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
class FormatColumnStrategyagGrid extends FormatColumnStrategy_1.FormatColumnStrategy {
    constructor(blotterBypass) {
        super(blotterBypass);
        this.blotterBypass = blotterBypass;
    }
    InitStyles() {
        let columns = this.blotter.adaptableBlotterStore.TheStore.getState().Grid.Columns;
        let theBlotter = this.blotter;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.FormatColumnState.FormatColumns.length > 0) {
            for (let column of columns) {
                let cellClassRules = {};
                this.FormatColumnState.FormatColumns.forEach((fc, index) => {
                    if (fc.ColumnId == column.ColumnId) {
                        let styleName = (StringExtensions_1.StringExtensions.IsNullOrEmpty(fc.Style.ClassName)) ?
                            StyleHelper_1.StyleHelper.CreateIndexedStyleName(StrategyConstants.FormatColumnStrategyId, index, this.blotter) :
                            fc.Style.ClassName;
                        cellClassRules[styleName] = function (params) {
                            return true;
                        };
                    }
                });
                theBlotter.setCellClassRules(cellClassRules, column.ColumnId, "FormatColumn");
            }
        }
        this.blotter.redraw();
    }
}
exports.FormatColumnStrategyagGrid = FormatColumnStrategyagGrid;
