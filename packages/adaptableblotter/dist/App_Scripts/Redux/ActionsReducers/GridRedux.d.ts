import * as Redux from 'redux';
import { GridState } from './Interface/IState';
import { ICellInfo, ISystemStatus } from '../../Core/Interface/Interfaces';
import { IColumn } from '../../Core/Interface/IColumn';
import { IGridSort } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { ISelectedCellInfo } from '../../Strategy/Interface/ISelectedCellsStrategy';
import { PinnedColumnDirection } from '../../Core/Enums';
export declare const GRID_SET_COLUMNS = "GRID_SET_COLUMNS";
export declare const GRID_ADD_COLUMN = "GRID_ADD_COLUMN";
export declare const GRID_HIDE_COLUMN = "GRID_HIDE_COLUMN";
export declare const GRID_SET_VALUE_LIKE_EDIT = "GRID_SET_VALUE_LIKE_EDIT";
export declare const GRID_SELECT_COLUMN = "GRID_SELECT_COLUMN";
export declare const GRID_SET_SORT = "GRID_SET_SORT";
export declare const GRID_SET_BLOTTER_RESTRICTIONS = "GRID_SET_BLOTTER_RESTRICTIONS";
export declare const GRID_SET_SYSTEM_STATUS = "GRID_SET_SYSTEM_STATUS";
export declare const GRID_CLEAR_SYSTEM_STATUS = "GRID_CLEAR_SYSTEM_STATUS";
export declare const GRID_SET_SELECTED_CELLS = "GRID_SET_SELECTED_CELLS";
export declare const GRID_SET_PINNED_COLUMN = "GRID_SET_PINNED_COLUMN";
export declare const GRID_DELETE_PINNED_COLUMN = "GRID_DELETE_PINNED_COLUMN";
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
    CellInfo: ICellInfo;
    OldValue: any;
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
export declare const GridSetColumns: (Columns: IColumn[]) => GridSetColumnsAction;
export declare const GridAddColumn: (Column: IColumn) => GridAddColumnAction;
export declare const GridHideColumn: (ColumnId: string) => GridHideColumnAction;
export declare const GridSetValueLikeEdit: (CellInfo: ICellInfo, OldValue: any) => GridSetValueLikeEditAction;
export declare const GridSelectColumn: (ColumnId: string) => GridSelectColumnAction;
export declare const GridSetSort: (GridSorts: IGridSort[]) => GridSetSortAction;
export declare const GridSetBlotterRestrictions: (BlotterRestrictions: string[]) => GridSetBlotterRestrictionsAction;
export declare const GridSetSystemStatus: (SystemStatus: ISystemStatus) => GridSetSystemStatusAction;
export declare const GridClearSystemStatus: () => GridClearSystemStatusAction;
export declare const GridSetSelectedCells: (SelectedCellInfo: ISelectedCellInfo) => GridSetSelectedCellsAction;
export declare const GridSetPinnedColumn: (ColumnId: string, PinnedColumnDirection: PinnedColumnDirection) => GridSetPinnedColumnAction;
export declare const GridDeletePinnedColumn: (ColumnId: string) => GridDeletePinnedColumnAction;
export declare const GridReducer: Redux.Reducer<GridState>;
