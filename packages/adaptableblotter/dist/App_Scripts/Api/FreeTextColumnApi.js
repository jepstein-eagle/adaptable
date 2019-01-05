"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FreeTextColumnRedux = require("../Redux/ActionsReducers/FreeTextColumnRedux");
const ApiBase_1 = require("./ApiBase");
class FreeTextColumnApi extends ApiBase_1.ApiBase {
    // Free Text Column api methods
    GetAll() {
        return this.getState().FreeTextColumn.FreeTextColumns;
    }
    Add(freeTextColumn) {
        this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAdd(freeTextColumn));
    }
    Create(columnId, defaultValue = null) {
        let freeTextColumn = {
            ColumnId: columnId,
            DefaultValue: defaultValue,
            FreeTextStoredValues: []
        };
        this.Add(freeTextColumn);
    }
    Delete(columnId) {
        let freeTextColumn = this.GetAll().find(ftc => ftc.ColumnId == columnId);
        this.dispatchAction(FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn));
    }
}
exports.FreeTextColumnApi = FreeTextColumnApi;
