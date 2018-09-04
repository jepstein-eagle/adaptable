import * as Redux from 'redux';
import { GridState } from './Interface/IState'
import { ICellInfo, ISystemStatus } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
import { IGridSort } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { ISelectedCellInfo } from '../../Strategy/Interface/ISelectedCellsStrategy';
import { PinnedColumnDirection } from '../../Core/Enums';

export const GRID_SET_COLUMNS = 'GRID_SET_COLUMNS';
export const GRID_ADD_COLUMN = 'GRID_ADD_COLUMN';
export const GRID_HIDE_COLUMN = 'GRID_HIDE_COLUMN';
export const GRID_SET_VALUE_LIKE_EDIT = 'GRID_SET_VALUE_LIKE_EDIT';
export const GRID_SELECT_COLUMN = 'GRID_SELECT_COLUMN';
export const GRID_SET_SORT = 'GRID_SET_SORT';
export const GRID_SET_BLOTTER_RESTRICTIONS = 'GRID_SET_BLOTTER_RESTRICTIONS';
export const GRID_SET_SYSTEM_STATUS = 'GRID_SET_SYSTEM_STATUS';
export const GRID_CLEAR_SYSTEM_STATUS = 'GRID_CLEAR_SYSTEM_STATUS';
export const GRID_SET_SELECTED_CELLS = 'GRID_SET_SELECTED_CELLS';
export const GRID_SET_PINNED_COLUMN = 'GRID_SET_PINNED_COLUMN';
export const GRID_DELETE_PINNED_COLUMN = 'GRID_DELETE_PINNED_COLUMN';


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

export interface GridSetSystemStatusAction extends Redux.Action {
    SystemStatus: ISystemStatus;
}

export interface GridClearSystemStatusAction extends Redux.Action {

}

export interface GridSetSelectedCellsAction extends Redux.Action {
    SelectedCellInfo: ISelectedCellInfo;
}

export interface GridSetPinnedColumnAction extends Redux.Action {
    ColumnId: string;
    PinnedColumnDirection: PinnedColumnDirection;
}

export interface GridDeletePinnedColumnAction extends Redux.Action {
    ColumnId: string;
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

export const GridSetBlotterRestrictions = (BlotterRestrictions: string[]): GridSetBlotterRestrictionsAction => ({
    type: GRID_SET_BLOTTER_RESTRICTIONS,
    BlotterRestrictions
})

export const GridSetSystemStatus = (SystemStatus: ISystemStatus): GridSetSystemStatusAction => ({
    type: GRID_SET_SYSTEM_STATUS,
    SystemStatus
})

export const GridClearSystemStatus = (): GridClearSystemStatusAction => ({
    type: GRID_CLEAR_SYSTEM_STATUS,
})

export const GridSetSelectedCells = (SelectedCellInfo: ISelectedCellInfo): GridSetSelectedCellsAction => ({
    type: GRID_SET_SELECTED_CELLS,
    SelectedCellInfo
})

export const GridSetPinnedColumn = (ColumnId: string, PinnedColumnDirection: PinnedColumnDirection): GridSetPinnedColumnAction => ({
    type: GRID_SET_PINNED_COLUMN,
    ColumnId,
    PinnedColumnDirection
})

export const GridDeletePinnedColumn = (ColumnId: string): GridDeletePinnedColumnAction => ({
    type: GRID_DELETE_PINNED_COLUMN,
    ColumnId
})

const initialGridState: GridState = {
    Columns: [],
    GridSorts: [],
    BlotterRestrictions: [],
    SystemStatus: { StatusMessage: "", StatusColour: "Green" },
    SelectedCellInfo: null,
    LeftPinnedColumns: [],
    RightPinnedColumns: []
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
        case GRID_SET_BLOTTER_RESTRICTIONS:
            let actionTypedRestrictions = <GridSetBlotterRestrictionsAction>action;
            let blotterRestrictions = actionTypedRestrictions.BlotterRestrictions
            return Object.assign({}, state, { BlotterRestrictions: blotterRestrictions })
        case GRID_SET_SYSTEM_STATUS:
            return Object.assign({}, state, { SystemStatus: (<GridSetSystemStatusAction>action).SystemStatus })
        case GRID_CLEAR_SYSTEM_STATUS:
            return Object.assign({}, state, { SystemStatus: { StatusMessage: "", StatusColour: "Green" } })
        case GRID_SET_SELECTED_CELLS:
            return Object.assign({}, state, { SelectedCellInfo: (<GridSetSelectedCellsAction>action).SelectedCellInfo })
        case GRID_SET_PINNED_COLUMN:
            let actionTypedSetColumn = <GridSetPinnedColumnAction>action;
            let columnToAdd = actionTypedSetColumn.ColumnId;
            let pinnedColumnDirection: PinnedColumnDirection = actionTypedSetColumn.PinnedColumnDirection;
            let leftPinnedColumns = [].concat(state.LeftPinnedColumns)
            let rightPinnedColumns = [].concat(state.RightPinnedColumns)
            if (pinnedColumnDirection == PinnedColumnDirection.Left) {
                leftPinnedColumns.push(columnToAdd)
                let existingindex = rightPinnedColumns.findIndex(a => a == columnToAdd)
                if (existingindex > -1) {
                    rightPinnedColumns.splice(existingindex, 1);
                }
            } else {
                rightPinnedColumns.push(columnToAdd)
                let existingindex = leftPinnedColumns.findIndex(a => a == columnToAdd)
                if (existingindex > -1) {
                    leftPinnedColumns.splice(existingindex, 1);
                }
            }
            console.log("after add")
            console.log("left cols: " + leftPinnedColumns)
            console.log("right cols: " + rightPinnedColumns)
            return Object.assign({}, state, { LeftPinnedColumns: leftPinnedColumns, RightPinnedColumns: rightPinnedColumns })
        case GRID_DELETE_PINNED_COLUMN:
            let actionTypedDeleteColumn = <GridDeletePinnedColumnAction>action;
            let columnToDelete = actionTypedDeleteColumn.ColumnId;
            let leftPinnedColumnsDelete = [].concat(state.LeftPinnedColumns)
            let rightPinnedColumnsDelete = [].concat(state.RightPinnedColumns)

            let existingindex = leftPinnedColumnsDelete.findIndex(a => a == columnToDelete)
            if (existingindex > -1) {
                leftPinnedColumnsDelete.splice(existingindex, 1);
            } else {
                existingindex = rightPinnedColumns.findIndex(a => a == columnToDelete)
                if (existingindex > -1) {
                    rightPinnedColumns.splice(existingindex, 1);
                }
            }
            console.log("after delete")
            console.log("left cols: " + leftPinnedColumnsDelete)
            console.log("right cols: " + rightPinnedColumnsDelete)
            return Object.assign({}, state, { LeftPinnedColumns: leftPinnedColumnsDelete, RightPinnedColumns: rightPinnedColumnsDelete })
        default:
            return state
    }
}