"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CALCULATEDCOLUMN_ADD = 'CALCULATEDCOLUMN_ADD';
exports.CALCULATEDCOLUMN_EDIT = 'CALCULATEDCOLUMN_EDIT';
exports.CALCULATEDCOLUMN_DELETE = 'CALCULATEDCOLUMN_DELETE';
exports.CALCULATEDCOLUMN_IS_EXPRESSION_VALID = 'CALCULATEDCOLUMN_IS_EXPRESSION_VALID';
exports.CALCULATEDCOLUMN_SET_ERROR_MSG = 'CALCULATEDCOLUMN_SET_ERROR_MSG';
exports.CalculatedColumnAdd = (CalculatedColumn) => ({
    type: exports.CALCULATEDCOLUMN_ADD,
    CalculatedColumn
});
exports.CalculatedColumnEdit = (Index, CalculatedColumn) => ({
    type: exports.CALCULATEDCOLUMN_EDIT,
    Index,
    CalculatedColumn
});
exports.CalculatedColumnDelete = (Index) => ({
    type: exports.CALCULATEDCOLUMN_DELETE,
    Index
});
exports.CalculatedColumnIsExpressionValid = (Expression) => ({
    type: exports.CALCULATEDCOLUMN_IS_EXPRESSION_VALID,
    Expression
});
exports.CalculatedColumnSetErrorMessage = (ErrorMsg) => ({
    type: exports.CALCULATEDCOLUMN_SET_ERROR_MSG,
    ErrorMsg
});
const initialCalculatedColumnState = {
    CalculatedColumns: [],
    CalculatedColumnErrorMessage: ""
};
exports.CalculatedColumnReducer = (state = initialCalculatedColumnState, action) => {
    switch (action.type) {
        case exports.CALCULATEDCOLUMN_SET_ERROR_MSG: {
            return Object.assign({}, state, {
                CalculatedColumnErrorMessage: action.ErrorMsg
            });
        }
        case exports.CALCULATEDCOLUMN_ADD: {
            let items = [].concat(state.CalculatedColumns);
            items.push(action.CalculatedColumn);
            return Object.assign({}, state, {
                CalculatedColumns: items
            });
        }
        case exports.CALCULATEDCOLUMN_EDIT: {
            let items = [].concat(state.CalculatedColumns);
            let index = action.Index;
            items[index] = action.CalculatedColumn;
            return Object.assign({}, state, {
                CalculatedColumns: items
            });
        }
        case exports.CALCULATEDCOLUMN_DELETE:
            var items = [].concat(state.CalculatedColumns);
            let index = action.Index;
            items.splice(index, 1);
            return Object.assign({}, state, {
                CalculatedColumns: items
            });
        default:
            return state;
    }
};
