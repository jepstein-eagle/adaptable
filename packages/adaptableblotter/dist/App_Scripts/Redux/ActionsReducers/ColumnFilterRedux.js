"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLUMN_FILTER_ADD_UPDATE = 'COLUMN_FILTER_ADD_UPDATE';
exports.COLUMN_FILTER_CLEAR_ALL = 'COLUMN_FILTER_CLEAR_ALL';
exports.COLUMN_FILTER_CLEAR = 'COLUMN_FILTER_CLEAR';
exports.ColumnFilterAddUpdate = (columnFilter) => ({
    type: exports.COLUMN_FILTER_ADD_UPDATE,
    columnFilter
});
exports.ColumnFilterClearAll = () => ({
    type: exports.COLUMN_FILTER_CLEAR_ALL
});
exports.ColumnFilterClear = (columnId) => ({
    type: exports.COLUMN_FILTER_CLEAR,
    columnId
});
const initialFilterState = {
    ColumnFilters: [],
};
exports.ColumnFilterReducer = (state = initialFilterState, action) => {
    let index;
    let columnFilters;
    switch (action.type) {
        case exports.COLUMN_FILTER_ADD_UPDATE: {
            let actionTypedAddUpdate = action;
            columnFilters = [].concat(state.ColumnFilters);
            index = columnFilters.findIndex(i => i.ColumnId == actionTypedAddUpdate.columnFilter.ColumnId);
            if (index != -1) { // it exists
                columnFilters[index] = actionTypedAddUpdate.columnFilter;
            }
            else {
                columnFilters.push(actionTypedAddUpdate.columnFilter);
            }
            return Object.assign({}, state, { ColumnFilters: columnFilters });
        }
        case exports.COLUMN_FILTER_CLEAR_ALL: {
            return Object.assign({}, state, { ColumnFilters: [] });
        }
        case exports.COLUMN_FILTER_CLEAR: {
            let actionTypedDelete = action;
            columnFilters = [].concat(state.ColumnFilters);
            index = columnFilters.findIndex(i => i.ColumnId == actionTypedDelete.columnId);
            columnFilters.splice(index, 1);
            return Object.assign({}, state, { ColumnFilters: columnFilters });
        }
        default:
            return state;
    }
};
