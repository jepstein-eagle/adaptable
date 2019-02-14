"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.CELL_SUMMARY_CHANGE_OPERATION = 'CELL_SUMMARY_CHANGE_OPERATION';
exports.CellSummaryChangeOperation = (CellSumaryOperation) => ({
    type: exports.CELL_SUMMARY_CHANGE_OPERATION,
    CellSumaryOperation
});
const initialCellSummaryState = {
    CellSumaryOperation: GeneralConstants_1.SELECTED_CELLS_DEFAULT_OPERATION
};
exports.CellSummaryReducer = (state = initialCellSummaryState, action) => {
    switch (action.type) {
        case exports.CELL_SUMMARY_CHANGE_OPERATION:
            return Object.assign({}, state, { CellSumaryOperation: action.CellSumaryOperation });
        default:
            return state;
    }
};
