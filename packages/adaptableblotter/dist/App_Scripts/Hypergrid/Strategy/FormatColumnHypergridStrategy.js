"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormatColumnStrategy_1 = require("../../App_Scripts/Strategy/FormatColumnStrategy");
class FormatColumnHypergridStrategy extends FormatColumnStrategy_1.FormatColumnStrategy {
    constructor(blotterBypass) {
        super(blotterBypass);
        this.blotterBypass = blotterBypass;
    }
    InitStyles() {
        //JO: temp fix
        if (!this.blotterBypass) {
            this.blotterBypass = this.blotter;
        }
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        this.blotterBypass.removeAllCellStyleHypergrid('formatColumn');
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.FormatColumnState.FormatColumns.length > 0) {
            this.blotterBypass.forAllRecordsDo((row) => {
                this.FormatColumnState.FormatColumns.forEach(fc => {
                    this.blotterBypass.addCellStyleHypergrid(this.blotterBypass.getPrimaryKeyValueFromRecord(row), fc.ColumnId, { formatColumnStyle: fc.Style });
                    //          break
                });
            });
        }
        this.blotterBypass.ReindexAndRepaint();
    }
}
exports.FormatColumnHypergridStrategy = FormatColumnHypergridStrategy;
