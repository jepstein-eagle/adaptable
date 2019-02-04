"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILTER_FORM_HIDE = 'FILTER_FORM_HIDE';
exports.FLOATING_FILTER_BAR_SHOW = 'FLOATING_FILTER_BAR_SHOW';
exports.FLOATING_FILTER_BAR_HIDE = 'FLOATING_FILTER_BAR_HIDE';
exports.FilterFormHide = () => ({
    type: exports.FILTER_FORM_HIDE,
});
exports.FloatingilterBarShow = () => ({
    type: exports.FLOATING_FILTER_BAR_SHOW
});
exports.FloatingFilterBarHide = () => ({
    type: exports.FLOATING_FILTER_BAR_HIDE
});
const initialFilterState = {};
exports.HomeReducer = (state = initialFilterState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
