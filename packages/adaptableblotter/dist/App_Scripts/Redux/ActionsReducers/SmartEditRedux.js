"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.SMARTEDIT_APPLY = 'SMARTEDIT_APPLY';
exports.SMARTEDIT_CHANGE_VALUE = 'SMARTEDIT_CHANGE_VALUE';
exports.SMARTEDIT_CHANGE_OPERATION = 'SMARTEDIT_CHANGE_OPERATION';
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
const initialSmartEditState = {
    SmartEditValue: GeneralConstants_1.SMART_EDIT_DEFAULT_VALUE,
    MathOperation: GeneralConstants_1.SMART_EDIT_DEFAULT_OPERATION,
};
exports.SmartEditReducer = (state = initialSmartEditState, action) => {
    switch (action.type) {
        case exports.SMARTEDIT_CHANGE_VALUE:
            return Object.assign({}, state, { SmartEditValue: action.value });
        case exports.SMARTEDIT_CHANGE_OPERATION:
            return Object.assign({}, state, { MathOperation: action.MathOperation });
        default:
            return state;
    }
};
