"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnFilterRedux = require("../Redux/ActionsReducers/ColumnFilterRedux");
const ApiBase_1 = require("./ApiBase");
const ObjectFactory_1 = require("../Utilities/ObjectFactory");
class ColumnFilterApi extends ApiBase_1.ApiBase {
    getColumnFilterState() {
        return this.getBlotterState().ColumnFilter;
    }
    setColumnFilter(columnFilters) {
        columnFilters.forEach(cf => {
            this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(cf));
        });
    }
    setColumnFilterFromUserFilter(userFilter) {
        let existingUserFilter = this.getBlotterState().UserFilter.UserFilters.find(uf => uf.Name == userFilter);
        if (this.checkItemExists(existingUserFilter, userFilter, "User Filter")) {
            let columnFilter = ObjectFactory_1.ObjectFactory.CreateColumnFilterFromUserFilter(existingUserFilter);
            this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(columnFilter));
        }
    }
    clearColumnFilter(columnFilter) {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(columnFilter.ColumnId));
    }
    clearColumnFilterByColumns(columns) {
        columns.forEach(c => {
            this.clearColumnFilterByColumn(c);
        });
    }
    clearColumnFilterByColumn(column) {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(column));
    }
    clearAllColumnFilter() {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClearAll());
    }
    getAllColumnFilter() {
        return this.getBlotterState().ColumnFilter.ColumnFilters;
    }
}
exports.ColumnFilterApi = ColumnFilterApi;
