import { UserFilterState } from './Interface/IState';
import * as Redux from 'redux';
import { IUserFilter } from '../../Utilities/Interface/BlotterObjects/IUserFilter';
import { IColumnFilter } from '../../Utilities/Interface/BlotterObjects/IColumnFilter';
import { InputAction } from '../../Utilities/Interface/IMessage';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const USER_FILTER_ADD = 'USER_FILTER_ADD';
export const USER_FILTER_EDIT = 'USER_FILTER_EDIT';
export const USER_FILTER_DELETE = 'USER_FILTER_DELETE';
export const USER_FILTER_CREATE_FROM_COLUMN_FILTER = 'USER_FILTER_CREATE_FROM_COLUMN_FILTER';

export interface UserFilterAddAction extends Redux.Action {
  UserFilter: IUserFilter;
}

export interface UserFilterEditAction extends Redux.Action {
  Index: number;
  UserFilter: IUserFilter;
}

export interface UserFilterDeleteAction extends Redux.Action {
  Index: number;
  UserFilter: IUserFilter;
}

export interface CreateUserFilterFromColumnFilterAction extends InputAction {
  ColumnFilter: IColumnFilter;
}

export const UserFilterAdd = (UserFilter: IUserFilter): UserFilterAddAction => ({
  type: USER_FILTER_ADD,
  UserFilter,
});

export const UserFilterEdit = (Index: number, UserFilter: IUserFilter): UserFilterEditAction => ({
  type: USER_FILTER_EDIT,
  Index,
  UserFilter,
});

export const UserFilterDelete = (
  Index: number,
  UserFilter: IUserFilter
): UserFilterDeleteAction => ({
  type: USER_FILTER_DELETE,
  Index,
  UserFilter,
});

export const CreateUserFilterFromColumnFilter = (
  ColumnFilter: IColumnFilter,
  InputText: string
): CreateUserFilterFromColumnFilterAction => ({
  type: USER_FILTER_CREATE_FROM_COLUMN_FILTER,
  ColumnFilter,
  InputText,
});

const initialFilterState: UserFilterState = {
  UserFilters: EMPTY_ARRAY,
};

export const UserFilterReducer: Redux.Reducer<UserFilterState> = (
  state: UserFilterState = initialFilterState,
  action: Redux.Action
): UserFilterState => {
  let index: number;
  let userFilters: IUserFilter[];

  switch (action.type) {
    case USER_FILTER_ADD: {
      let actionTypedAddUpdate = <UserFilterAddAction>action;
      userFilters = [].concat(state.UserFilters);
      userFilters.push(actionTypedAddUpdate.UserFilter);
      return Object.assign({}, state, { UserFilters: userFilters });
    }
    case USER_FILTER_EDIT: {
      let actionTypedAddUpdate = <UserFilterEditAction>action;
      userFilters = [].concat(state.UserFilters);
      userFilters[actionTypedAddUpdate.Index] = actionTypedAddUpdate.UserFilter;
      return Object.assign({}, state, { UserFilters: userFilters });
    }

    case USER_FILTER_DELETE: {
      let actionTypedDelete = <UserFilterDeleteAction>action;
      userFilters = [].concat(state.UserFilters);
      index = userFilters.findIndex(i => i.Name == actionTypedDelete.UserFilter.Name);
      userFilters.splice(index, 1);
      return Object.assign({}, state, { UserFilters: userFilters });
    }

    default:
      return state;
  }
};
