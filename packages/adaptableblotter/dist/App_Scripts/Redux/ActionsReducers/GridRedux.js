"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../../Core/Enums");
exports.GRID_SET_COLUMNS = 'GRID_SET_COLUMNS';
exports.GRID_ADD_COLUMN = 'GRID_ADD_COLUMN';
exports.GRID_HIDE_COLUMN = 'GRID_HIDE_COLUMN';
exports.GRID_SET_VALUE_LIKE_EDIT = 'GRID_SET_VALUE_LIKE_EDIT';
exports.GRID_SELECT_COLUMN = 'GRID_SELECT_COLUMN';
exports.GRID_SET_SORT = 'GRID_SET_SORT';
exports.GRID_SET_BLOTTER_RESTRICTIONS = 'GRID_SET_BLOTTER_RESTRICTIONS';
exports.GRID_SET_SYSTEM_STATUS = 'GRID_SET_SYSTEM_STATUS';
exports.GRID_CLEAR_SYSTEM_STATUS = 'GRID_CLEAR_SYSTEM_STATUS';
exports.GRID_SET_SELECTED_CELLS = 'GRID_SET_SELECTED_CELLS';
exports.GRID_SET_PINNED_COLUMN = 'GRID_SET_PINNED_COLUMN';
exports.GRID_DELETE_PINNED_COLUMN = 'GRID_DELETE_PINNED_COLUMN';
exports.GridSetColumns = (Columns) => ({
    type: exports.GRID_SET_COLUMNS,
    Columns
});
exports.GridAddColumn = (Column) => ({
    type: exports.GRID_ADD_COLUMN,
    Column
});
exports.GridHideColumn = (ColumnId) => ({
    type: exports.GRID_HIDE_COLUMN,
    ColumnId
});
exports.GridSetValueLikeEdit = (CellInfo, OldValue) => ({
    type: exports.GRID_SET_VALUE_LIKE_EDIT,
    CellInfo,
    OldValue
});
exports.GridSelectColumn = (ColumnId) => ({
    type: exports.GRID_SELECT_COLUMN,
    ColumnId
});
exports.GridSetSort = (GridSorts) => ({
    type: exports.GRID_SET_SORT,
    GridSorts
});
exports.GridSetBlotterRestrictions = (BlotterRestrictions) => ({
    type: exports.GRID_SET_BLOTTER_RESTRICTIONS,
    BlotterRestrictions
});
exports.GridSetSystemStatus = (SystemStatus) => ({
    type: exports.GRID_SET_SYSTEM_STATUS,
    SystemStatus
});
exports.GridClearSystemStatus = () => ({
    type: exports.GRID_CLEAR_SYSTEM_STATUS,
});
exports.GridSetSelectedCells = (SelectedCellInfo) => ({
    type: exports.GRID_SET_SELECTED_CELLS,
    SelectedCellInfo
});
exports.GridSetPinnedColumn = (ColumnId, PinnedColumnDirection) => ({
    type: exports.GRID_SET_PINNED_COLUMN,
    ColumnId,
    PinnedColumnDirection
});
exports.GridDeletePinnedColumn = (ColumnId) => ({
    type: exports.GRID_DELETE_PINNED_COLUMN,
    ColumnId
});
const initialGridState = {
    Columns: [],
    GridSorts: [],
    BlotterRestrictions: [],
    SystemStatus: { StatusMessage: "", StatusColour: "Green" },
    SelectedCellInfo: null,
    LeftPinnedColumns: [],
    RightPinnedColumns: []
};
exports.GridReducer = (state = initialGridState, action) => {
    switch (action.type) {
        case exports.GRID_SET_COLUMNS:
            return Object.assign({}, state, { Columns: [].concat(action.Columns) });
        case exports.GRID_ADD_COLUMN:
            let actionTypedAddUpdate = action;
            let columns = [].concat(state.Columns);
            columns.push(actionTypedAddUpdate.Column);
            return Object.assign({}, state, { Columns: columns });
        case exports.GRID_SET_SORT:
            return Object.assign({}, state, { GridSorts: action.GridSorts });
        case exports.GRID_SET_BLOTTER_RESTRICTIONS:
            let actionTypedRestrictions = action;
            let blotterRestrictions = actionTypedRestrictions.BlotterRestrictions;
            return Object.assign({}, state, { BlotterRestrictions: blotterRestrictions });
        case exports.GRID_SET_SYSTEM_STATUS:
            return Object.assign({}, state, { SystemStatus: action.SystemStatus });
        case exports.GRID_CLEAR_SYSTEM_STATUS:
            return Object.assign({}, state, { SystemStatus: { StatusMessage: "", StatusColour: "Green" } });
        case exports.GRID_SET_SELECTED_CELLS:
            return Object.assign({}, state, { SelectedCellInfo: action.SelectedCellInfo });
        case exports.GRID_SET_PINNED_COLUMN:
            let actionTypedSetColumn = action;
            let columnToAdd = actionTypedSetColumn.ColumnId;
            let pinnedColumnDirection = actionTypedSetColumn.PinnedColumnDirection;
            let leftPinnedColumns = [].concat(state.LeftPinnedColumns);
            let rightPinnedColumns = [].concat(state.RightPinnedColumns);
            if (pinnedColumnDirection == Enums_1.PinnedColumnDirection.Left) {
                leftPinnedColumns.push(columnToAdd);
                let existingindex = rightPinnedColumns.findIndex(a => a == columnToAdd);
                if (existingindex > -1) {
                    rightPinnedColumns.splice(existingindex, 1);
                }
            }
            else {
                rightPinnedColumns.push(columnToAdd);
                let existingindex = leftPinnedColumns.findIndex(a => a == columnToAdd);
                if (existingindex > -1) {
                    leftPinnedColumns.splice(existingindex, 1);
                }
            }
            console.log("after add");
            console.log("left cols: " + leftPinnedColumns);
            console.log("right cols: " + rightPinnedColumns);
            return Object.assign({}, state, { LeftPinnedColumns: leftPinnedColumns, RightPinnedColumns: rightPinnedColumns });
        case exports.GRID_DELETE_PINNED_COLUMN:
            let actionTypedDeleteColumn = action;
            let columnToDelete = actionTypedDeleteColumn.ColumnId;
            let leftPinnedColumnsDelete = [].concat(state.LeftPinnedColumns);
            let rightPinnedColumnsDelete = [].concat(state.RightPinnedColumns);
            let existingindex = leftPinnedColumnsDelete.findIndex(a => a == columnToDelete);
            if (existingindex > -1) {
                leftPinnedColumnsDelete.splice(existingindex, 1);
            }
            else {
                existingindex = rightPinnedColumns.findIndex(a => a == columnToDelete);
                if (existingindex > -1) {
                    rightPinnedColumns.splice(existingindex, 1);
                }
            }
            console.log("after delete");
            console.log("left cols: " + leftPinnedColumnsDelete);
            console.log("right cols: " + rightPinnedColumnsDelete);
            return Object.assign({}, state, { LeftPinnedColumns: leftPinnedColumnsDelete, RightPinnedColumns: rightPinnedColumnsDelete });
        default:
            return state;
    }
};
