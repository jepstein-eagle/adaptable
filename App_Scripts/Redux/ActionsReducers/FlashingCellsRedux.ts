import { FlashingCellState } from './Interface/IState';
import { IFlashingCell } from '../../Strategy/Interface/IFlashingCellsStrategy';
import * as Redux from 'redux'

export const FLASHING_CELL_SELECT = 'FLASHING_CELL_SELECT';
export const FLASHING_CELL_CHANGE_DURATION = 'FLASHING_CELL_CHANGE_DURATION';
export const FLASHING_CELL_SELECT_ALL = 'FLASHING_CELL_SELECT_ALL';
export const FLASHING_CELL_CHANGE_UP_COLOR = 'FLASHING_CELL_CHANGE_UP_COLOR';
export const FLASHING_CELL_CHANGE_DOWN_COLOR = 'FLASHING_CELL_CHANGE_DOWN_COLOR';


export interface FlashingCellSelectAction extends Redux.Action {
    FlashingCell: IFlashingCell
}

export interface FlashingCellSelectAllAction extends Redux.Action {
    NumericColumns: IFlashingCell[],
}

export interface FlashingCellChangeDurationAction extends Redux.Action {
    FlashingCell: IFlashingCell,
    NewFlashDuration: number;
}

export interface FlashingCellChangeUpColorAction extends Redux.Action {
    FlashingCell: IFlashingCell,
    UpColor: string;
}

export interface FlashingCellChangeDownColorAction extends Redux.Action {
    FlashingCell: IFlashingCell,
    DownColor: string;
}

export const FlashingCellSelect = (FlashingCell: IFlashingCell): FlashingCellSelectAction => ({
    type: FLASHING_CELL_SELECT,
    FlashingCell
})

export const FlashingCellSelectAll = (NumericColumns: IFlashingCell[]): FlashingCellSelectAllAction => ({
    type: FLASHING_CELL_SELECT_ALL,
    NumericColumns
})

export const FlashingCellChangeDuration = (FlashingCell: IFlashingCell, NewFlashDuration: number): FlashingCellChangeDurationAction => ({
    type: FLASHING_CELL_CHANGE_DURATION,
    FlashingCell,
    NewFlashDuration
})

export const FlashingCellChangeUpColor = (FlashingCell: IFlashingCell, UpColor: string): FlashingCellChangeUpColorAction => ({
    type: FLASHING_CELL_CHANGE_UP_COLOR,
    FlashingCell,
    UpColor
})

export const FlashingCellChangeDownColor = (FlashingCell: IFlashingCell, DownColor: string): FlashingCellChangeDownColorAction => ({
    type: FLASHING_CELL_CHANGE_DOWN_COLOR,
    FlashingCell,
    DownColor
})

const initialShortcutState: FlashingCellState = {
    FlashingCells: []
}

export const FlashingCellReducer: Redux.Reducer<FlashingCellState> = (state: FlashingCellState = initialShortcutState, action: Redux.Action): FlashingCellState => {
    switch (action.type) {

        case FLASHING_CELL_SELECT: {
            let selectedFlashingCell = (<FlashingCellSelectAction>action).FlashingCell
            let items: Array<IFlashingCell> = [].concat(state.FlashingCells);
            selectedFlashingCell = Object.assign({}, selectedFlashingCell, {
                IsLive: !selectedFlashingCell.IsLive
            });
            let index = items.findIndex(x => x.ColumnName == selectedFlashingCell.ColumnName)
            if (index != -1) {  // it exists
                items[index] = selectedFlashingCell;
            } else {
                items.push(selectedFlashingCell);
            }
            return Object.assign({}, state, {
                FlashingCells: items
            });
        }
        case FLASHING_CELL_SELECT_ALL: {
            let numericColumns: Array<IFlashingCell> = (<FlashingCellSelectAllAction>action).NumericColumns;
            let shouldTurnOn = !numericColumns.every(n => n.IsLive);
            let items: Array<IFlashingCell> = [].concat(state.FlashingCells);
            numericColumns.forEach(column => {
                let index = items.findIndex(i => i.ColumnName == column.ColumnName);
                if (index != -1) {  // it exists
                    items[index] = Object.assign({}, column, { IsLive: shouldTurnOn })
                } else {
                    items.push(Object.assign({}, column, { IsLive: shouldTurnOn }));
                }
            })
            return Object.assign({}, state, {
                FlashingCells: items
            });
        }
        case FLASHING_CELL_CHANGE_DURATION: {
            let actionTyped = <FlashingCellChangeDurationAction>action
            let flashingCell = actionTyped.FlashingCell
            let items: Array<IFlashingCell> = [].concat(state.FlashingCells);
            let index = items.findIndex(i => i == flashingCell)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, flashingCell, { FlashingCellDuration: actionTyped.NewFlashDuration })
            } else {
                items.push(Object.assign({}, flashingCell, { FlashingCellDuration: actionTyped.NewFlashDuration }));
            }
            return Object.assign({}, state, {
                FlashingCells: items
            });

        }
        //Jo: Not sure we need to do all that since we already have the instance..... but I'm copy pasting what's been done previously
        case FLASHING_CELL_CHANGE_UP_COLOR: {
            let actionTyped = <FlashingCellChangeUpColorAction>action
            let flashingCell = actionTyped.FlashingCell
            let items: Array<IFlashingCell> = [].concat(state.FlashingCells);
            let index = items.findIndex(i => i == flashingCell)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, flashingCell, { UpBackColor: actionTyped.UpColor })
            } else {
                items.push(Object.assign({}, flashingCell, { UpBackColor: actionTyped.UpColor }));
            }
            return Object.assign({}, state, {
                FlashingCells: items
            });

        }
        //Jo: Not sure we need to do all that since we already have the instance..... but I'm copy pasting what's been done previously
        case FLASHING_CELL_CHANGE_DOWN_COLOR: {
            let actionTyped = <FlashingCellChangeDownColorAction>action
            let flashingCell = actionTyped.FlashingCell
            let items: Array<IFlashingCell> = [].concat(state.FlashingCells);
            let index = items.findIndex(i => i == flashingCell)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, flashingCell, { DownBackColor: actionTyped.DownColor })
            } else {
                items.push(Object.assign({}, flashingCell, { DownBackColor: actionTyped.DownColor }));
            }
            return Object.assign({}, state, {
                FlashingCells: items
            });

        }
        default:
            return state
    }
}