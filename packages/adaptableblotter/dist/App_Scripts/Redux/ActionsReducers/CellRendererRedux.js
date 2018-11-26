"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CELL_RENDERER_ADD_UPDATE = 'CELL_RENDERER_ADD_UPDATE';
exports.CELL_RENDERER_DELETE = 'CELL_RENDERER_DELETE';
exports.CELL_RENDERER_CHANGE_POSITIVE_COLOR = 'CELL_RENDERER_CHANGE_POSITIVE_COLOR';
exports.CELL_RENDERER_CHANGE_NEGATIVE_COLOR = 'CELL_RENDERER_CHANGE_NEGATIVE_COLOR';
exports.CellRendererAddUpdate = (Index, CellRenderer) => ({
    type: exports.CELL_RENDERER_ADD_UPDATE,
    Index,
    CellRenderer
});
exports.CellRendererDelete = (Index) => ({
    type: exports.CELL_RENDERER_DELETE,
    Index,
});
exports.CellRendererChangePositiveColor = (CellRenderer, PositiveColor) => ({
    type: exports.CELL_RENDERER_CHANGE_POSITIVE_COLOR,
    CellRenderer,
    PositiveColor
});
exports.CellRendererChangeNegativeColor = (CellRenderer, NegativeColor) => ({
    type: exports.CELL_RENDERER_CHANGE_NEGATIVE_COLOR,
    CellRenderer,
    NegativeColor
});
const initialCellRendererState = {
    PercentCellRenderers: []
};
exports.CellRendererReducer = (state = initialCellRendererState, action) => {
    let PercentCellRenderers;
    switch (action.type) {
        case exports.CELL_RENDERER_ADD_UPDATE: {
            let actionTyped = action;
            PercentCellRenderers = [].concat(state.PercentCellRenderers);
            if (actionTyped.Index == -1) {
                PercentCellRenderers.push(actionTyped.CellRenderer);
            }
            else {
                PercentCellRenderers[actionTyped.Index] = actionTyped.CellRenderer;
            }
            return Object.assign({}, state, { PercentCellRenderers: PercentCellRenderers });
        }
        case exports.CELL_RENDERER_DELETE: {
            PercentCellRenderers = [].concat(state.PercentCellRenderers);
            PercentCellRenderers.splice(action.Index, 1);
            return Object.assign({}, state, { PercentCellRenderers: PercentCellRenderers });
        }
        case exports.CELL_RENDERER_CHANGE_POSITIVE_COLOR: {
            let actionTyped = action;
            let percentCellRenderer = actionTyped.CellRenderer;
            let items = [].concat(state.PercentCellRenderers);
            let index = items.findIndex(i => i == percentCellRenderer);
            if (index != -1) { // it exists
                items[index] = Object.assign({}, percentCellRenderer, { PositiveColor: actionTyped.PositiveColor });
            }
            else {
                items.push(Object.assign({}, percentCellRenderer, { PositiveColor: actionTyped.PositiveColor }));
            }
            return Object.assign({}, state, {
                PercentCellRenderers: items
            });
        }
        case exports.CELL_RENDERER_CHANGE_NEGATIVE_COLOR: {
            let actionTyped = action;
            let percentCellRenderer = actionTyped.CellRenderer;
            let items = [].concat(state.PercentCellRenderers);
            let index = items.findIndex(i => i == percentCellRenderer);
            if (index != -1) { // it exists
                items[index] = Object.assign({}, percentCellRenderer, { NegativeColor: actionTyped.NegativeColor });
            }
            else {
                items.push(Object.assign({}, percentCellRenderer, { NegativeColor: actionTyped.NegativeColor }));
            }
            return Object.assign({}, state, {
                PercentCellRenderers: items
            });
        }
        default:
            return state;
    }
};
