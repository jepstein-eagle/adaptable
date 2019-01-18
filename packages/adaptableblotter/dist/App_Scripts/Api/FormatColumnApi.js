"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormatColumnRedux = require("../Redux/ActionsReducers/FormatColumnRedux");
const ApiBase_1 = require("./ApiBase");
class FormatColumnApi extends ApiBase_1.ApiBase {
    // Format Column api methods
    GetAll() {
        return this.getState().FormatColumn.FormatColumns;
    }
    Add(column, style) {
        let formatColumn = { ColumnId: column, Style: style };
        this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn));
    }
    Update(column, style) {
        let formatColumn = { ColumnId: column, Style: style };
        this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn));
    }
    Delete(formatColumn) {
        this.dispatchAction(FormatColumnRedux.FormatColumnDelete(formatColumn));
    }
    DeleteAll() {
        this.GetAll().forEach(fc => {
            this.Delete(fc);
        });
    }
}
exports.FormatColumnApi = FormatColumnApi;
