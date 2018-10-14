"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeText_COLUMN_ADD = 'FreeText_COLUMN_ADD';
exports.FreeText_COLUMN_EDIT = 'FreeText_COLUMN_EDIT';
exports.FreeText_COLUMN_DELETE = 'FreeText_COLUMN_DELETE';
exports.FreeTextColumnAdd = (FreeTextColumn) => ({
    type: exports.FreeText_COLUMN_ADD,
    FreeTextColumn
});
exports.FreeTextColumnEdit = (Index, FreeTextColumn) => ({
    type: exports.FreeText_COLUMN_EDIT,
    Index,
    FreeTextColumn
});
exports.FreeTextColumnDelete = (FreeTextColumn) => ({
    type: exports.FreeText_COLUMN_DELETE,
    FreeTextColumn
});
const initialFreeTextColumnState = {
    FreeTextColumns: []
};
exports.FreeTextColumnReducer = (state = initialFreeTextColumnState, action) => {
    let freeTextColumns;
    switch (action.type) {
        case exports.FreeText_COLUMN_ADD:
            freeTextColumns = [].concat(state.FreeTextColumns);
            freeTextColumns.push(action.FreeTextColumn);
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        case exports.FreeText_COLUMN_EDIT: {
            freeTextColumns = [].concat(state.FreeTextColumns);
            let index = action.Index;
            freeTextColumns[index] = action.FreeTextColumn;
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        }
        case exports.FreeText_COLUMN_DELETE:
            freeTextColumns = [].concat(state.FreeTextColumns);
            let index = freeTextColumns.findIndex(x => x.ColumnId == action.FreeTextColumn.ColumnId);
            freeTextColumns.splice(index, 1);
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        default:
            return state;
    }
};
