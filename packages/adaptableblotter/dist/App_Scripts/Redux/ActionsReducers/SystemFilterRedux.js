"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FilterHelper_1 = require("../../Utilities/Helpers/FilterHelper");
exports.SYSTEM_FILTER_SET = 'SYSTEM_FILTER_SET';
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
