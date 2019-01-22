"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CELL_VALIDATION_ADD_UPDATE = 'CELL_VALIDATION_ADD_UPDATE';
exports.CELL_VALIDATION_DELETE = 'CELL_VALIDATION_DELETE';
exports.CELL_VALIDATION_CHANGE_MODE = 'CELL_VALIDATION_CHANGE_MODE';
exports.CellValidationAddUpdate = (index, cellValidationRule) => ({
    type: exports.CELL_VALIDATION_ADD_UPDATE,
    index,
    cellValidationRule
});
exports.CellValidationDelete = (index) => ({
    type: exports.CELL_VALIDATION_DELETE,
    index,
});
exports.CellValidationChangeMode = (index, ActionMode) => ({
    type: exports.CELL_VALIDATION_CHANGE_MODE,
    index,
    ActionMode
});
const initialCellValidationState = {
    CellValidations: []
};
exports.CellValidationReducer = (state = initialCellValidationState, action) => {
    let cellValidations;
    switch (action.type) {
        case exports.CELL_VALIDATION_ADD_UPDATE: {
            let actionTyped = action;
            cellValidations = [].concat(state.CellValidations);
            if (actionTyped.index == -1) {
                cellValidations.push(actionTyped.cellValidationRule);
            }
            else {
                cellValidations[actionTyped.index] = actionTyped.cellValidationRule;
            }
            return Object.assign({}, state, { CellValidations: cellValidations });
        }
        case exports.CELL_VALIDATION_DELETE: {
            cellValidations = [].concat(state.CellValidations);
            cellValidations.splice(action.index, 1);
            return Object.assign({}, state, { CellValidations: cellValidations });
        }
        case exports.CELL_VALIDATION_CHANGE_MODE: {
            let actionTyped = action;
            cellValidations = [].concat(state.CellValidations);
            let cellValidation = cellValidations[actionTyped.index];
            cellValidations[actionTyped.index] = Object.assign({}, cellValidation, { ActionMode: actionTyped.ActionMode });
            return Object.assign({}, state, { CellValidations: cellValidations });
        }
        default:
            return state;
    }
};
