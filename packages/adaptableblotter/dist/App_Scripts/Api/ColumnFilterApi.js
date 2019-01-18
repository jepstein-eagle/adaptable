"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnFilterRedux = require("../Redux/ActionsReducers/ColumnFilterRedux");
const ApiBase_1 = require("./ApiBase");
const ObjectFactory_1 = require("../Utilities/ObjectFactory");
class ColumnFilterApi extends ApiBase_1.ApiBase {
    Set(columnFilters) {
        columnFilters.forEach(cf => {
            this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(cf));
        });
    }
    SetFromUserFilter(userFilter) {
        let existingUserFilter = this.getState().UserFilter.UserFilters.find(uf => uf.Name == userFilter);
        if (this.checkItemExists(existingUserFilter, userFilter, "User Filter")) {
            let columnFilter = ObjectFactory_1.ObjectFactory.CreateColumnFilterFromUserFilter(existingUserFilter);
            this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(columnFilter));
        }
    }
    Clear(columnFilter) {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(columnFilter.ColumnId));
    }
    ClearByColumns(columns) {
        columns.forEach(c => {
            this.ClearByColumn(c);
        });
    }
    ClearByColumn(column) {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(column));
    }
    ClearAll() {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClearAll());
    }
    GetCurrent() {
        return this.getState().ColumnFilter.ColumnFilters;
    }
}
exports.ColumnFilterApi = ColumnFilterApi;
