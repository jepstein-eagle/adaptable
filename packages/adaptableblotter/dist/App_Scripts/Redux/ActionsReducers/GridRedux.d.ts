import * as Redux from 'redux';
import { GridState } from './Interface/IState';
import { ICellInfo } from "../../Utilities/Interface/ICellInfo";
import { IColumn } from '../../Utilities/Interface/IColumn';
import { IGridSort } from "../../Utilities/Interface/IGridSort";
import { ISelectedCellInfo } from "../../Utilities/Interface/SelectedCell/ISelectedCellInfo";
import { ISelectedCellSummmary } from "../../Utilities/Interface/SelectedCell/ISelectedCellSummmary";
export declare const GRID_SET_COLUMNS = "GRID_SET_COLUMNS";
export declare const GRID_ADD_COLUMN = "GRID_ADD_COLUMN";
export declare const GRID_HIDE_COLUMN = "GRID_HIDE_COLUMN";
export declare const GRID_SET_VALUE_LIKE_EDIT = "GRID_SET_VALUE_LIKE_EDIT";
export declare const GRID_SELECT_COLUMN = "GRID_SELECT_COLUMN";
export declare const GRID_SET_SORT = "GRID_SET_SORT";
export declare const GRID_SET_SELECTED_CELLS = "GRID_SET_SELECTED_CELLS";
export declare const GRID_CREATE_SELECTED_CELLS_SUMMARY = "GRID_CREATE_SELECTED_CELLS_SUMMARY";
export declare const GRID_SET_SELECTED_CELLS_SUMMARY = "GRID_SET_SELECTED_CELLS_SUMMARY";
export declare const GRID_FLOATING_FILTER_BAR_SHOW = "GRID_FLOATING_FILTER_BAR_SHOW";
export declare const GRID_FLOATING_FILTER_BAR_HIDE = "GRID_FLOATING_FILTER_BAR_HIDE";
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
export interface GridSetSelectedCellsAction extends Redux.Action {
    SelectedCellInfo: ISelectedCellInfo;
}
export interface GridCreateSelectedCellSummaryAction extends Redux.Action {
}
export interface GridSetSelectedCellSummaryAction extends Redux.Action {
    SelectedCellSummary: ISelectedCellSummmary;
}
export interface FloatingFilterBarShowAction extends Redux.Action {
}
export interface FloatingFilterBarHideAction extends Redux.Action {
}
export declare const GridSetColumns: (Columns: IColumn[]) => GridSetColumnsAction;
export declare const GridAddColumn: (Column: IColumn) => GridAddColumnAction;
export declare const GridHideColumn: (ColumnId: string) => GridHideColumnAction;
export declare const GridSetValueLikeEdit: (CellInfo: ICellInfo, OldValue: any) => GridSetValueLikeEditAction;
export declare const GridSelectColumn: (ColumnId: string) => GridSelectColumnAction;
export declare const GridSetSort: (GridSorts: IGridSort[]) => GridSetSortAction;
export declare const GridSetSelectedCells: (SelectedCellInfo: ISelectedCellInfo) => GridSetSelectedCellsAction;
export declare const GridCreateSelectedCellSummary: () => GridCreateSelectedCellSummaryAction;
export declare const GridSetSelectedCellSummary: (SelectedCellSummary: ISelectedCellSummmary) => GridSetSelectedCellSummaryAction;
export declare const FloatingilterBarShow: () => FloatingFilterBarShowAction;
export declare const FloatingFilterBarHide: () => FloatingFilterBarHideAction;
export declare const GridReducer: Redux.Reducer<GridState>;
