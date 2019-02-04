"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnCategoryRedux = require("../Redux/ActionsReducers/ColumnCategoryRedux");
const ApiBase_1 = require("./ApiBase");
class ColumnCategoryApi extends ApiBase_1.ApiBase {
    GetAll() {
        return this.getState().ColumnCategory.ColumnCategories;
    }
    Add(columnCategory) {
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryAdd(columnCategory));
    }
    Create(columnCategoryId, columns) {
        let columnCategory = {
            ColumnCategoryId: columnCategoryId,
            ColumnIds: columns
        };
        this.Add(columnCategory);
    }
    Edit(previousColumnCategoryId, columnCategory) {
        let index = this.GetAll().findIndex(cc => cc.ColumnCategoryId == previousColumnCategoryId);
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory));
    }
    AddColumns(columnCategoryId, columns) {
        let columnCategory = this.GetAll().find(cc => cc.ColumnCategoryId == columnCategoryId);
        let index = this.GetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId);
        columns.forEach(c => {
            columnCategory.ColumnIds.push(c);
        });
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory));
    }
    RemoveColumns(columnCategoryId, columns) {
        let columnCategory = this.GetAll().find(cc => cc.ColumnCategoryId == columnCategoryId);
        let index = this.GetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId);
        columns.forEach(c => {
            let ccIndex = columnCategory.ColumnIds.findIndex(cc => cc == c);
            columnCategory.ColumnIds.splice(ccIndex, 1);
        });
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory));
    }
    Delete(columnCategoryId) {
        let columnCategory = this.GetAll().find(cc => cc.ColumnCategoryId == columnCategoryId);
        this.dispatchAction(ColumnCategoryRedux.ColumnCategoryDelete(columnCategory));
    }
}
exports.ColumnCategoryApi = ColumnCategoryApi;
