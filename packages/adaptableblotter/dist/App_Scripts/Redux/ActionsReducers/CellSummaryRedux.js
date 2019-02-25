"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.CELL_SUMMARY_CHANGE_OPERATION = 'CELL_SUMMARY_CHANGE_OPERATION';
exports.CellSummaryChangeOperation = (SummaryOperation) => ({
    type: exports.CELL_SUMMARY_CHANGE_OPERATION,
    SummaryOperation
});
const initialCellSummaryState = {
    SummaryOperation: GeneralConstants_1.CELL_SUMMARY_DEFAULT_OPERATION,
    OptionalSummaryOperations: []
};
exports.CellSummaryReducer = (state = initialCellSummaryState, action) => {
    switch (action.type) {
        case exports.CELL_SUMMARY_CHANGE_OPERATION:
            return Object.assign({}, state, { SummaryOperation: action.SummaryOperation });
        default:
            return state;
    }
};
