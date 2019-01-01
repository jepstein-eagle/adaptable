"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomSortRedux = require("../Redux/ActionsReducers/CustomSortRedux");
const ApiBase_1 = require("./ApiBase");
class CustomSortApi extends ApiBase_1.ApiBase {
    // Custom Sort Methods
    GetAll() {
        return this.getState().CustomSort.CustomSorts;
    }
    GetByColumn(columnn) {
        return this.getState().CustomSort.CustomSorts.find(cs => cs.ColumnId == columnn);
    }
    Add(customSort) {
        this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort));
    }
    Create(column, values) {
        let customSort = { ColumnId: column, SortedValues: values };
        this.Add(customSort);
    }
    Edit(column, values) {
        let customSort = { ColumnId: column, SortedValues: values };
        this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort));
    }
    Delete(column) {
        let customSort = this.GetByColumn(column);
        this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort));
    }
}
exports.CustomSortApi = CustomSortApi;
