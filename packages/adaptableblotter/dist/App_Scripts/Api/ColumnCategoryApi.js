"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnCategoryRedux = require("../Redux/ActionsReducers/ColumnCategoryRedux");
const ApiBase_1 = require("./ApiBase");
class ColumnCategoryApi extends ApiBase_1.ApiBase {
    getColumnCategoryState() {
        return this.getBlotterState().ColumnCategory;
    }
    getAllColumnCategory() {
        return this.getColumnCategoryState().ColumnCategories;
    }
    getColumnCategoryById(columnCategoryId) {
        return this.getAllColumnCategory().find(cc => cc.ColumnCategoryId == columnCategoryId);
    }
    addColumnCategory(columnCategory) {
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryAdd(columnCategory));
    }
    createColumnCategory(columnCategoryId, columns) {
        let columnCategory = {
            ColumnCategoryId: columnCategoryId,
            ColumnIds: columns
        };
        this.addColumnCategory(columnCategory);
    }
    editColumnCategory(previousColumnCategoryId, columnCategory) {
        let index = this.getAllColumnCategory().findIndex(cc => cc.ColumnCategoryId == previousColumnCategoryId);
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory));
    }
    addColumnsToColumnCategory(columnCategoryId, columns) {
        let columnCategory = this.getColumnCategoryById(columnCategoryId);
        let index = this.getAllColumnCategory().findIndex(cc => cc.ColumnCategoryId == columnCategoryId);
        columns.forEach(c => {
            columnCategory.ColumnIds.push(c);
        });
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory));
    }
    removeColumnsFromColumnCategory(columnCategoryId, columns) {
        let columnCategory = this.getAllColumnCategory().find(cc => cc.ColumnCategoryId == columnCategoryId);
        let index = this.getAllColumnCategory().findIndex(cc => cc.ColumnCategoryId == columnCategoryId);
        columns.forEach(c => {
            let ccIndex = columnCategory.ColumnIds.findIndex(cc => cc == c);
            columnCategory.ColumnIds.splice(ccIndex, 1);
        });
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory));
    }
    deleteColumnCategory(columnCategoryId) {
        let columnCategory = this.getAllColumnCategory().find(cc => cc.ColumnCategoryId == columnCategoryId);
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryDelete(columnCategory));
    }
}
exports.ColumnCategoryApi = ColumnCategoryApi;
