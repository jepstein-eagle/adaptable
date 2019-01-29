"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.FLASHING_CELL_SELECT = 'FLASHING_CELL_SELECT';
exports.FLASHING_CELL_CHANGE_DURATION = 'FLASHING_CELL_CHANGE_DURATION';
exports.FLASHING_CELL_SELECT_ALL = 'FLASHING_CELL_SELECT_ALL';
exports.FLASHING_CELL_CHANGE_UP_COLOR = 'FLASHING_CELL_CHANGE_UP_COLOR';
exports.FLASHING_CELL_CHANGE_DOWN_COLOR = 'FLASHING_CELL_CHANGE_DOWN_COLOR';
exports.FlashingCellSelect = (FlashingCell) => ({
    type: exports.FLASHING_CELL_SELECT,
    FlashingCell
});
exports.FlashingCellSelectAll = (shouldTurnOn, NumericColumns) => ({
    type: exports.FLASHING_CELL_SELECT_ALL,
    shouldTurnOn,
    NumericColumns
});
exports.FlashingCellChangeDuration = (FlashingCell, NewFlashDuration) => ({
    type: exports.FLASHING_CELL_CHANGE_DURATION,
    FlashingCell,
    NewFlashDuration
});
exports.FlashingCellChangeUpColor = (FlashingCell, UpColor) => ({
    type: exports.FLASHING_CELL_CHANGE_UP_COLOR,
    FlashingCell,
    UpColor
});
exports.FlashingCellChangeDownColor = (FlashingCell, DownColor) => ({
    type: exports.FLASHING_CELL_CHANGE_DOWN_COLOR,
    FlashingCell,
    DownColor
});
const initialShortcutState = {
    FlashingCells: GeneralConstants_1.EMPTY_ARRAY,
    DefaultUpColor: GeneralConstants_1.FLASHING_CELLS_DEFAULT_UP_COLOR,
    DefautDownColor: GeneralConstants_1.FLASHING_CELLS_DEFAULT_DOWN_COLOR,
    DefaultDuration: GeneralConstants_1.FLASHING_CELLS_DEFAULT_DURATION
};
exports.FlashingCellReducer = (state = initialShortcutState, action) => {
    switch (action.type) {
        case exports.FLASHING_CELL_SELECT: {
            let selectedFlashingCell = action.FlashingCell;
            let items = [].concat(state.FlashingCells);
            selectedFlashingCell = Object.assign({}, selectedFlashingCell, {
                IsLive: !selectedFlashingCell.IsLive
            });
            let index = items.findIndex(x => x.ColumnId == selectedFlashingCell.ColumnId);
            if (index != -1) { // it exists
                items[index] = selectedFlashingCell;
            }
            else {
                items.push(selectedFlashingCell);
            }
            return Object.assign({}, state, {
                FlashingCells: items
            });
        }
        case exports.FLASHING_CELL_SELECT_ALL: {
            let numericColumns = action.NumericColumns;
            let shouldTurnOn = action.shouldTurnOn;
            let items = [].concat(state.FlashingCells);
            numericColumns.forEach(column => {
                let index = items.findIndex(i => i.ColumnId == column.ColumnId);
                if (index != -1) { // it exists
                    items[index] = Object.assign({}, column, { IsLive: shouldTurnOn });
                }
                else {
                    items.push(Object.assign({}, column, { IsLive: shouldTurnOn }));
                }
            });
            return Object.assign({}, state, {
                FlashingCells: items
            });
        }
        case exports.FLASHING_CELL_CHANGE_DURATION: {
            let actionTyped = action;
            let flashingCell = actionTyped.FlashingCell;
            let items = [].concat(state.FlashingCells);
            let index = items.findIndex(i => i == flashingCell);
            if (index != -1) { // it exists
                items[index] = Object.assign({}, flashingCell, { FlashingCellDuration: actionTyped.NewFlashDuration });
            }
            else {
                items.push(Object.assign({}, flashingCell, { FlashingCellDuration: actionTyped.NewFlashDuration }));
            }
            return Object.assign({}, state, {
                FlashingCells: items
            });
        }
        //Jo: Not sure we need to do all that since we already have the instance..... but I'm copy pasting what's been done previously
        case exports.FLASHING_CELL_CHANGE_UP_COLOR: {
            let actionTyped = action;
            let flashingCell = actionTyped.FlashingCell;
            let items = [].concat(state.FlashingCells);
            let index = items.findIndex(i => i == flashingCell);
            if (index != -1) { // it exists
                items[index] = Object.assign({}, flashingCell, { UpColor: actionTyped.UpColor });
            }
            else {
                items.push(Object.assign({}, flashingCell, { UpColor: actionTyped.UpColor }));
            }
            return Object.assign({}, state, {
                FlashingCells: items
            });
        }
        //Jo: Not sure we need to do all that since we already have the instance..... but I'm copy pasting what's been done previously
        case exports.FLASHING_CELL_CHANGE_DOWN_COLOR: {
            let actionTyped = action;
            let flashingCell = actionTyped.FlashingCell;
            let items = [].concat(state.FlashingCells);
            let index = items.findIndex(i => i == flashingCell);
            if (index != -1) { // it exists
                items[index] = Object.assign({}, flashingCell, { DownColor: actionTyped.DownColor });
            }
            else {
                items.push(Object.assign({}, flashingCell, { DownColor: actionTyped.DownColor }));
            }
            return Object.assign({}, state, {
                FlashingCells: items
            });
        }
        default:
            return state;
    }
};
