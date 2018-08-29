"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_NEW_COLUMN_LIST_ORDER = 'SET_NEW_COLUMN_LIST_ORDER';
exports.SetNewColumnListOrder = (VisibleColumnList) => ({
    type: exports.SET_NEW_COLUMN_LIST_ORDER,
    VisibleColumnList
});
// No reducer required as it all takes place in the main store
