import * as Redux from 'redux';
import { GridState } from './Interface/IState'
import { ICellInfo } from "../../Utilities/Interface/ICellInfo";
import { IColumn } from '../../Utilities/Interface/IColumn';
import { IGridSort } from '../../Utilities/Interface/IAdaptableBlotterObjects';
import { ISelectedCellInfo, ISelectedCellSummmary } from '../../Strategy/Interface/ISelectedCellsStrategy';

export const GRID_SET_COLUMNS = 'GRID_SET_COLUMNS';
export const GRID_ADD_COLUMN = 'GRID_ADD_COLUMN';
export const GRID_HIDE_COLUMN = 'GRID_HIDE_COLUMN';
export const GRID_SET_VALUE_LIKE_EDIT = 'GRID_SET_VALUE_LIKE_EDIT';
export const GRID_SELECT_COLUMN = 'GRID_SELECT_COLUMN';
export const GRID_SET_SORT = 'GRID_SET_SORT';
export const GRID_SET_SELECTED_CELLS = 'GRID_SET_SELECTED_CELLS';
export const GRID_CREATE_SELECTED_CELLS_SUMMARY = 'GRID_CREATE_SELECTED_CELLS_SUMMARY';
export const GRID_SET_SELECTED_CELLS_SUMMARY = 'GRID_SET_SELECTED_CELLS_SUMMARY';


export interface GridSetColumnsAction extends Redux.Action {
    Columns: IColumn[];
}
export interface GridAddColumnAction extends Redux.Action {
    Column: IColumn;
}
export interface GridHideColumnAction extends Redux.Action {
    ColumnId: string;
}

export interface GridSetValueLikeEditAction extends Redux.Action {
    CellInfo: ICellInfo,
    OldValue: any,
}

export interface GridSelectColumnAction extends Redux.Action {
    ColumnId: string;
}

export interface GridSetSortAction extends Redux.Action {
    GridSorts: IGridSort[];
}

export interface GridSetBlotterRestrictionsAction extends Redux.Action {
    BlotterRestrictions: string[];
}



export interface GridSetSelectedCellsAction extends Redux.Action {
    SelectedCellInfo: ISelectedCellInfo;
}

export interface GridCreateSelectedCellSummaryAction extends Redux.Action {
}

export interface GridSetSelectedCellSummaryAction extends Redux.Action {
    SelectedCellSummary: ISelectedCellSummmary
}

export const GridSetColumns = (Columns: IColumn[]): GridSetColumnsAction => ({
    type: GRID_SET_COLUMNS,
    Columns
})

export const GridAddColumn = (Column: IColumn): GridAddColumnAction => ({
    type: GRID_ADD_COLUMN,
    Column
})

export const GridHideColumn = (ColumnId: string): GridHideColumnAction => ({
    type: GRID_HIDE_COLUMN,
    ColumnId
})

export const GridSetValueLikeEdit = (CellInfo: ICellInfo, OldValue: any): GridSetValueLikeEditAction => ({
    type: GRID_SET_VALUE_LIKE_EDIT,
    CellInfo,
    OldValue
})

export const GridSelectColumn = (ColumnId: string): GridSelectColumnAction => ({
    type: GRID_SELECT_COLUMN,
    ColumnId
})

export const GridSetSort = (GridSorts: IGridSort[]): GridSetSortAction => ({
    type: GRID_SET_SORT,
    GridSorts
})


export const GridSetSelectedCells = (SelectedCellInfo: ISelectedCellInfo): GridSetSelectedCellsAction => ({
    type: GRID_SET_SELECTED_CELLS,
    SelectedCellInfo
})

export const GridCreateSelectedCellSummary = (): GridCreateSelectedCellSummaryAction => ({
    type: GRID_CREATE_SELECTED_CELLS_SUMMARY
})

export const GridSetSelectedCellSummary = (SelectedCellSummary: ISelectedCellSummmary): GridSetSelectedCellSummaryAction => ({
    type: GRID_SET_SELECTED_CELLS_SUMMARY,
    SelectedCellSummary
})


const initialGridState: GridState = {
    Columns: [],
    GridSorts: [],
    SelectedCellInfo: null,
    SelectedCellSummary: null
}

export const GridReducer: Redux.Reducer<GridState> = (state: GridState = initialGridState, action: Redux.Action): GridState => {
    switch (action.type) {
        case GRID_SET_COLUMNS:
            return Object.assign({}, state, { Columns: [].concat((<GridSetColumnsAction>action).Columns) })
        case GRID_ADD_COLUMN:
            let actionTypedAddUpdate = (<GridAddColumnAction>action)
            let columns = [].concat(state.Columns)
            columns.push(actionTypedAddUpdate.Column)
            return Object.assign({}, state, { Columns: columns })
        case GRID_SET_SORT:
            return Object.assign({}, state, { GridSorts: (<GridSetSortAction>action).GridSorts })
         case GRID_SET_SELECTED_CELLS:
            return Object.assign({}, state, { SelectedCellInfo: (<GridSetSelectedCellsAction>action).SelectedCellInfo })
        case GRID_SET_SELECTED_CELLS_SUMMARY:
            return Object.assign({}, state, { SelectedCellSummary: (<GridSetSelectedCellSummaryAction>action).SelectedCellSummary })
          default:
            return state
    }
}