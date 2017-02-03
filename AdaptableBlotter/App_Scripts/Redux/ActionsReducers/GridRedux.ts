/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { GridState } from './interface/IState'
import { IColumn } from '../../Core/interface/IAdaptableBlotter'
const SET_GRIDCOLUMNS = 'SET_GRIDCOLUMNS';
export const SET_GRIDVALUE_LIKE_EDIT = 'SET_GRIDVALUE_LIKE_EDIT';

export interface SetColumnsAction extends Redux.Action {
    Columns: IColumn[];
}

export interface SetValueAction extends Redux.Action {
    PrimaryKey: any,
    ColumnId: string,
    OldValue: any,
    NewValue: any
}
export const SetColumns = (Columns: IColumn[]): SetColumnsAction => ({
    type: SET_GRIDCOLUMNS,
    Columns
})

export const SetValueLikeEdit = (PrimaryKey: any, ColumnId: string, OldValue: any, NewValue: any): SetValueAction => ({
    type: SET_GRIDVALUE_LIKE_EDIT,
    PrimaryKey,
    ColumnId,
    OldValue,
    NewValue
})


const initialGridState: GridState = {
    Columns: []
}

export const GridReducer: Redux.Reducer<GridState> = (state: GridState = initialGridState, action: Redux.Action): GridState => {
    switch (action.type) {
        case SET_GRIDCOLUMNS:
            return { Columns: [].concat((<SetColumnsAction>action).Columns) }
        default:
            return state
    }
}