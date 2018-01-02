import { FlashingCellState } from './Interface/IState';
import { IFlashingColumn } from '../../Core/Interface/IFlashingCellsStrategy';
import * as Redux from 'redux'

export const FLASHING_CELL_SELECT = 'FLASHING_CELL_SELECT';
export const FLASHING_CELL_CHANGE_DURATION = 'FLASHING_CELL_CHANGE_DURATION';
export const FLASHING_CELL_SELECT_ALL = 'FLASHING_CELL_SELECT_ALL';
export const FLASHING_CELL_CHANGE_UP_COLOR = 'FLASHING_CELL_CHANGE_UP_COLOR';
export const FLASHING_CELL_CHANGE_DOWN_COLOR = 'FLASHING_CELL_CHANGE_DOWN_COLOR';


export interface FlashingCellSelectAction extends Redux.Action {
    FlashingColumn: IFlashingColumn
}

export interface FlashingCellSelectAllAction extends Redux.Action {
    NumericColumns: IFlashingColumn[],
}

export interface FlashingCellChangeDurationAction extends Redux.Action {
    FlashingColumn: IFlashingColumn,
    NewFlashDuration: number;
}

export interface FlashingCellChangeUpColorAction extends Redux.Action {
    FlashingColumn: IFlashingColumn,
    UpColor: string;
}

export interface FlashingCellChangeDownColorAction extends Redux.Action {
    FlashingColumn: IFlashingColumn,
    DownColor: string;
}

export const FlashingCellSelect = (FlashingColumn: IFlashingColumn): FlashingCellSelectAction => ({
    type: FLASHING_CELL_SELECT,
    FlashingColumn
})

export const FlashingCellSelectAll = (NumericColumns: IFlashingColumn[]): FlashingCellSelectAllAction => ({
    type: FLASHING_CELL_SELECT_ALL,
    NumericColumns
})

export const FlashingCellChangeDuration = (FlashingColumn: IFlashingColumn, NewFlashDuration: number): FlashingCellChangeDurationAction => ({
    type: FLASHING_CELL_CHANGE_DURATION,
    FlashingColumn,
    NewFlashDuration
})

export const FlashingCellChangeUpColor = (FlashingColumn: IFlashingColumn, UpColor: string): FlashingCellChangeUpColorAction => ({
    type: FLASHING_CELL_CHANGE_UP_COLOR,
    FlashingColumn,
    UpColor
})

export const FlashingCellChangeDownColor = (FlashingColumn: IFlashingColumn, DownColor: string): FlashingCellChangeDownColorAction => ({
    type: FLASHING_CELL_CHANGE_DOWN_COLOR,
    FlashingColumn,
    DownColor
})

const initialShortcutState: FlashingCellState = {
    FlashingColumns: []
}

export const FlashingCellReducer: Redux.Reducer<FlashingCellState> = (state: FlashingCellState = initialShortcutState, action: Redux.Action): FlashingCellState => {
    switch (action.type) {

        case FLASHING_CELL_SELECT: {
            let selectedFlashingCell = (<FlashingCellSelectAction>action).FlashingColumn
            let items: Array<IFlashingColumn> = [].concat(state.FlashingColumns);
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
                FlashingColumns: items
            });
        }
        case FLASHING_CELL_SELECT_ALL: {
            let numericColumns: Array<IFlashingColumn> = (<FlashingCellSelectAllAction>action).NumericColumns;
            let shouldTurnOn = !numericColumns.every(n => n.IsLive);
            let items: Array<IFlashingColumn> = [].concat(state.FlashingColumns);
            numericColumns.forEach(column => {
                let index = items.findIndex(i => i.ColumnName == column.ColumnName);
                if (index != -1) {  // it exists
                    items[index] = Object.assign({}, column, { IsLive: shouldTurnOn })
                } else {
                    items.push(Object.assign({}, column, { IsLive: shouldTurnOn }));
                }
            })
            return Object.assign({}, state, {
                FlashingColumns: items
            });
        }
        case FLASHING_CELL_CHANGE_DURATION: {
            let actionTyped = <FlashingCellChangeDurationAction>action
            let flashingColumn = actionTyped.FlashingColumn
            let items: Array<IFlashingColumn> = [].concat(state.FlashingColumns);
            let index = items.findIndex(i => i == flashingColumn)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, flashingColumn, { FlashingCellDuration: actionTyped.NewFlashDuration })
            } else {
                items.push(Object.assign({}, flashingColumn, { FlashingCellDuration: actionTyped.NewFlashDuration }));
            }
            return Object.assign({}, state, {
                FlashingColumns: items
            });

        }
        //Jo: Not sure we need to do all that since we already have the instance..... but I'm copy pasting what's been done previously
        case FLASHING_CELL_CHANGE_UP_COLOR: {
            let actionTyped = <FlashingCellChangeUpColorAction>action
            let flashingColumn = actionTyped.FlashingColumn
            let items: Array<IFlashingColumn> = [].concat(state.FlashingColumns);
            let index = items.findIndex(i => i == flashingColumn)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, flashingColumn, { UpBackColor: actionTyped.UpColor })
            } else {
                items.push(Object.assign({}, flashingColumn, { UpBackColor: actionTyped.UpColor }));
            }
            return Object.assign({}, state, {
                FlashingColumns: items
            });

        }
        //Jo: Not sure we need to do all that since we already have the instance..... but I'm copy pasting what's been done previously
        case FLASHING_CELL_CHANGE_DOWN_COLOR: {
            let actionTyped = <FlashingCellChangeDownColorAction>action
            let flashingColumn = actionTyped.FlashingColumn
            let items: Array<IFlashingColumn> = [].concat(state.FlashingColumns);
            let index = items.findIndex(i => i == flashingColumn)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, flashingColumn, { DownBackColor: actionTyped.DownColor })
            } else {
                items.push(Object.assign({}, flashingColumn, { DownBackColor: actionTyped.DownColor }));
            }
            return Object.assign({}, state, {
                FlashingColumns: items
            });

        }
        default:
            return state
    }
}