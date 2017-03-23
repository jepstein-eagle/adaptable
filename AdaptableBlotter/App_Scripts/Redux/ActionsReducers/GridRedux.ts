/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { GridState } from './interface/IState'
import { IColumn } from '../../Core/interface/IAdaptableBlotter'
import { ICellInfo } from '../../Core/interface/IStrategy'

const SET_GRIDCOLUMNS = 'SET_GRIDCOLUMNS';
export const HIDE_COLUMN = 'HIDE_COLUMN';
export const SET_GRIDVALUE_LIKE_EDIT = 'SET_GRIDVALUE_LIKE_EDIT';

export interface SetColumnsAction extends Redux.Action {
    Columns: IColumn[];
}
export interface HideColumnAction extends Redux.Action {
    ColumnId: string;
}

export interface SetValueAction extends Redux.Action {
    CellInfo: ICellInfo,
    OldValue: any,
 
}
export const SetColumns = (Columns: IColumn[]): SetColumnsAction => ({
    type: SET_GRIDCOLUMNS,
    Columns
})

export const HideColumn = (ColumnId: string): HideColumnAction => ({
    type: HIDE_COLUMN,
    ColumnId
})

export const SetValueLikeEdit = (CellInfo: ICellInfo, OldValue: any): SetValueAction => ({
    type: SET_GRIDVALUE_LIKE_EDIT,
   CellInfo,
    OldValue,
   
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