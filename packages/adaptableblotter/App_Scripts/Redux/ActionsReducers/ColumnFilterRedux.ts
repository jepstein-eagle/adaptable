import * as Redux from 'redux';
import {
  ColumnFilterState,
  ColumnFilter,
} from '../../PredefinedConfig/RunTimeState/ColumnFilterState';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const COLUMN_FILTER_ADD = 'COLUMN_FILTER_ADD';
export const COLUMN_FILTER_EDIT = 'COLUMN_FILTER_EDIT';
export const COLUMN_FILTER_SET = 'COLUMN_FILTER_SET';
export const COLUMN_FILTER_CLEAR_ALL = 'COLUMN_FILTER_CLEAR_ALL';
export const COLUMN_FILTER_CLEAR = 'COLUMN_FILTER_CLEAR';

export interface ColumnFilterAction extends Redux.Action {
  columnFilter: ColumnFilter;
}

export interface ColumnFilterAddAction extends ColumnFilterAction {}

export interface ColumnFilterEditAction extends ColumnFilterAction {}
export interface ColumnFilterSetAction extends ColumnFilterAction {}

export interface ColumnFilterClearAllAction extends Redux.Action {}

export interface ColumnFilterClearAction extends Redux.Action {
  columnFilter: ColumnFilter;
}

export const ColumnFilterAdd = (columnFilter: ColumnFilter): ColumnFilterAddAction => ({
  type: COLUMN_FILTER_ADD,
  columnFilter,
});

export const ColumnFilterEdit = (columnFilter: ColumnFilter): ColumnFilterEditAction => ({
  type: COLUMN_FILTER_EDIT,
  columnFilter,
});
export const ColumnFilterSet = (columnFilter: ColumnFilter): ColumnFilterSetAction => ({
  type: COLUMN_FILTER_SET,
  columnFilter,
});

export const ColumnFilterClearAll = (): ColumnFilterClearAllAction => ({
  type: COLUMN_FILTER_CLEAR_ALL,
});

export const ColumnFilterClear = (columnFilter: ColumnFilter): ColumnFilterClearAction => ({
  type: COLUMN_FILTER_CLEAR,
  columnFilter,
});

const initialFilterState: ColumnFilterState = {
  ColumnFilters: EMPTY_ARRAY,
};

export const ColumnFilterReducer: Redux.Reducer<ColumnFilterState> = (
  state: ColumnFilterState = initialFilterState,
  action: Redux.Action
): ColumnFilterState => {
  let columnFilters: ColumnFilter[];

  switch (action.type) {
    case COLUMN_FILTER_SET: {
      const actionColumnFilter: ColumnFilter = (action as ColumnFilterAction).columnFilter;
      if (!actionColumnFilter.Uuid) {
        actionColumnFilter.Uuid = createUuid();
      }
      let exists = state.ColumnFilters.find(cf => cf.Uuid == actionColumnFilter.Uuid);
      if (exists) {
        return {
          ...state,
          ColumnFilters: state.ColumnFilters.map(abObject =>
            abObject.Uuid === actionColumnFilter.Uuid ? actionColumnFilter : abObject
          ),
        };
      } else {
        columnFilters = [].concat(state.ColumnFilters);
        columnFilters.push(actionColumnFilter);
        return { ...state, ColumnFilters: columnFilters };
      }
    }

    case COLUMN_FILTER_ADD: {
      const actionColumnFilter: ColumnFilter = (action as ColumnFilterAction).columnFilter;
      if (!actionColumnFilter.Uuid) {
        actionColumnFilter.Uuid = createUuid();
      }
      columnFilters = [].concat(state.ColumnFilters);
      columnFilters.push(actionColumnFilter);
      return { ...state, ColumnFilters: columnFilters };
    }

    case COLUMN_FILTER_EDIT: {
      const actionColumnFilter: ColumnFilter = (action as ColumnFilterAction).columnFilter;

      return {
        ...state,
        ColumnFilters: state.ColumnFilters.map(abObject =>
          abObject.Uuid === actionColumnFilter.Uuid ? actionColumnFilter : abObject
        ),
      };
    }

    case COLUMN_FILTER_CLEAR_ALL: {
      return Object.assign({}, state, { ColumnFilters: [] });
    }

    case COLUMN_FILTER_CLEAR: {
      const actionTypedDelete = <ColumnFilterClearAction>action;
      columnFilters = [].concat(state.ColumnFilters);
      const index = actionTypedDelete.columnFilter
        ? columnFilters.findIndex(i => i.Uuid == actionTypedDelete.columnFilter.Uuid)
        : -1;
      if (index != -1) {
        columnFilters.splice(index, 1);
      }
      return Object.assign({}, state, { ColumnFilters: columnFilters });
    }

    default:
      return state;
  }
};
