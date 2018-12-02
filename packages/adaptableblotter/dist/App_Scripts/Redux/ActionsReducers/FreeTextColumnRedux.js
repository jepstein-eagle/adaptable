"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FREE_TEXT_COLUMN_ADD = 'FREE_TEXT_COLUMN_ADD';
exports.FREE_TEXT_COLUMN_EDIT = 'FREE_TEXT_COLUMN_EDIT';
exports.FREE_TEXT_COLUMN_DELETE = 'FREE_TEXT_COLUMN_DELETE';
exports.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE = 'FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE';
exports.FreeTextColumnAdd = (FreeTextColumn) => ({
    type: exports.FREE_TEXT_COLUMN_ADD,
    FreeTextColumn
});
exports.FreeTextColumnEdit = (Index, FreeTextColumn) => ({
    type: exports.FREE_TEXT_COLUMN_EDIT,
    Index,
    FreeTextColumn
});
exports.FreeTextColumnDelete = (FreeTextColumn) => ({
    type: exports.FREE_TEXT_COLUMN_DELETE,
    FreeTextColumn
});
exports.FreeTextColumnAddEditStoredValue = (FreeTextColumn, FreeTextStoredValue) => ({
    type: exports.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE,
    FreeTextColumn,
    FreeTextStoredValue
});
const initialFreeTextColumnState = {
    FreeTextColumns: []
};
exports.FreeTextColumnReducer = (state = initialFreeTextColumnState, action) => {
    let freeTextColumns;
    switch (action.type) {
        case exports.FREE_TEXT_COLUMN_ADD:
            freeTextColumns = [].concat(state.FreeTextColumns);
            freeTextColumns.push(action.FreeTextColumn);
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        case exports.FREE_TEXT_COLUMN_EDIT: {
            freeTextColumns = [].concat(state.FreeTextColumns);
            let index = action.Index;
            freeTextColumns[index] = action.FreeTextColumn;
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        }
        case exports.FREE_TEXT_COLUMN_DELETE: {
            freeTextColumns = [].concat(state.FreeTextColumns);
            let index = freeTextColumns.findIndex(x => x.ColumnId == action.FreeTextColumn.ColumnId);
            freeTextColumns.splice(index, 1);
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        }
        case exports.FREE_TEXT_COLUMN_ADD_EDIT_STORED_VALUE: {
            let actionTypedAddEditStoredValue = action;
            let existingIndex = actionTypedAddEditStoredValue.FreeTextColumn.FreeTextStoredValues.findIndex(ftsv => ftsv.PrimaryKey == actionTypedAddEditStoredValue.FreeTextStoredValue.PrimaryKey);
            if (existingIndex != -1) {
                actionTypedAddEditStoredValue.FreeTextColumn.FreeTextStoredValues[existingIndex] = actionTypedAddEditStoredValue.FreeTextStoredValue;
            }
            else {
                actionTypedAddEditStoredValue.FreeTextColumn.FreeTextStoredValues.push(actionTypedAddEditStoredValue.FreeTextStoredValue);
            }
            freeTextColumns = [].concat(state.FreeTextColumns);
            let index = freeTextColumns.findIndex(x => x.ColumnId == actionTypedAddEditStoredValue.FreeTextColumn.ColumnId);
            freeTextColumns[index] = actionTypedAddEditStoredValue.FreeTextColumn;
            return Object.assign({}, state, { FreeTextColumns: freeTextColumns });
        }
        default:
            return state;
    }
};
