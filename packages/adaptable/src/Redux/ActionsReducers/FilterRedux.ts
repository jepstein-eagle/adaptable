import { FilterState, ColumnFilter, UserFilter } from '../../PredefinedConfig/FilterState';
import * as Redux from 'redux';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { InputAction } from '../../Utilities/Interface/IMessage';
import { SystemFilterPredicateIds } from '../../PredefinedConfig/Common/Predicate';

// System Filter constants
export const SYSTEM_FILTER_SET = 'SYSTEM_FILTER_SET';

// Column Filter constants
export const COLUMN_FILTER_ADD = 'COLUMN_FILTER_ADD';
export const COLUMN_FILTER_EDIT = 'COLUMN_FILTER_EDIT';
export const COLUMN_FILTER_SET = 'COLUMN_FILTER_SET';
export const COLUMN_FILTER_CLEAR_ALL = 'COLUMN_FILTER_CLEAR_ALL';
export const COLUMN_FILTER_CLEAR = 'COLUMN_FILTER_CLEAR';

// User Filter constants - this is being used but we need to think about it
export const USER_FILTER_ADD = 'USER_FILTER_ADD';
export const USER_FILTER_EDIT = 'USER_FILTER_EDIT';
export const USER_FILTER_DELETE = 'USER_FILTER_DELETE';
export const USER_FILTER_CREATE_FROM_COLUMN_FILTER = 'USER_FILTER_CREATE_FROM_COLUMN_FILTER';

// System Filter Actions
export interface SystemFilterSetAction extends Redux.Action {
  SystemFilters: string[];
}

// Column Filter Actions
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

// User Filter Actions

export interface UserFilterAction extends Redux.Action {
  userFilter: UserFilter;
}

export interface UserFilterAddAction extends UserFilterAction {}

export interface UserFilterEditAction extends UserFilterAction {}

export interface UserFilterDeleteAction extends UserFilterAction {}

export interface CreateUserFilterFromColumnFilterAction extends InputAction {
  ColumnFilter: ColumnFilter;
}

// System Filter Methods
export const SystemFilterSet = (SystemFilters: string[]): SystemFilterSetAction => ({
  type: SYSTEM_FILTER_SET,
  SystemFilters,
});

// Column Filter Methods
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

// User Filter Methods

export const UserFilterAdd = (userFilter: UserFilter): UserFilterAddAction => ({
  type: USER_FILTER_ADD,
  userFilter,
});

export const UserFilterEdit = (userFilter: UserFilter): UserFilterEditAction => ({
  type: USER_FILTER_EDIT,
  userFilter,
});
export const UserFilterDelete = (userFilter: UserFilter): UserFilterDeleteAction => ({
  type: USER_FILTER_DELETE,
  userFilter,
});

export const CreateUserFilterFromColumnFilter = (
  ColumnFilter: ColumnFilter,
  InputText: string
): CreateUserFilterFromColumnFilterAction => ({
  type: USER_FILTER_CREATE_FROM_COLUMN_FILTER,
  ColumnFilter,
  InputText,
});

const initialFilterState: FilterState = {
  SystemFilters: SystemFilterPredicateIds as any,
  FilterPredicates: [],
  ColumnFilters: [],
  UserFilters: [],
};

export const FilterReducer: Redux.Reducer<FilterState> = (
  state: FilterState = initialFilterState,
  action: Redux.Action
): FilterState => {
  let columnFilters: ColumnFilter[];
  let userFilters: UserFilter[];
  switch (action.type) {
    case SYSTEM_FILTER_SET:
      return Object.assign({}, state, {
        SystemFilters: (action as SystemFilterSetAction).SystemFilters,
      });

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
      const actionTypedDelete = action as ColumnFilterClearAction;
      columnFilters = [].concat(state.ColumnFilters);
      const index = actionTypedDelete.columnFilter
        ? columnFilters.findIndex(i => i.Uuid == actionTypedDelete.columnFilter.Uuid)
        : -1;
      if (index != -1) {
        columnFilters.splice(index, 1);
      }
      return Object.assign({}, state, { ColumnFilters: columnFilters });
    }

    case USER_FILTER_ADD: {
      const actionUserFilter: UserFilter = (action as UserFilterAction).userFilter;

      if (!actionUserFilter.Uuid) {
        actionUserFilter.Uuid = createUuid();
      }
      userFilters = [].concat(state.UserFilters);
      userFilters.push(actionUserFilter);
      return { ...state, UserFilters: userFilters };
    }

    case USER_FILTER_EDIT: {
      const actionUserFilter: UserFilter = (action as UserFilterAction).userFilter;
      return {
        ...state,
        UserFilters: state.UserFilters.map(abObject =>
          abObject.Uuid === actionUserFilter.Uuid ? actionUserFilter : abObject
        ),
      };
    }
    case USER_FILTER_DELETE: {
      const actionUserFilter: UserFilter = (action as UserFilterAction).userFilter;
      return {
        ...state,
        UserFilters: state.UserFilters.filter(abObject => abObject.Uuid !== actionUserFilter.Uuid),
      };
    }

    default:
      return state;
  }
};
