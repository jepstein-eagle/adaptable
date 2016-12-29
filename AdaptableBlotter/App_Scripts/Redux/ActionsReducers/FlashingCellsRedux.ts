/// <reference path="../../../typings/index.d.ts" />
import { FlashingCellState } from './Interface/IState';
import { IFlashingColumn, IFlashingCellDuration } from '../../Core/Interface/IFlashingCellsStrategy';

export const FLASHING_CELL_SELECT = 'FLASHING_CELL_SELECT';
export const CHANGE_FLASHING_DURATION = 'CHANGE_FLASHING_DURATION';
export const FLASHING_CELL_SELECT_ALL = 'FLASHING_CELL_SELECT_ALL';
export const FLASHING_SET_UP_COLOR = 'FLASHING_SET_UP_COLOR';
export const FLASHING_SET_DOWN_COLOR = 'FLASHING_SET_DOWN_COLOR';


export interface FlashingColumnSelectAction extends Redux.Action {
    FlashingColumn: IFlashingColumn
}

export interface FlashingColumnSelectAllAction extends Redux.Action {
    NumericColumns: IFlashingColumn[],
}

export interface FlashingColumnDurationChangeAction extends Redux.Action {
    FlashingColumn: IFlashingColumn,
    NewFlashDuration: IFlashingCellDuration;
}

export interface FlashingColumnUpColorChangeAction extends Redux.Action {
    FlashingColumn: IFlashingColumn,
    UpColor: string;
}

export interface FlashingColumnDownColorChangeAction extends Redux.Action {
    FlashingColumn: IFlashingColumn,
    DownColor: string;
}

export const SelectFlashingCellColumn = (FlashingColumn: IFlashingColumn): FlashingColumnSelectAction => ({
    type: FLASHING_CELL_SELECT,
    FlashingColumn
})

export const SelectAllFlashingCellColumn = (NumericColumns: IFlashingColumn[]): FlashingColumnSelectAllAction => ({
    type: FLASHING_CELL_SELECT_ALL,
    NumericColumns
})

export const ChangeFlashingDuration = (FlashingColumn: IFlashingColumn, NewFlashDuration: IFlashingCellDuration): FlashingColumnDurationChangeAction => ({
    type: CHANGE_FLASHING_DURATION,
    FlashingColumn,
    NewFlashDuration
})

export const ChangeFlashingUpColor = (FlashingColumn: IFlashingColumn, UpColor: string): FlashingColumnUpColorChangeAction => ({
    type: FLASHING_SET_UP_COLOR,
    FlashingColumn,
    UpColor
})

export const ChangeFlashingDownColor = (FlashingColumn: IFlashingColumn, DownColor: string): FlashingColumnDownColorChangeAction => ({
    type: FLASHING_SET_DOWN_COLOR,
    FlashingColumn,
    DownColor
})

const initialShortcutState: FlashingCellState = {
    FlashingColumns: []
}

export const FlashingCellReducer: Redux.Reducer<FlashingCellState> = (state: FlashingCellState = initialShortcutState, action: Redux.Action): FlashingCellState => {
    switch (action.type) {

        case FLASHING_CELL_SELECT: {
            let selectedFlashingCell = (<FlashingColumnSelectAction>action).FlashingColumn
            var items: Array<IFlashingColumn> = [].concat(state.FlashingColumns);
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
            var numericColumns: Array<IFlashingColumn> = (<FlashingColumnSelectAllAction>action).NumericColumns;
            var shouldTurnOn = !numericColumns.every(n => n.IsLive);
            var items: Array<IFlashingColumn> = [].concat(state.FlashingColumns);
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
        case CHANGE_FLASHING_DURATION: {
            let actionTyped = <FlashingColumnDurationChangeAction>action
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
        case FLASHING_SET_UP_COLOR: {
            let actionTyped = <FlashingColumnUpColorChangeAction>action
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
        case FLASHING_SET_DOWN_COLOR: {
            let actionTyped = <FlashingColumnDownColorChangeAction>action
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