"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FilterHelper_1 = require("../../Core/Helpers/FilterHelper");
exports.USER_FILTER_ADD_UPDATE = 'USER_FILTER_ADD_UPDATE';
exports.USER_FILTER_DELETE = 'USER_FILTER_DELETE';
exports.COLUMN_FILTER_ADD_UPDATE = 'COLUMN_FILTER_ADD_UPDATE';
exports.COLUMN_FILTER_CLEAR = 'COLUMN_FILTER_CLEAR';
exports.COLUMN_FILTER_DELETE = 'COLUMN_FILTER_DELETE';
exports.HIDE_FILTER_FORM = 'HIDE_FILTER_FORM';
exports.SYSTEM_FILTER_SET = 'SYSTEM_FILTER_SET';
exports.UserFilterAddUpdate = (Index, UserFilter) => ({
    type: exports.USER_FILTER_ADD_UPDATE,
    Index,
    UserFilter
});
exports.UserFilterDelete = (UserFilter) => ({
    type: exports.USER_FILTER_DELETE,
    UserFilter
});
exports.HideFilterForm = () => ({
    type: exports.HIDE_FILTER_FORM,
});
exports.ColumnFilterAddUpdate = (columnFilter) => ({
    type: exports.COLUMN_FILTER_ADD_UPDATE,
    columnFilter
});
exports.ColumnFilterClear = () => ({
    type: exports.COLUMN_FILTER_CLEAR
});
exports.ColumnFilterDelete = (columnFilter) => ({
    type: exports.COLUMN_FILTER_DELETE,
    columnFilter
});
exports.SystemFilterSet = (SystemFilters) => ({
    type: exports.SYSTEM_FILTER_SET,
    SystemFilters
});
const initialFilterState = {
    ColumnFilters: [],
    UserFilters: [],
    SystemFilters: FilterHelper_1.FilterHelper.GetAllSystemFilters()
};
exports.FilterReducer = (state = initialFilterState, action) => {
    let index;
    let columnFilters;
    let userFilters;
    switch (action.type) {
        case exports.USER_FILTER_ADD_UPDATE: {
            let actionTypedAddUpdate = action;
            userFilters = [].concat(state.UserFilters);
            if (actionTypedAddUpdate.Index != -1) { // it exists
                userFilters[actionTypedAddUpdate.Index] = actionTypedAddUpdate.UserFilter;
            }
            else {
                userFilters.push(actionTypedAddUpdate.UserFilter);
            }
            return Object.assign({}, state, { UserFilters: userFilters });
        }
        case exports.USER_FILTER_DELETE: {
            let actionTypedDelete = action;
            userFilters = [].concat(state.UserFilters);
            index = userFilters.findIndex(i => i.Name == actionTypedDelete.UserFilter.Name);
            userFilters.splice(index, 1);
            return Object.assign({}, state, { UserFilters: userFilters });
        }
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
        case exports.COLUMN_FILTER_CLEAR: {
            return Object.assign({}, state, { ColumnFilters: [] });
        }
        case exports.COLUMN_FILTER_DELETE: {
            let actionTypedDelete = action;
            columnFilters = [].concat(state.ColumnFilters);
            index = columnFilters.findIndex(i => i.ColumnId == actionTypedDelete.columnFilter.ColumnId);
            columnFilters.splice(index, 1);
            return Object.assign({}, state, { ColumnFilters: columnFilters });
        }
        case exports.SYSTEM_FILTER_SET:
            return Object.assign({}, state, { SystemFilters: action.SystemFilters });
        default:
            return state;
    }
};
