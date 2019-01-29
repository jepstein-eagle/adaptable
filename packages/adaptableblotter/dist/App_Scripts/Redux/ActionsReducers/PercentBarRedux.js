"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.PERCENT_BAR_ADD = 'PERCENT_BAR_ADD';
exports.PERCENT_BAR_EDIT = 'PERCENT_BAR_EDIT';
exports.PERCENT_BAR_DELETE = 'PERCENT_BAR_DELETE';
exports.PERCENT_BAR_CHANGE_MINIMUM_VALUE = 'PERCENT_BAR_CHANGE_MINIMUM_VALUE';
exports.PERCENT_BAR_CHANGE_MAXIMUM_VALUE = 'PERCENT_BAR_CHANGE_MAXIMUM_VALUE';
exports.PERCENT_BAR_CHANGE_POSITIVE_COLOR = 'PERCENT_BAR_CHANGE_POSITIVE_COLOR';
exports.PERCENT_BAR_CHANGE_NEGATIVE_COLOR = 'PERCENT_BAR_CHANGE_NEGATIVE_COLOR';
exports.PercentBarAdd = (PercentBar) => ({
    type: exports.PERCENT_BAR_ADD,
    PercentBar
});
exports.PercentBarEdit = (Index, PercentBar) => ({
    type: exports.PERCENT_BAR_EDIT,
    Index,
    PercentBar
});
exports.PercentBarDelete = (Index) => ({
    type: exports.PERCENT_BAR_DELETE,
    Index,
});
exports.PercentBarChangeMinimumValue = (PercentBar, MinimumValue) => ({
    type: exports.PERCENT_BAR_CHANGE_MINIMUM_VALUE,
    PercentBar,
    MinimumValue
});
exports.PercentBarChangeMaximumValue = (PercentBar, MaximumValue) => ({
    type: exports.PERCENT_BAR_CHANGE_MAXIMUM_VALUE,
    PercentBar,
    MaximumValue
});
exports.PercentBarChangePositiveColor = (PercentBar, PositiveColor) => ({
    type: exports.PERCENT_BAR_CHANGE_POSITIVE_COLOR,
    PercentBar,
    PositiveColor
});
exports.PercentBarChangeNegativeColor = (PercentBar, NegativeColor) => ({
    type: exports.PERCENT_BAR_CHANGE_NEGATIVE_COLOR,
    PercentBar,
    NegativeColor
});
const initialPercentBarState = {
    PercentBars: GeneralConstants_1.EMPTY_ARRAY
};
exports.PercentBarReducer = (state = initialPercentBarState, action) => {
    let PercentBars;
    switch (action.type) {
        case exports.PERCENT_BAR_ADD: {
            let actionTyped = action;
            PercentBars = [].concat(state.PercentBars);
            PercentBars.push(actionTyped.PercentBar);
            return Object.assign({}, state, { PercentBars: PercentBars });
        }
        case exports.PERCENT_BAR_EDIT: {
            let actionTyped = action;
            PercentBars = [].concat(state.PercentBars);
            PercentBars[actionTyped.Index] = actionTyped.PercentBar;
            return Object.assign({}, state, { PercentBars: PercentBars });
        }
        case exports.PERCENT_BAR_DELETE: {
            PercentBars = [].concat(state.PercentBars);
            PercentBars.splice(action.Index, 1);
            return Object.assign({}, state, { PercentBars: PercentBars });
        }
        case exports.PERCENT_BAR_CHANGE_MINIMUM_VALUE: {
            let actionTyped = action;
            let PercentBar = actionTyped.PercentBar;
            let items = [].concat(state.PercentBars);
            let index = items.findIndex(i => i.ColumnId == PercentBar.ColumnId);
            if (index != -1) { // it exists
                items[index] = Object.assign({}, PercentBar, { MinValue: actionTyped.MinimumValue });
            }
            else {
                items.push(Object.assign({}, PercentBar, { MinValue: actionTyped.MinimumValue }));
            }
            return Object.assign({}, state, {
                PercentBars: items
            });
        }
        case exports.PERCENT_BAR_CHANGE_MAXIMUM_VALUE: {
            let actionTyped = action;
            let PercentBar = actionTyped.PercentBar;
            let items = [].concat(state.PercentBars);
            let index = items.findIndex(i => i.ColumnId == PercentBar.ColumnId);
            if (index != -1) { // it exists
                items[index] = Object.assign({}, PercentBar, { MaxValue: actionTyped.MaximumValue });
            }
            else {
                items.push(Object.assign({}, PercentBar, { MaxValue: actionTyped.MaximumValue }));
            }
            return Object.assign({}, state, {
                PercentBars: items
            });
        }
        case exports.PERCENT_BAR_CHANGE_POSITIVE_COLOR: {
            let actionTyped = action;
            let PercentBar = actionTyped.PercentBar;
            let items = [].concat(state.PercentBars);
            let index = items.findIndex(i => i == PercentBar);
            if (index != -1) { // it exists
                items[index] = Object.assign({}, PercentBar, { PositiveColor: actionTyped.PositiveColor });
            }
            else {
                items.push(Object.assign({}, PercentBar, { PositiveColor: actionTyped.PositiveColor }));
            }
            return Object.assign({}, state, {
                PercentBars: items
            });
        }
        case exports.PERCENT_BAR_CHANGE_NEGATIVE_COLOR: {
            let actionTyped = action;
            let PercentBar = actionTyped.PercentBar;
            let items = [].concat(state.PercentBars);
            let index = items.findIndex(i => i == PercentBar);
            if (index != -1) { // it exists
                items[index] = Object.assign({}, PercentBar, { NegativeColor: actionTyped.NegativeColor });
            }
            else {
                items.push(Object.assign({}, PercentBar, { NegativeColor: actionTyped.NegativeColor }));
            }
            return Object.assign({}, state, {
                PercentBars: items
            });
        }
        default:
            return state;
    }
};
