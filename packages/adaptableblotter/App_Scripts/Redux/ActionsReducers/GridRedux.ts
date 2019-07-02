import * as Redux from 'redux';
import { GridState } from '../../PredefinedConfig/InternalState/GridState';
import { ICellInfo } from '../../Utilities/Interface/ICellInfo';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { ISelectedCellInfo } from '../../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { ICellSummmary } from '../../Utilities/Interface/SelectedCell/ICellSummmary';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { ColumnSort } from '../../PredefinedConfig/RunTimeState/LayoutState';

export const GRID_SET_COLUMNS = 'GRID_SET_COLUMNS';
export const GRID_ADD_COLUMN = 'GRID_ADD_COLUMN';
export const GRID_EDIT_COLUMN = 'GRID_EDIT_COLUMN';
export const GRID_HIDE_COLUMN = 'GRID_HIDE_COLUMN';
export const GRID_SET_VALUE_LIKE_EDIT = 'GRID_SET_VALUE_LIKE_EDIT';
export const GRID_SELECT_COLUMN = 'GRID_SELECT_COLUMN';
export const GRID_SET_SORT = 'GRID_SET_SORT';
export const GRID_SET_SELECTED_CELLS = 'GRID_SET_SELECTED_CELLS';
export const GRID_CREATE_CELLS_SUMMARY = 'GRID_CREATE_CELLS_SUMMARY';
export const GRID_SET_CELLS_SUMMARY = 'GRID_SET_CELLS_SUMMARY';
export const GRID_QUICK_FILTER_BAR_SHOW = 'GRID_QUICK_FILTER_BAR_SHOW';
export const GRID_QUICK_FILTER_BAR_HIDE = 'GRID_QUICK_FILTER_BAR_HIDE';
export const FILTER_FORM_HIDE = 'FILTER_FORM_HIDE';

export interface GridSetColumnsAction extends Redux.Action {
  Columns: IColumn[];
}
export interface GridAddColumnAction extends Redux.Action {
  Column: IColumn;
}
export interface GridEditColumnAction extends Redux.Action {
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
  ColumnSorts: ColumnSort[];
}

export interface GridSetBlotterRestrictionsAction extends Redux.Action {
  BlotterRestrictions: string[];
}

export interface GridSetSelectedCellsAction extends Redux.Action {
  SelectedCellInfo: ISelectedCellInfo;
}

export interface GridCreateCellSummaryAction extends Redux.Action {}

export interface GridSetCellSummaryAction extends Redux.Action {
  CellSummary: ICellSummmary;
}

export interface QuickFilterBarShowAction extends Redux.Action {}

export interface QuickFilterBarHideAction extends Redux.Action {}

export interface FilterFormHideAction extends Redux.Action {}

export const GridSetColumns = (Columns: IColumn[]): GridSetColumnsAction => ({
  type: GRID_SET_COLUMNS,
  Columns,
});

export const GridAddColumn = (Column: IColumn): GridAddColumnAction => ({
  type: GRID_ADD_COLUMN,
  Column,
});

export const GridEditColumn = (Column: IColumn): GridEditColumnAction => ({
  type: GRID_EDIT_COLUMN,
  Column,
});

export const GridHideColumn = (ColumnId: string): GridHideColumnAction => ({
  type: GRID_HIDE_COLUMN,
  ColumnId,
});

export const GridSetValueLikeEdit = (
  CellInfo: ICellInfo,
  OldValue: any
): GridSetValueLikeEditAction => ({
  type: GRID_SET_VALUE_LIKE_EDIT,
  CellInfo,
  OldValue,
});

export const GridSelectColumn = (ColumnId: string): GridSelectColumnAction => ({
  type: GRID_SELECT_COLUMN,
  ColumnId,
});

export const GridSetSort = (ColumnSorts: ColumnSort[]): GridSetSortAction => ({
  type: GRID_SET_SORT,
  ColumnSorts,
});

export const GridSetSelectedCells = (
  SelectedCellInfo: ISelectedCellInfo
): GridSetSelectedCellsAction => ({
  type: GRID_SET_SELECTED_CELLS,
  SelectedCellInfo,
});

export const GridCreateCellSummary = (): GridCreateCellSummaryAction => ({
  type: GRID_CREATE_CELLS_SUMMARY,
});

export const GridSetCellSummary = (CellSummary: ICellSummmary): GridSetCellSummaryAction => ({
  type: GRID_SET_CELLS_SUMMARY,
  CellSummary,
});

export const QuickFilterBarShow = (): QuickFilterBarShowAction => ({
  type: GRID_QUICK_FILTER_BAR_SHOW,
});

export const QuickFilterBarHide = (): QuickFilterBarHideAction => ({
  type: GRID_QUICK_FILTER_BAR_HIDE,
});

export const FilterFormHide = (): FilterFormHideAction => ({
  type: FILTER_FORM_HIDE,
});

const initialGridState: GridState = {
  Columns: EMPTY_ARRAY,
  ColumnSorts: EMPTY_ARRAY,
  SelectedCellInfo: null,
  CellSummary: null,
  IsQuickFilterActive: false,
};

export const GridReducer: Redux.Reducer<GridState> = (
  state: GridState = initialGridState,
  action: Redux.Action
): GridState => {
  switch (action.type) {
    case GRID_SET_COLUMNS:
      return Object.assign({}, state, {
        Columns: [].concat((<GridSetColumnsAction>action).Columns),
      });
    case GRID_ADD_COLUMN:
      let actionTypedAdd = <GridAddColumnAction>action;
      let columns = [].concat(state.Columns);
      columns.push(actionTypedAdd.Column);
      return Object.assign({}, state, { Columns: columns });
    case GRID_EDIT_COLUMN:
      const actioncolumn: IColumn = (action as GridEditColumnAction).Column;
      return {
        ...state,
        Columns: state.Columns.map(abObject =>
          abObject.Uuid === actioncolumn.Uuid ? actioncolumn : abObject
        ),
      };

    case GRID_SET_SORT:
      return Object.assign({}, state, { ColumnSorts: (<GridSetSortAction>action).ColumnSorts });
    case GRID_SET_SELECTED_CELLS:
      return Object.assign({}, state, {
        SelectedCellInfo: (<GridSetSelectedCellsAction>action).SelectedCellInfo,
      });
    case GRID_SET_CELLS_SUMMARY:
      return Object.assign({}, state, {
        CellSummary: (<GridSetCellSummaryAction>action).CellSummary,
      });
    case GRID_QUICK_FILTER_BAR_SHOW:
      return Object.assign({}, state, { IsQuickFilterActive: true });
    case GRID_QUICK_FILTER_BAR_HIDE:
      return Object.assign({}, state, { IsQuickFilterActive: false });

    default:
      return state;
  }
};
