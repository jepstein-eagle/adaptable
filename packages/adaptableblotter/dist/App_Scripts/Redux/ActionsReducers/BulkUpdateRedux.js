"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BULK_UPDATE_APPLY = 'BULK_UPDATE_APPLY';
exports.BULK_UPDATE_CHANGE_VALUE = 'BULK_UPDATE_CHANGE_VALUE';
exports.BulkUpdateApply = (bypassCellValidationWarnings) => ({
    type: exports.BULK_UPDATE_APPLY,
    bypassCellValidationWarnings
});
exports.BulkUpdateChangeValue = (value) => ({
    type: exports.BULK_UPDATE_CHANGE_VALUE,
    value
});
const initialBulkUpdateState = {
    BulkUpdateValue: "",
};
exports.BulkUpdateReducer = (state = initialBulkUpdateState, action) => {
    switch (action.type) {
        case exports.BULK_UPDATE_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state, { PreviewInfo: null });
        case exports.BULK_UPDATE_CHANGE_VALUE:
            return Object.assign({}, state, { BulkUpdateValue: action.value });
        default:
            return state;
    }
};
