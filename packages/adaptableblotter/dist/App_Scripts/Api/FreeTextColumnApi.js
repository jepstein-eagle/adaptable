"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FreeTextColumnRedux = require("../Redux/ActionsReducers/FreeTextColumnRedux");
const ApiBase_1 = require("./ApiBase");
const ObjectFactory_1 = require("../Utilities/ObjectFactory");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
class FreeTextColumnApi extends ApiBase_1.ApiBase {
    getFreeTextColumnState() {
        return this.getBlotterState().FreeTextColumn;
    }
    getAllFreeTextColumn() {
        return this.getBlotterState().FreeTextColumn.FreeTextColumns;
    }
    addFreeTextColumn(freeTextColumn) {
        this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAdd(freeTextColumn));
    }
    addEditFreeTextColumnStoredValue(freeTextColumn, storedValue) {
        this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAddEditStoredValue(freeTextColumn, storedValue));
    }
    createFreeTextColumn(columnId, defaultValue = null) {
        let freeTextColumn = ObjectFactory_1.ObjectFactory.CreateEmptyFreeTextColumn();
        freeTextColumn.ColumnId = columnId;
        freeTextColumn.DefaultValue = defaultValue;
        this.addFreeTextColumn(freeTextColumn);
    }
    deleteFreeTextColumn(columnId) {
        let freeTextColumn = this.getAllFreeTextColumn().find(ftc => ftc.ColumnId == columnId);
        if (this.checkItemExists(freeTextColumn, columnId, StrategyConstants.FreeTextColumnStrategyId)) {
            this.dispatchAction(FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn));
        }
    }
}
exports.FreeTextColumnApi = FreeTextColumnApi;
