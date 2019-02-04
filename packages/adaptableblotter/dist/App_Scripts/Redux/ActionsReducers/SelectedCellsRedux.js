"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.SELECTED_CELLS_CHANGE_OPERATION = 'SELECTED_CELLS_CHANGE_OPERATION';
exports.SelectedCellsChangeOperation = (SelectedCellOperation) => ({
    type: exports.SELECTED_CELLS_CHANGE_OPERATION,
    SelectedCellOperation
});
const initialSelectedCellsState = {
    SelectedCellOperation: GeneralConstants_1.SELECTED_CELLS_DEFAULT_OPERATION
};
exports.SelectedCellsReducer = (state = initialSelectedCellsState, action) => {
    switch (action.type) {
        case exports.SELECTED_CELLS_CHANGE_OPERATION:
            return Object.assign({}, state, { SelectedCellOperation: action.SelectedCellOperation });
        default:
            return state;
    }
};
