"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILTER_FORM_HIDE = 'FILTER_FORM_HIDE';
exports.FilterFormHide = () => ({
    type: exports.FILTER_FORM_HIDE,
});
const initialFilterState = {};
exports.HomeReducer = (state = initialFilterState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
