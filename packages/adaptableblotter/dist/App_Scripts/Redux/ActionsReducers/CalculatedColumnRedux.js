"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.CALCULATEDCOLUMN_ADD = 'CALCULATEDCOLUMN_ADD';
exports.CALCULATEDCOLUMN_EDIT = 'CALCULATEDCOLUMN_EDIT';
exports.CALCULATEDCOLUMN_DELETE = 'CALCULATEDCOLUMN_DELETE';
exports.CALCULATEDCOLUMN_IS_EXPRESSION_VALID = 'CALCULATEDCOLUMN_IS_EXPRESSION_VALID';
exports.CalculatedColumnAdd = (calculatedColumn) => ({
    type: exports.CALCULATEDCOLUMN_ADD,
    calculatedColumn
});
exports.CalculatedColumnEdit = (index, calculatedColumn) => ({
    type: exports.CALCULATEDCOLUMN_EDIT,
    index,
    calculatedColumn
});
exports.CalculatedColumnDelete = (index) => ({
    type: exports.CALCULATEDCOLUMN_DELETE,
    index
});
exports.CalculatedColumnIsExpressionValid = (expression) => ({
    type: exports.CALCULATEDCOLUMN_IS_EXPRESSION_VALID,
    expression
});
const initialCalculatedColumnState = {
    CalculatedColumns: GeneralConstants_1.EMPTY_ARRAY,
};
exports.CalculatedColumnReducer = (state = initialCalculatedColumnState, action) => {
    switch (action.type) {
        case exports.CALCULATEDCOLUMN_ADD: {
            let items = [].concat(state.CalculatedColumns);
            items.push(action.calculatedColumn);
            return Object.assign({}, state, {
                CalculatedColumns: items
            });
        }
        case exports.CALCULATEDCOLUMN_EDIT: {
            let items = [].concat(state.CalculatedColumns);
            let index = action.index;
            items[index] = action.calculatedColumn;
            return Object.assign({}, state, {
                CalculatedColumns: items
            });
        }
        case exports.CALCULATEDCOLUMN_DELETE:
            var items = [].concat(state.CalculatedColumns);
            let index = action.index;
            items.splice(index, 1);
            return Object.assign({}, state, {
                CalculatedColumns: items
            });
        default:
            return state;
    }
};
