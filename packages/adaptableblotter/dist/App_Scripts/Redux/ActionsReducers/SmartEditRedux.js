"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../Core/Enums");
exports.SMARTEDIT_APPLY = 'SMARTEDIT_APPLY';
exports.SMARTEDIT_CHANGE_VALUE = 'SMARTEDIT_CHANGE_VALUE';
exports.SMARTEDIT_CHANGE_OPERATION = 'SMARTEDIT_CHANGE_OPERATION';
exports.SMARTEDIT_CHECK_CELL_SELECTION = 'SMARTEDIT_CHECK_CELL_SELECTION';
exports.SMARTEDIT_FETCH_PREVIEW = 'SMARTEDIT_FETCH_PREVIEW';
exports.SMARTEDIT_SET_VALID_SELECTION = 'SMARTEDIT_SET_VALID_SELECTION';
exports.SMARTEDIT_SET_PREVIEW = 'SMARTEDIT_SET_PREVIEW';
exports.SmartEditApply = (bypassCellValidationWarnings) => ({
    type: exports.SMARTEDIT_APPLY,
    bypassCellValidationWarnings
});
exports.SmartEditChangeValue = (value) => ({
    type: exports.SMARTEDIT_CHANGE_VALUE,
    value
});
exports.SmartEditChangeOperation = (MathOperation) => ({
    type: exports.SMARTEDIT_CHANGE_OPERATION,
    MathOperation
});
exports.SmartEditCheckCellSelection = () => ({
    type: exports.SMARTEDIT_CHECK_CELL_SELECTION
});
exports.SmartEditSetValidSelection = (IsValidSelection) => ({
    type: exports.SMARTEDIT_SET_VALID_SELECTION,
    IsValidSelection
});
exports.SmartEditSetPreview = (PreviewInfo) => ({
    type: exports.SMARTEDIT_SET_PREVIEW,
    PreviewInfo
});
const initialSmartEditState = {
    SmartEditValue: 1,
    MathOperation: Enums_1.MathOperation.Add,
    IsValidSelection: false,
    PreviewInfo: null
};
exports.SmartEditReducer = (state = initialSmartEditState, action) => {
    switch (action.type) {
        // case SMARTEDIT_APPLY:
        //we apply logic in the middleware since it's an API call
        //   return Object.assign({}, state, { PreviewInfo: null })
        case exports.SMARTEDIT_CHANGE_VALUE:
            return Object.assign({}, state, { SmartEditValue: action.value });
        case exports.SMARTEDIT_CHANGE_OPERATION:
            return Object.assign({}, state, { MathOperation: action.MathOperation });
        case exports.SMARTEDIT_SET_VALID_SELECTION:
            return Object.assign({}, state, { IsValidSelection: action.IsValidSelection });
        case exports.SMARTEDIT_CHECK_CELL_SELECTION:
            return state;
        case exports.SMARTEDIT_SET_PREVIEW:
            return Object.assign({}, state, { PreviewInfo: action.PreviewInfo });
        default:
            return state;
    }
};
