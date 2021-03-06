import * as Redux from 'redux';
import { GridState } from '../../PredefinedConfig/GridState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SelectedCellInfo } from '../../PredefinedConfig/Selection/SelectedCellInfo';
import { CellSummmary } from '../../PredefinedConfig/Selection/CellSummmary';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { SelectedRowInfo } from '../../PredefinedConfig/Selection/SelectedRowInfo';
import { AdaptableMenuItem } from '../../PredefinedConfig/Common/Menu';
import { DataChangedInfo } from '../../PredefinedConfig/Common/DataChangedInfo';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
import { LAYOUT_UPDATE_CURRENT_DRAFT, LayoutAction, LAYOUT_SELECT } from './LayoutRedux';
import { Layout } from '../../types';

export const GRID_SET_COLUMNS = 'GRID_SET_COLUMNS';
export const GRID_ADD_COLUMN = 'GRID_ADD_COLUMN';
export const GRID_ADD_COLUMNS = 'GRID_ADD_COLUMNS';
export const GRID_REMOVE_COLUMN = 'GRID_REMOVE_COLUMN';
export const GRID_EDIT_COLUMN = 'GRID_EDIT_COLUMN';
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
export const SET_FUNCTION_DROPDOWN_MENUITEMS = 'SET_FUNCTION_DROPDOWN_MENUITEMS';
export const SET_FUNCTION_BUTTON_MENUITEMS = 'SET_FUNCTION_BUTTON_MENUITEMS';

export const SET_PIVOT_MODE_ON = 'SET_PIVOT_MODE_ON';
export const SET_PIVOT_MODE_OFF = 'SET_PIVOT_MODE_OFF';
export const SET_TREE_MODE_ON = 'SET_TREE_MODE_ON';
export const SET_TREE_MODE_OFF = 'SET_TREE_MODE_OFF';

export interface GridSetColumnsAction extends Redux.Action {
  Columns: AdaptableColumn[];
}
export interface GridAddColumnAction extends Redux.Action {
  Column: AdaptableColumn;
}
export interface GridAddColumnsAction extends Redux.Action {
  Columns: AdaptableColumn[];
}
export interface GridRemoveColumnAction extends Redux.Action {
  Column: AdaptableColumn;
}
export interface GridEditColumnAction extends Redux.Action {
  Column: AdaptableColumn;
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

export interface GridSetAdaptableRestrictionsAction extends Redux.Action {
  AdaptableRestrictions: string[];
}

export interface GridSetSelectedCellsAction extends Redux.Action {
  SelectedCellInfo: SelectedCellInfo;
}

export interface GridSetSelectedRowsAction extends Redux.Action {
  SelectedRowInfo: SelectedRowInfo;
}

export interface GridCreateCellSummaryAction extends Redux.Action {}

export interface GridSetCellSummaryAction extends Redux.Action {
  CellSummary: CellSummmary;
}

export interface GridRefreshCellsAction extends Redux.Action {
  rows: any[];
  columnIds: string[];
}

export interface QuickFilterBarShowAction extends Redux.Action {}

export interface QuickFilterBarHideAction extends Redux.Action {}

export interface FilterFormHideAction extends Redux.Action {}

export interface SetFunctionDropdownMenuItemsAction extends Redux.Action {
  MenuItems: AdaptableMenuItem[];
}

export interface SetFunctionButtonMenuItemsAction extends Redux.Action {
  MenuItems: AdaptableMenuItem[];
}

export interface SetLiveReportRunningOnAction extends Redux.Action {}

export interface SetLiveReportRunningOffAction extends Redux.Action {}

export interface SetPivotModeOnAction extends Redux.Action {}

export interface SetPivotModeOffAction extends Redux.Action {}

export interface SetTreeModeOnAction extends Redux.Action {}

export interface SetTreeModeOffAction extends Redux.Action {}

export const GridSetColumns = (Columns: AdaptableColumn[]): GridSetColumnsAction => ({
  type: GRID_SET_COLUMNS,
  Columns,
});

export const GridAddColumn = (Column: AdaptableColumn): GridAddColumnAction => ({
  type: GRID_ADD_COLUMN,
  Column,
});
export const GridAddColumns = (Columns: AdaptableColumn[]): GridAddColumnsAction => ({
  type: GRID_ADD_COLUMNS,
  Columns,
});
export const GridRemoveColumn = (Column: AdaptableColumn): GridRemoveColumnAction => ({
  type: GRID_REMOVE_COLUMN,
  Column,
});

export const GridEditColumn = (Column: AdaptableColumn): GridEditColumnAction => ({
  type: GRID_EDIT_COLUMN,
  Column,
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

export const GridSetCellSummary = (CellSummary: CellSummmary): GridSetCellSummaryAction => ({
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

export const SetPivotModeOn = (): SetPivotModeOnAction => ({
  type: SET_PIVOT_MODE_ON,
});

export const SetPivotModeOff = (): SetPivotModeOffAction => ({
  type: SET_PIVOT_MODE_OFF,
});

export const SetTreeModeOn = (): SetTreeModeOnAction => ({
  type: SET_TREE_MODE_ON,
});

export const SetTreeModeOff = (): SetTreeModeOffAction => ({
  type: SET_TREE_MODE_OFF,
});

export const SetFunctionDropdownMenuItems = (
  MenuItems: AdaptableMenuItem[]
): SetFunctionDropdownMenuItemsAction => ({
  type: SET_FUNCTION_DROPDOWN_MENUITEMS,
  MenuItems,
});

export const SetFunctionButtonMenuItems = (
  MenuItems: AdaptableMenuItem[]
): SetFunctionButtonMenuItemsAction => ({
  type: SET_FUNCTION_BUTTON_MENUITEMS,
  MenuItems,
});

const initialGridState: GridState = {
  Columns: EMPTY_ARRAY,
  CurrentLayout: null,
  ColumnSorts: EMPTY_ARRAY,
  SelectedCellInfo: null,
  SelectedRowInfo: null,
  CellSummary: null,
  IsQuickFilterVisible: false,
  FunctionDropdownMenuItems: EMPTY_ARRAY,
  FunctionButtonMenuItems: EMPTY_ARRAY,
  IsGridInPivotMode: false,
  IsGridInTreeMode: false,
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

    case GRID_ADD_COLUMNS:
      const actionTypedAddMany = action as GridAddColumnsAction;

      return Object.assign({}, state, {
        Columns: [...state.Columns, ...actionTypedAddMany.Columns],
      });

    case GRID_EDIT_COLUMN:
      const actioncolumn: AdaptableColumn = (action as GridEditColumnAction).Column;
      return {
        ...state,
        Columns: state.Columns.map(abObject =>
          abObject.Uuid === actioncolumn.Uuid ? actioncolumn : abObject
        ),
      };
    case GRID_REMOVE_COLUMN:
      const removeColumn: AdaptableColumn = (action as GridRemoveColumnAction).Column;
      return {
        ...state,
        Columns: state.Columns.filter(abObject => abObject.Uuid !== removeColumn.Uuid),
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
      return Object.assign({}, state, { IsQuickFilterVisible: true });
    case GRID_QUICK_FILTER_BAR_HIDE:
      return Object.assign({}, state, { IsQuickFilterVisible: false });
    case SET_FUNCTION_DROPDOWN_MENUITEMS: {
      const actionTyped = action as SetFunctionDropdownMenuItemsAction;
      const menuItems = actionTyped.MenuItems.sort((a: AdaptableMenuItem, b: AdaptableMenuItem) =>
        a.Label < b.Label ? -1 : a.Label > b.Label ? 1 : 0
      );
      return Object.assign({}, state, { FunctionDropdownMenuItems: menuItems });
    }
    case SET_FUNCTION_BUTTON_MENUITEMS: {
      const actionTyped = action as SetFunctionButtonMenuItemsAction;
      const menuItems = actionTyped.MenuItems.sort((a: AdaptableMenuItem, b: AdaptableMenuItem) =>
        a.Label < b.Label ? -1 : a.Label > b.Label ? 1 : 0
      );
      return Object.assign({}, state, { FunctionButtonMenuItems: menuItems });
    }

    case LAYOUT_UPDATE_CURRENT_DRAFT: {
      const currentDraftLayout: Layout = (action as LayoutAction).layout;
      return Object.assign({}, state, {
        CurrentLayout: currentDraftLayout,
      });
    }

    case LAYOUT_SELECT: {
      return Object.assign({}, state, {
        CurrentLayout: null,
      });
    }

    case SET_PIVOT_MODE_ON:
      return Object.assign({}, state, { IsGridInPivotMode: true });
    case SET_PIVOT_MODE_OFF:
      return Object.assign({}, state, { IsGridInPivotMode: false });
    case SET_TREE_MODE_ON:
      return Object.assign({}, state, { IsGridInTreeMode: true });
    case SET_TREE_MODE_OFF:
      return Object.assign({}, state, { IsGridInTreeMode: false });
    default:
      return state;
  }
};
