"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERCENT_BAR_ADD_UPDATE = 'PERCENT_BAR_ADD_UPDATE';
exports.PERCENT_BAR_DELETE = 'PERCENT_BAR_DELETE';
exports.PERCENT_BAR_CHANGE_POSITIVE_COLOR = 'PERCENT_BAR_CHANGE_POSITIVE_COLOR';
exports.PERCENT_BAR_CHANGE_NEGATIVE_COLOR = 'PERCENT_BAR_CHANGE_NEGATIVE_COLOR';
exports.PercentBarAddUpdate = (Index, PercentBar) => ({
    type: exports.PERCENT_BAR_ADD_UPDATE,
    Index,
    PercentBar
});
exports.PercentBarDelete = (Index) => ({
    type: exports.PERCENT_BAR_DELETE,
    Index,
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
    PercentBars: []
};
exports.PercentBarReducer = (state = initialPercentBarState, action) => {
    let PercentBars;
    switch (action.type) {
        case exports.PERCENT_BAR_ADD_UPDATE: {
            let actionTyped = action;
            PercentBars = [].concat(state.PercentBars);
            if (actionTyped.Index == -1) {
                PercentBars.push(actionTyped.PercentBar);
            }
            else {
                PercentBars[actionTyped.Index] = actionTyped.PercentBar;
            }
            return Object.assign({}, state, { PercentBars: PercentBars });
        }
        case exports.PERCENT_BAR_DELETE: {
            PercentBars = [].concat(state.PercentBars);
            PercentBars.splice(action.Index, 1);
            return Object.assign({}, state, { PercentBars: PercentBars });
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
