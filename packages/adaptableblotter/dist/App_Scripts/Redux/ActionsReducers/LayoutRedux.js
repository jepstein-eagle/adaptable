"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAYOUT_SELECT = 'LAYOUT_SELECT';
exports.LAYOUT_ADD_UPDATE = 'LAYOUT_ADD_UPDATE';
exports.LAYOUT_SAVE = 'LAYOUT_SAVE';
exports.LAYOUT_DELETE = 'DELETE_LAYOUT';
exports.LAYOUT_PRESAVE = 'LAYOUT_PRESAVE';
exports.LayoutPreSave = (Index, Layout) => ({
    type: exports.LAYOUT_PRESAVE,
    Index,
    Layout
});
exports.LayoutAddUpdate = (Index, Layout) => ({
    type: exports.LAYOUT_ADD_UPDATE,
    Index,
    Layout
});
exports.LayoutSelect = (LayoutName) => ({
    type: exports.LAYOUT_SELECT,
    LayoutName
});
exports.LayoutDelete = (LayoutName) => ({
    type: exports.LAYOUT_DELETE,
    LayoutName
});
const initialLayoutState = {
    CurrentLayout: "",
    Layouts: []
};
exports.LayoutReducer = (state = initialLayoutState, action) => {
    let index;
    let layouts;
    switch (action.type) {
        //  case LAYOUT_PRESAVE:
        //      return state
        case exports.LAYOUT_SELECT:
            return Object.assign({}, state, { CurrentLayout: action.LayoutName });
        case exports.LAYOUT_ADD_UPDATE:
            let actionTypedAddUpdate = action;
            layouts = [].concat(state.Layouts);
            index = actionTypedAddUpdate.Index;
            if (actionTypedAddUpdate.Index > -1) { // it exists
                layouts[index] = actionTypedAddUpdate.Layout;
            }
            else {
                layouts.push(actionTypedAddUpdate.Layout);
            }
            return Object.assign({}, state, { Layouts: layouts });
        case exports.LAYOUT_DELETE:
            let actionTypedDelete = action;
            layouts = [].concat(state.Layouts);
            index = layouts.findIndex(a => a.Name == actionTypedDelete.LayoutName);
            layouts.splice(index, 1);
            return Object.assign({}, state, { Layouts: layouts });
        default:
            return state;
    }
};
