"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BULK_UPDATE_APPLY = 'BULK_UPDATE_APPLY';
exports.BULK_UPDATE_CHANGE_VALUE = 'BULK_UPDATE_CHANGE_VALUE';
exports.BULK_UPDATE_CHECK_CELL_SELECTION = 'BULK_UPDATE_CHECK_CELL_SELECTION';
exports.BULK_UPDATE_SET_VALID_SELECTION = 'BULK_UPDATE_SET_VALID_SELECTION';
exports.BULK_UPDATE_SET_PREVIEW = 'BULK_UPDATE_SET_PREVIEW';
exports.BulkUpdateApply = (bypassCellValidationWarnings) => ({
    type: exports.BULK_UPDATE_APPLY,
    bypassCellValidationWarnings
});
exports.BulkUpdateChangeValue = (value) => ({
    type: exports.BULK_UPDATE_CHANGE_VALUE,
    value
});
exports.BulkUpdateCheckCellSelection = () => ({
    type: exports.BULK_UPDATE_CHECK_CELL_SELECTION
});
exports.BulkUpdateSetValidSelection = (IsValidSelection) => ({
    type: exports.BULK_UPDATE_SET_VALID_SELECTION,
    IsValidSelection
});
exports.BulkUpdateSetPreview = (PreviewInfo) => ({
    type: exports.BULK_UPDATE_SET_PREVIEW,
    PreviewInfo
});
const initialBulkUpdateState = {
    BulkUpdateValue: "",
    IsValidSelection: false,
    PreviewInfo: null
};
exports.BulkUpdateReducer = (state = initialBulkUpdateState, action) => {
    switch (action.type) {
        case exports.BULK_UPDATE_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state, { PreviewInfo: null });
        case exports.BULK_UPDATE_CHANGE_VALUE:
            return Object.assign({}, state, { BulkUpdateValue: action.value });
        case exports.BULK_UPDATE_SET_VALID_SELECTION:
            return Object.assign({}, state, { IsValidSelection: action.IsValidSelection });
        case exports.BULK_UPDATE_CHECK_CELL_SELECTION:
            return state;
        case exports.BULK_UPDATE_SET_PREVIEW:
            return Object.assign({}, state, { PreviewInfo: action.PreviewInfo });
        default:
            return state;
    }
};
