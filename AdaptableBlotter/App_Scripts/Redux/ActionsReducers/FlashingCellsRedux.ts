/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { FlashingCellState } from './Interface/IState';
import { IFlashingColumn } from '../../Core/Interface/IFlashingCellsStrategy';
import { FlashingCellDuration } from '../../Core/Enums';


export const FLASHING_CELL_SELECT = 'FLASHING_CELL_SELECT';
export const CHANGE_FLASHING_DURATION = 'CHANGE_FLASHING_DURATION';


export interface FlashingColumnSelectAction extends Redux.Action {
    FlashingColumn: IFlashingColumn
}

export interface FlashingColumnDurationChangeAction extends Redux.Action {
    FlashingColumn: IFlashingColumn,
    NewFlashDuration: any;
}

export const SelectFlashingCellColumn = (FlashingColumn: IFlashingColumn): FlashingColumnSelectAction => ({
    type: FLASHING_CELL_SELECT,
    FlashingColumn
})

export const ChangeFlashingDuration = (FlashingColumn: IFlashingColumn, NewFlashDuration: FlashingCellDuration): FlashingColumnDurationChangeAction => ({
    type: CHANGE_FLASHING_DURATION,
    FlashingColumn,
    NewFlashDuration
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
        case CHANGE_FLASHING_DURATION: {
            let actionTyped = <FlashingColumnDurationChangeAction>action
            let flashingColumn = actionTyped.FlashingColumn
            let items: Array<IFlashingColumn> = [].concat(state.FlashingColumns);
            let index = items.findIndex(i=> i==flashingColumn)
            if (index != -1) {  // it exists
                items[index] = Object.assign({}, flashingColumn, { FlashingCellDuration: actionTyped.NewFlashDuration })
            } else {
                items.push(Object.assign({}, flashingColumn, { FlashingCellDuration: actionTyped.NewFlashDuration }));
            }
            return Object.assign({}, state, {
                FlashingColumns: items
            });

        }
        default:
            return state
    }
}