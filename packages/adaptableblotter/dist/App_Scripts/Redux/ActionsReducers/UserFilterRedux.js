"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_FILTER_ADD_UPDATE = 'USER_FILTER_ADD_UPDATE';
exports.USER_FILTER_DELETE = 'USER_FILTER_DELETE';
exports.CREATE_USER_FILTER_FROM_COLUMN_FILTER = 'CREATE_USER_FILTER_FROM_COLUMN_FILTER';
exports.UserFilterAddUpdate = (Index, UserFilter) => ({
    type: exports.USER_FILTER_ADD_UPDATE,
    Index,
    UserFilter
});
exports.UserFilterDelete = (UserFilter) => ({
    type: exports.USER_FILTER_DELETE,
    UserFilter
});
exports.CreateUserFilterFromColumnFilter = (ColumnFilter, InputText) => ({
    type: exports.CREATE_USER_FILTER_FROM_COLUMN_FILTER,
    ColumnFilter,
    InputText
});
const initialFilterState = {
    UserFilters: [],
};
exports.UserFilterReducer = (state = initialFilterState, action) => {
    let index;
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
        default:
            return state;
    }
};
