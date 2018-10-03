"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../Core/Enums");
exports.SELECTED_CELLS_CHANGE_OPERATION = 'SELECTED_CELLS_CHANGE_OPERATION';
exports.SelectedCellsChangeOperation = (SelectedCellOperation) => ({
    type: exports.SELECTED_CELLS_CHANGE_OPERATION,
    SelectedCellOperation
});
const initialSelectedCellsState = {
    SelectedCellOperation: Enums_1.SelectedCellOperation.Sum,
};
exports.SelectedCellsReducer = (state = initialSelectedCellsState, action) => {
    switch (action.type) {
        case exports.SELECTED_CELLS_CHANGE_OPERATION:
            return Object.assign({}, state, { SelectedCellOperation: action.SelectedCellOperation });
        default:
            return state;
    }
};
