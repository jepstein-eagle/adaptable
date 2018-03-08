import * as Redux from 'redux';
import { GridState } from './Interface/IState'
import { ICellInfo } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';

export const GRID_SET_COLUMNS = 'GRID_SET_COLUMNS';
export const GRID_HIDE_COLUMN = 'GRID_HIDE_COLUMN';
export const GRID_SET_VALUE_LIKE_EDIT = 'GRID_SET_VALUE_LIKE_EDIT';

export interface GridSetColumnsAction extends Redux.Action {
    Columns: IColumn[];
}
export interface GridHideColumnAction extends Redux.Action {
    ColumnId: string;
}

export interface GridSetValueLikeEditAction extends Redux.Action {
    CellInfo: ICellInfo,
    OldValue: any,
 
}
export const GridSetColumns = (Columns: IColumn[]): GridSetColumnsAction => ({
    type: GRID_SET_COLUMNS,
    Columns
})

export const GridHideColumn = (ColumnId: string): GridHideColumnAction => ({
    type: GRID_HIDE_COLUMN,
    ColumnId
})

export const GridSetValueLikeEdit = (CellInfo: ICellInfo, OldValue: any): GridSetValueLikeEditAction => ({
    type: GRID_SET_VALUE_LIKE_EDIT,
   CellInfo,
    OldValue,
   
})


const initialGridState: GridState = {
    Columns: []
}

export const GridReducer: Redux.Reducer<GridState> = (state: GridState = initialGridState, action: Redux.Action): GridState => {
    switch (action.type) {
        case GRID_SET_COLUMNS:
            return { Columns: [].concat((<GridSetColumnsAction>action).Columns) }
        default:
            return state
    }
}