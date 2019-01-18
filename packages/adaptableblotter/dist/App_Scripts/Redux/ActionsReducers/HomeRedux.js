"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILTER_FORM_HIDE = 'FILTER_FORM_HIDE';
exports.QUICK_FILTER_BAR_SHOW = 'QUICK_FILTER_BAR_SHOW';
exports.QUICK_FILTER_BAR_HIDE = 'QUICK_FILTER_BAR_HIDE';
exports.HideFilterForm = () => ({
    type: exports.FILTER_FORM_HIDE,
});
exports.QuickFilterBarShow = () => ({
    type: exports.QUICK_FILTER_BAR_SHOW
});
exports.QuickFilterBarHide = () => ({
    type: exports.QUICK_FILTER_BAR_HIDE
});
const initialFilterState = {};
exports.HomeReducer = (state = initialFilterState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
