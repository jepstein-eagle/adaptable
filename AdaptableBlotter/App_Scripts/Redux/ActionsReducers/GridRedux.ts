/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import {GridState} from './interface/IState'
import {IColumn} from '../../Core/interface/IAdaptableBlotter'
const SET_GRIDCOLUMNS = 'SET_GRIDCOLUMNS';

export interface SetColumnsAction extends Redux.Action {
    Columns: IColumn[];
}

export const SetColumns = (Columns: IColumn[]): SetColumnsAction => ({
    type: SET_GRIDCOLUMNS,
    Columns
})

const initialGridState: GridState = {
    Columns: []
}

export const GridReducer: Redux.Reducer<GridState> = (state: GridState = initialGridState, action: Redux.Action): GridState => {
    switch (action.type) {
        case SET_GRIDCOLUMNS:
            return { Columns: (<SetColumnsAction>action).Columns }
        default:
            return state
    }
}