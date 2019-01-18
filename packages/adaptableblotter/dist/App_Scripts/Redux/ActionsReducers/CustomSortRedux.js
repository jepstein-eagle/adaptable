"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMSORT_ADD = 'CUSTOMSORT_ADD';
exports.CUSTOMSORT_EDIT = 'CUSTOMSORT_EDIT';
exports.CUSTOMSORT_DELETE = 'CUSTOMSORT_DELETE';
exports.CustomSortAdd = (CustomSort) => ({
    type: exports.CUSTOMSORT_ADD,
    CustomSort
});
exports.CustomSortEdit = (CustomSort) => ({
    type: exports.CUSTOMSORT_EDIT,
    CustomSort
});
exports.CustomSortDelete = (CustomSort) => ({
    type: exports.CUSTOMSORT_DELETE,
    CustomSort
});
const initialCustomSortState = {
    CustomSorts: []
};
exports.CustomSortReducer = (state = initialCustomSortState, action) => {
    let customSorts;
    switch (action.type) {
        case exports.CUSTOMSORT_ADD:
            customSorts = [].concat(state.CustomSorts);
            customSorts.push(action.CustomSort);
            return Object.assign({}, state, {
                CustomSorts: customSorts
            });
        case exports.CUSTOMSORT_EDIT: {
            customSorts = [].concat(state.CustomSorts);
            let index = customSorts.findIndex(x => x.ColumnId == action.CustomSort.ColumnId);
            customSorts[index] = action.CustomSort;
            return Object.assign({}, state, {
                CustomSorts: customSorts
            });
        }
        case exports.CUSTOMSORT_DELETE:
            customSorts = [].concat(state.CustomSorts);
            let index = customSorts.findIndex(x => x.ColumnId == action.CustomSort.ColumnId);
            customSorts.splice(index, 1);
            return Object.assign({}, state, {
                CustomSorts: customSorts
            });
        default:
            return state;
    }
};
