"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../Utilities/Enums");
const GeneralConstants_1 = require("../../Core/Constants/GeneralConstants");
exports.QUICK_SEARCH_APPLY = 'QUICK_SEARCH_APPLY';
exports.QUICK_SEARCH_SET_OPERATOR = 'QUICK_SEARCH_SET_OPERATOR';
exports.QUICK_SEARCH_SET_DISPLAY = 'QUICK_SEARCH_SET_DISPLAY';
exports.QUICK_SEARCH_SET_STYLE = 'QUICK_SEARCH_SET_STYLE';
exports.QuickSearchApply = (quickSearchText) => ({
    type: exports.QUICK_SEARCH_APPLY,
    quickSearchText
});
exports.QuickSearchSetOperator = (operator) => ({
    type: exports.QUICK_SEARCH_SET_OPERATOR,
    operator
});
exports.QuickSearchSetDisplay = (DisplayAction) => ({
    type: exports.QUICK_SEARCH_SET_DISPLAY,
    DisplayAction
});
exports.QuickSearchSetStyle = (style) => ({
    type: exports.QUICK_SEARCH_SET_STYLE,
    style
});
const initialQuickSearchState = {
    QuickSearchText: "",
    Operator: Enums_1.LeafExpressionOperator.Contains,
    DisplayAction: Enums_1.DisplayAction.HighlightCell,
    Style: {
        BackColor: GeneralConstants_1.QUICK_SEARCH_DEFAULT_BACK_COLOR,
        ForeColor: GeneralConstants_1.QUICK_SEARCH_DEFAULT_FORE_COLOR,
    }
};
exports.QuickSearchReducer = (state = initialQuickSearchState, action) => {
    switch (action.type) {
        case exports.QUICK_SEARCH_APPLY:
            return Object.assign({}, state, { QuickSearchText: action.quickSearchText });
        case exports.QUICK_SEARCH_SET_OPERATOR:
            return Object.assign({}, state, { Operator: action.operator });
        case exports.QUICK_SEARCH_SET_DISPLAY:
            return Object.assign({}, state, { DisplayAction: action.DisplayAction });
        case exports.QUICK_SEARCH_SET_STYLE:
            return Object.assign({}, state, { Style: action.style });
        default:
            return state;
    }
};
