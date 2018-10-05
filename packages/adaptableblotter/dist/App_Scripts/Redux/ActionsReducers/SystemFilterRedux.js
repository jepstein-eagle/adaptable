"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FilterHelper_1 = require("../../Core/Helpers/FilterHelper");
exports.HIDE_FILTER_FORM = 'HIDE_FILTER_FORM';
exports.SYSTEM_FILTER_SET = 'SYSTEM_FILTER_SET';
exports.HideFilterForm = () => ({
    type: exports.HIDE_FILTER_FORM,
});
exports.SystemFilterSet = (SystemFilters) => ({
    type: exports.SYSTEM_FILTER_SET,
    SystemFilters
});
const initialFilterState = {
    SystemFilters: FilterHelper_1.FilterHelper.GetAllSystemFilters(),
};
exports.SystemFilterReducer = (state = initialFilterState, action) => {
    switch (action.type) {
        case exports.SYSTEM_FILTER_SET:
            return Object.assign({}, state, { SystemFilters: action.SystemFilters });
        default:
            return state;
    }
};
