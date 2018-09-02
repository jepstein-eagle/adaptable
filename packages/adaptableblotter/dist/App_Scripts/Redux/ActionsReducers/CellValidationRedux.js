"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CELL_VALIDATION_ADD_UPDATE = 'CELL_VALIDATION_ADD_UPDATE';
exports.CELL_VALIDATION_DELETE = 'CELL_VALIDATION_DELETE';
exports.CELL_VALIDATION_CHANGE_MODE = 'CELL_VALIDATION_CHANGE_MODE';
exports.CellValidationAddUpdate = (Index, CellValidationRule) => ({
    type: exports.CELL_VALIDATION_ADD_UPDATE,
    Index,
    CellValidationRule
});
exports.CellValidationDelete = (Index) => ({
    type: exports.CELL_VALIDATION_DELETE,
    Index,
});
exports.CellValidationChangeMode = (Index, ActionMode) => ({
    type: exports.CELL_VALIDATION_CHANGE_MODE,
    Index,
    ActionMode
});
const initialCellValidationState = {
    CellValidations: []
};
exports.CellValidationReducer = (state = initialCellValidationState, action) => {
    let CellValidations;
    switch (action.type) {
        case exports.CELL_VALIDATION_ADD_UPDATE: {
            let actionTyped = action;
            CellValidations = [].concat(state.CellValidations);
            if (actionTyped.Index == -1) {
                CellValidations.push(actionTyped.CellValidationRule);
            }
            else {
                CellValidations[actionTyped.Index] = actionTyped.CellValidationRule;
            }
            return Object.assign({}, state, { CellValidations: CellValidations });
        }
        case exports.CELL_VALIDATION_DELETE: {
            CellValidations = [].concat(state.CellValidations);
            CellValidations.splice(action.Index, 1);
            return Object.assign({}, state, { CellValidations: CellValidations });
        }
        case exports.CELL_VALIDATION_CHANGE_MODE: {
            let actionTyped = action;
            CellValidations = [].concat(state.CellValidations);
            let cellValidation = CellValidations[actionTyped.Index];
            CellValidations[actionTyped.Index] = Object.assign({}, cellValidation, { ActionMode: actionTyped.ActionMode });
            return Object.assign({}, state, { CellValidations: CellValidations });
        }
        default:
            return state;
    }
};
