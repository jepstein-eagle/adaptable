"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../Core/Enums");
exports.SELECTED_CELLS_CHANGE_OPERATION = 'SELECTED_CELLS_CHANGE_OPERATION';
exports.SELECTED_CELLS_CREATE_SUMMARY = 'SELECTED_CELLS_CREATE_SUMMARY';
exports.SELECTED_CELLS_SET_SUMMARY = 'SELECTED_CELLS_SET_SUMMARY';
exports.SelectedCellsChangeOperation = (SelectedCellOperation) => ({
    type: exports.SELECTED_CELLS_CHANGE_OPERATION,
    SelectedCellOperation
});
exports.SelectedCellCreateSummary = () => ({
    type: exports.SELECTED_CELLS_CREATE_SUMMARY
});
exports.SelectedCellSetSummary = (SelectedCellSummary) => ({
    type: exports.SELECTED_CELLS_SET_SUMMARY,
    SelectedCellSummary
});
const initialSelectedCellsState = {
    SelectedCellOperation: Enums_1.SelectedCellOperation.Sum,
    SelectedCellSummary: null
};
exports.SelectedCellsReducer = (state = initialSelectedCellsState, action) => {
    switch (action.type) {
        case exports.SELECTED_CELLS_CHANGE_OPERATION:
            return Object.assign({}, state, { SelectedCellOperation: action.SelectedCellOperation });
        case exports.SELECTED_CELLS_SET_SUMMARY:
            return Object.assign({}, state, { SelectedCellSummary: action.SelectedCellSummary });
        default:
            return state;
    }
};
