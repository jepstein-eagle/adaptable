"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormatColumnRedux = require("../Redux/ActionsReducers/FormatColumnRedux");
const ApiBase_1 = require("./ApiBase");
class FormatColumnApi extends ApiBase_1.ApiBase {
    getFormatColumnState() {
        return this.getBlotterState().FormatColumn;
    }
    getAllFormatColumn() {
        return this.getBlotterState().FormatColumn.FormatColumns;
    }
    addFormatColumn(column, style) {
        let formatColumn = { ColumnId: column, Style: style };
        this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn));
    }
    updateFormatColumn(column, style) {
        let formatColumn = { ColumnId: column, Style: style };
        this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn));
    }
    deleteFormatColumn(formatColumn) {
        this.dispatchAction(FormatColumnRedux.FormatColumnDelete(formatColumn));
    }
    deleteAllFormatColumn() {
        this.getAllFormatColumn().forEach(fc => {
            this.deleteFormatColumn(fc);
        });
    }
}
exports.FormatColumnApi = FormatColumnApi;
