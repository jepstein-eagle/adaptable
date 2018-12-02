"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLUMN_CATEGORY_ADD = 'COLUMN_CATEGORY_ADD';
exports.COLUMN_CATEGORY_EDIT = 'COLUMN_CATEGORY_EDIT';
exports.COLUMN_CATEGORY_DELETE = 'COLUMN_CATEGORY_DELETE';
exports.ColumnCategoryAdd = (ColumnCategory) => ({
    type: exports.COLUMN_CATEGORY_ADD,
    ColumnCategory
});
exports.ColumnCategoryEdit = (Index, ColumnCategory) => ({
    type: exports.COLUMN_CATEGORY_EDIT,
    Index,
    ColumnCategory
});
exports.ColumnCategoryDelete = (ColumnCategory) => ({
    type: exports.COLUMN_CATEGORY_DELETE,
    ColumnCategory
});
const initialColumnCategoryState = {
    ColumnCategories: []
};
exports.ColumnCategoryReducer = (state = initialColumnCategoryState, action) => {
    let columnCategories;
    switch (action.type) {
        case exports.COLUMN_CATEGORY_ADD:
            columnCategories = [].concat(state.ColumnCategories);
            columnCategories.push(action.ColumnCategory);
            return Object.assign({}, state, { ColumnCategories: columnCategories });
        case exports.COLUMN_CATEGORY_EDIT: {
            columnCategories = [].concat(state.ColumnCategories);
            let index = action.Index;
            columnCategories[index] = action.ColumnCategory;
            return Object.assign({}, state, { ColumnCategories: columnCategories });
        }
        case exports.COLUMN_CATEGORY_DELETE: {
            columnCategories = [].concat(state.ColumnCategories);
            let index = columnCategories.findIndex(x => x.ColumnCategoryId == action.ColumnCategory.ColumnCategoryId);
            columnCategories.splice(index, 1);
            return Object.assign({}, state, { ColumnCategories: columnCategories });
        }
        default:
            return state;
    }
};
