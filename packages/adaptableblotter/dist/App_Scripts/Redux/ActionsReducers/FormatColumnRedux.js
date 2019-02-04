"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.FORMAT_COLUMN_ADD = 'FORMAT_COLUMN_ADD';
exports.FORMAT_COLUMN_EDIT = 'FORMAT_COLUMN_EDIT';
exports.FORMAT_COLUMN_DELETE = 'FORMAT_COLUMN_DELETE';
exports.FormatColumnAdd = (FormatColumn) => ({
    type: exports.FORMAT_COLUMN_ADD,
    FormatColumn
});
exports.FormatColumnEdit = (FormatColumn) => ({
    type: exports.FORMAT_COLUMN_EDIT,
    FormatColumn
});
exports.FormatColumnDelete = (FormatColumn) => ({
    type: exports.FORMAT_COLUMN_DELETE,
    FormatColumn
});
const initialFormatColumnState = {
    FormatColumns: GeneralConstants_1.EMPTY_ARRAY
};
exports.FormatColumnReducer = (state = initialFormatColumnState, action) => {
    let formatColumns;
    switch (action.type) {
        case exports.FORMAT_COLUMN_ADD:
            formatColumns = [].concat(state.FormatColumns);
            formatColumns.push(action.FormatColumn);
            return Object.assign({}, state, { FormatColumns: formatColumns });
        case exports.FORMAT_COLUMN_EDIT: {
            formatColumns = [].concat(state.FormatColumns);
            let index = formatColumns.findIndex(x => x.ColumnId == action.FormatColumn.ColumnId);
            formatColumns[index] = action.FormatColumn;
            return Object.assign({}, state, { FormatColumns: formatColumns });
        }
        case exports.FORMAT_COLUMN_DELETE:
            formatColumns = [].concat(state.FormatColumns);
            let index = formatColumns.findIndex(x => x.ColumnId == action.FormatColumn.ColumnId);
            formatColumns.splice(index, 1);
            return Object.assign({}, state, { FormatColumns: formatColumns });
        default:
            return state;
    }
};
