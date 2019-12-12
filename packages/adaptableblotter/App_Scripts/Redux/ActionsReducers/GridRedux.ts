import * as Redux from 'redux';
import { GridState } from '../../PredefinedConfig/GridState';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { ICellSummmary } from '../../Utilities/Interface/Selection/ICellSummmary';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { ColumnSort } from '../../PredefinedConfig/LayoutState';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { AdaptableBlotterMenuItem } from '../../PredefinedConfig/Common/Menu';
import { DataChangedInfo } from '../../BlotterOptions/CommonObjects/DataChangedInfo';

export const GRID_SELECT_COLUMN = 'GRID_SELECT_COLUMN';
export const GRID_SET_COLUMNS = 'GRID_SET_COLUMNS';
export const GRID_ADD_COLUMN = 'GRID_ADD_COLUMN';
export const GRID_EDIT_COLUMN = 'GRID_EDIT_COLUMN';
export const GRID_HIDE_COLUMN = 'GRID_HIDE_COLUMN';
export const GRID_SET_VALUE_LIKE_EDIT = 'GRID_SET_VALUE_LIKE_EDIT';
export const GRID_SET_VALUE_LIKE_EDIT_BATCH = 'GRID_SET_VALUE_LIKE_EDIT_BATCH';
export const GRID_SET_SORT = 'GRID_SET_SORT';
export const GRID_SET_SELECTED_CELLS = 'GRID_SET_SELECTED_CELLS';
export const GRID_SET_SELECTED_ROWS = 'GRID_SET_SELECTED_ROWS';
export const GRID_CREATE_CELLS_SUMMARY = 'GRID_CREATE_CELLS_SUMMARY';
export const GRID_SET_CELLS_SUMMARY = 'GRID_SET_CELLS_SUMMARY';
export const GRID_QUICK_FILTER_BAR_SHOW = 'GRID_QUICK_FILTER_BAR_SHOW';
export const GRID_QUICK_FILTER_BAR_HIDE = 'GRID_QUICK_FILTER_BAR_HIDE';
export const GRID_REFRESH_CELLS = 'GRID_REFRESH_CELLS';
export const FILTER_FORM_HIDE = 'FILTER_FORM_HIDE';
export const SET_MAIN_MENUITEMS = 'SET_MAIN_MENUITEMS';
export const SET_GLUE42_ON = 'SET_GLUE42_ON';
export const SET_GLUE42_OFF = 'SET_GLUE42_OFF';
export const SET_IPUSHPULL_ON = 'SET_IPUSHPULL_ON';
export const SET_IPUSHPULL_OFF = 'SET_IPUSHPULL_OFF';
export const SET_PIVOT_MODE_ON = 'SET_PIVOT_MODE_ON';
export const SET_PIVOT_MODE_OFF = 'SET_PIVOT_MODE_OFF';

export interface GridSetColumnsAction extends Redux.Action {
  Columns: AdaptableBlotterColumn[];
}
export interface GridAddColumnAction extends Redux.Action {
  Column: AdaptableBlotterColumn;
}
export interface GridEditColumnAction extends Redux.Action {
  Column: AdaptableBlotterColumn;
}
export interface GridHideColumnAction extends Redux.Action {
  ColumnId: string;
}

export interface GridSetValueLikeEditAction extends Redux.Action {
  DataChangedInfo: DataChangedInfo;
}

export interface GridSetValueLikeEditBatchAction extends Redux.Action {
  DataChangedInfoBatch: DataChangedInfo[];
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
  SelectedCellInfo: SelectedCellInfo;
}

export interface GridSetSelectedRowsAction extends Redux.Action {
  SelectedRowInfo: SelectedRowInfo;
}

export interface GridCreateCellSummaryAction extends Redux.Action {}

export interface GridSetCellSummaryAction extends Redux.Action {
  CellSummary: ICellSummmary;
}

export interface GridRefreshCellsAction extends Redux.Action {
  rows: any[];
  columnIds: string[];
}

export interface QuickFilterBarShowAction extends Redux.Action {}

export interface QuickFilterBarHideAction extends Redux.Action {}

export interface FilterFormHideAction extends Redux.Action {}

export interface SetMainMenuItemsAction extends Redux.Action {
  MenuItems: AdaptableBlotterMenuItem[];
}

export interface SetGlue42OnAction extends Redux.Action {}

export interface SetGlue42OffAction extends Redux.Action {}

export interface SetIPushPullOnAction extends Redux.Action {}

export interface SetIPushPullOffAction extends Redux.Action {}

export interface SetPivotModeOnAction extends Redux.Action {}

export interface SetPivotModeOffAction extends Redux.Action {}

export const GridSetColumns = (Columns: AdaptableBlotterColumn[]): GridSetColumnsAction => ({
  type: GRID_SET_COLUMNS,
  Columns,
});

export const GridAddColumn = (Column: AdaptableBlotterColumn): GridAddColumnAction => ({
  type: GRID_ADD_COLUMN,
  Column,
});

export const GridEditColumn = (Column: AdaptableBlotterColumn): GridEditColumnAction => ({
  type: GRID_EDIT_COLUMN,
  Column,
});

export const GridHideColumn = (ColumnId: string): GridHideColumnAction => ({
  type: GRID_HIDE_COLUMN,
  ColumnId,
});

export const GridSetValueLikeEdit = (
  DataChangedInfo: DataChangedInfo
): GridSetValueLikeEditAction => ({
  type: GRID_SET_VALUE_LIKE_EDIT,
  DataChangedInfo,
});

export const GridSetValueLikeEditBatch = (
  DataChangedInfoBatch: DataChangedInfo[]
): GridSetValueLikeEditBatchAction => ({
  type: GRID_SET_VALUE_LIKE_EDIT_BATCH,
  DataChangedInfoBatch,
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
  SelectedCellInfo: SelectedCellInfo
): GridSetSelectedCellsAction => ({
  type: GRID_SET_SELECTED_CELLS,
  SelectedCellInfo,
});

export const GridSetSelectedRows = (
  SelectedRowInfo: SelectedRowInfo
): GridSetSelectedRowsAction => ({
  type: GRID_SET_SELECTED_ROWS,
  SelectedRowInfo,
});

export const GridCreateCellSummary = (): GridCreateCellSummaryAction => ({
  type: GRID_CREATE_CELLS_SUMMARY,
});

export const GridSetCellSummary = (CellSummary: ICellSummmary): GridSetCellSummaryAction => ({
  type: GRID_SET_CELLS_SUMMARY,
  CellSummary,
});

export const GridRefreshCells = (rows: any[], columnIds: string[]): GridRefreshCellsAction => ({
  type: GRID_REFRESH_CELLS,
  rows,
  columnIds,
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

export const SetGlue42On = (): SetGlue42OnAction => ({
  type: SET_GLUE42_ON,
});

export const SetGlue42Off = (): SetGlue42OffAction => ({
  type: SET_GLUE42_OFF,
});

export const SetIPushPullOn = (): SetIPushPullOnAction => ({
  type: SET_IPUSHPULL_ON,
});

export const SetIPushPullOff = (): SetIPushPullOffAction => ({
  type: SET_IPUSHPULL_OFF,
});

export const SetPivotModeOn = (): SetPivotModeOnAction => ({
  type: SET_PIVOT_MODE_ON,
});

export const SetPivotModeOff = (): SetPivotModeOffAction => ({
  type: SET_PIVOT_MODE_OFF,
});

export const SetMainMenuItems = (
  MenuItems: AdaptableBlotterMenuItem[]
): SetMainMenuItemsAction => ({
  type: SET_MAIN_MENUITEMS,
  MenuItems,
});

const initialGridState: GridState = {
  Columns: EMPTY_ARRAY,
  ColumnSorts: EMPTY_ARRAY,
  SelectedCellInfo: null,
  SelectedRowInfo: null,
  CellSummary: null,
  IsQuickFilterActive: false,
  MainMenuItems: EMPTY_ARRAY,
  IsGlue42Running: false,
  IsIPushPullRunning: false,
  IsGridInPivotMode: false,
};

export const GridReducer: Redux.Reducer<GridState> = (
  state: GridState = initialGridState,
  action: Redux.Action
): GridState => {
  switch (action.type) {
    case GRID_SET_COLUMNS:
      return Object.assign({}, state, {
        Columns: [].concat((action as GridSetColumnsAction).Columns),
      });
    case GRID_ADD_COLUMN:
      const actionTypedAdd = action as GridAddColumnAction;
      let columns = [].concat(state.Columns);
      columns.push(actionTypedAdd.Column);
      return Object.assign({}, state, { Columns: columns });
    case GRID_EDIT_COLUMN:
      const actioncolumn: AdaptableBlotterColumn = (action as GridEditColumnAction).Column;
      return {
        ...state,
        Columns: state.Columns.map(abObject =>
          abObject.Uuid === actioncolumn.Uuid ? actioncolumn : abObject
        ),
      };

    case GRID_SET_SORT:
      return Object.assign({}, state, { ColumnSorts: (action as GridSetSortAction).ColumnSorts });
    case GRID_SET_SELECTED_CELLS:
      return Object.assign({}, state, {
        SelectedCellInfo: (action as GridSetSelectedCellsAction).SelectedCellInfo,
      });
    case GRID_SET_SELECTED_ROWS:
      return Object.assign({}, state, {
        SelectedRowInfo: (action as GridSetSelectedRowsAction).SelectedRowInfo,
      });
    case GRID_SET_CELLS_SUMMARY:
      return Object.assign({}, state, {
        CellSummary: (action as GridSetCellSummaryAction).CellSummary,
      });
    case GRID_QUICK_FILTER_BAR_SHOW:
      return Object.assign({}, state, { IsQuickFilterActive: true });
    case GRID_QUICK_FILTER_BAR_HIDE:
      return Object.assign({}, state, { IsQuickFilterActive: false });
    case SET_MAIN_MENUITEMS: {
      const actionTyped = action as SetMainMenuItemsAction;
      const menuItems = actionTyped.MenuItems.sort(
        (a: AdaptableBlotterMenuItem, b: AdaptableBlotterMenuItem) =>
          a.Label < b.Label ? -1 : a.Label > b.Label ? 1 : 0
      );
      return Object.assign({}, state, { MainMenuItems: menuItems });
    }
    case SET_GLUE42_ON:
      return Object.assign({}, state, { IsGlue42Running: true });
    case SET_GLUE42_OFF:
      return Object.assign({}, state, { IsGlue42Running: false });
    case SET_IPUSHPULL_ON:
      return Object.assign({}, state, { IsIPushPullRunning: true });
    case SET_IPUSHPULL_OFF:
      return Object.assign({}, state, { IsIPushPullRunning: false });
    case SET_PIVOT_MODE_ON:
      return Object.assign({}, state, { IsGridInPivotMode: true });
    case SET_PIVOT_MODE_OFF:
      return Object.assign({}, state, { IsGridInPivotMode: false });
    default:
      return state;
  }
};
