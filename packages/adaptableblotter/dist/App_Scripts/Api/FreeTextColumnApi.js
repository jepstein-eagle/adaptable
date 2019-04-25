"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FreeTextColumnRedux = require("../Redux/ActionsReducers/FreeTextColumnRedux");
const ApiBase_1 = require("./ApiBase");
const ObjectFactory_1 = require("../Utilities/ObjectFactory");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
class FreeTextColumnApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().FreeTextColumn;
    }
    GetAll() {
        return this.getBlotterState().FreeTextColumn.FreeTextColumns;
    }
    Add(freeTextColumn) {
        this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAdd(freeTextColumn));
    }
    Create(columnId, defaultValue = null) {
        let freeTextColumn = ObjectFactory_1.ObjectFactory.CreateEmptyFreeTextColumn();
        freeTextColumn.ColumnId = columnId;
        freeTextColumn.DefaultValue = defaultValue;
        this.Add(freeTextColumn);
    }
    Delete(columnId) {
        let freeTextColumn = this.GetAll().find(ftc => ftc.ColumnId == columnId);
        if (this.checkItemExists(freeTextColumn, columnId, StrategyConstants.FreeTextColumnStrategyId)) {
            this.dispatchAction(FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn));
        }
    }
}
exports.FreeTextColumnApi = FreeTextColumnApi;
