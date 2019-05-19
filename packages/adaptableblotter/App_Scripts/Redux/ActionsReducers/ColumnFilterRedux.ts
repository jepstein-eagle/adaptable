import { ColumnFilterState } from './Interface/IState';
import * as Redux from 'redux';
import { IColumnFilter } from '../../Utilities/Interface/BlotterObjects/IColumnFilter';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const COLUMN_FILTER_ADD = 'COLUMN_FILTER_ADD';
export const COLUMN_FILTER_EDIT = 'COLUMN_FILTER_EDIT';
export const COLUMN_FILTER_CLEAR_ALL = 'COLUMN_FILTER_CLEAR_ALL';
export const COLUMN_FILTER_CLEAR = 'COLUMN_FILTER_CLEAR';

export interface ColumnFilterAddAction extends Redux.Action {
  columnFilter: IColumnFilter;
}

export interface ColumnFilterEditAction extends Redux.Action {
  columnFilter: IColumnFilter;
}

export interface ColumnFilterClearAllAction extends Redux.Action {}

export interface ColumnFilterClearAction extends Redux.Action {
  columnId: string;
}

export const ColumnFilterAdd = (columnFilter: IColumnFilter): ColumnFilterAddAction => ({
  type: COLUMN_FILTER_ADD,
  columnFilter,
});

export const ColumnFilterEdit = (columnFilter: IColumnFilter): ColumnFilterEditAction => ({
  type: COLUMN_FILTER_EDIT,
  columnFilter,
});

export const ColumnFilterClearAll = (): ColumnFilterClearAllAction => ({
  type: COLUMN_FILTER_CLEAR_ALL,
});

export const ColumnFilterClear = (columnId: string): ColumnFilterClearAction => ({
  type: COLUMN_FILTER_CLEAR,
  columnId,
});

const initialFilterState: ColumnFilterState = {
  ColumnFilters: EMPTY_ARRAY,
};

export const ColumnFilterReducer: Redux.Reducer<ColumnFilterState> = (
  state: ColumnFilterState = initialFilterState,
  action: Redux.Action
): ColumnFilterState => {
  let index: number;
  let columnFilters: IColumnFilter[];

  switch (action.type) {
    case COLUMN_FILTER_ADD: {
      let actionTypedAddUpdate = <ColumnFilterAddAction>action;
      columnFilters = [].concat(state.ColumnFilters);
      index = columnFilters.findIndex(
        i => i.ColumnId == actionTypedAddUpdate.columnFilter.ColumnId
      );
      columnFilters.push(actionTypedAddUpdate.columnFilter);
      return Object.assign({}, state, { ColumnFilters: columnFilters });
    }

    case COLUMN_FILTER_EDIT: {
      let actionTypedAddUpdate = <ColumnFilterEditAction>action;
      columnFilters = [].concat(state.ColumnFilters);
      index = columnFilters.findIndex(
        i => i.ColumnId == actionTypedAddUpdate.columnFilter.ColumnId
      );
      columnFilters[index] = actionTypedAddUpdate.columnFilter;
      return Object.assign({}, state, { ColumnFilters: columnFilters });
    }

    case COLUMN_FILTER_CLEAR_ALL: {
      return Object.assign({}, state, { ColumnFilters: [] });
    }

    case COLUMN_FILTER_CLEAR: {
      let actionTypedDelete = <ColumnFilterClearAction>action;
      columnFilters = [].concat(state.ColumnFilters);
      index = columnFilters.findIndex(i => i.ColumnId == actionTypedDelete.columnId);
      columnFilters.splice(index, 1);
      return Object.assign({}, state, { ColumnFilters: columnFilters });
    }

    default:
      return state;
  }
};
