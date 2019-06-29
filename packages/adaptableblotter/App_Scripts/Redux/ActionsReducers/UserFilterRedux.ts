import { UserFilterState, UserFilter } from '../../PredefinedConfig/RunTimeState/UserFilterState';
import * as Redux from 'redux';
import { InputAction } from '../../Utilities/Interface/IMessage';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { ColumnFilter } from '../../PredefinedConfig/RunTimeState/ColumnFilterState';

export const USER_FILTER_ADD = 'USER_FILTER_ADD';
export const USER_FILTER_EDIT = 'USER_FILTER_EDIT';
export const USER_FILTER_DELETE = 'USER_FILTER_DELETE';
export const USER_FILTER_CREATE_FROM_COLUMN_FILTER = 'USER_FILTER_CREATE_FROM_COLUMN_FILTER';

export interface UserFilterAction extends Redux.Action {
  userFilter: UserFilter;
}

export interface UserFilterAddAction extends UserFilterAction {}

export interface UserFilterEditAction extends UserFilterAction {}

export interface UserFilterDeleteAction extends UserFilterAction {}

export interface CreateUserFilterFromColumnFilterAction extends InputAction {
  ColumnFilter: ColumnFilter;
}

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

const initialFilterState: UserFilterState = {
  UserFilters: EMPTY_ARRAY,
};

export const UserFilterReducer: Redux.Reducer<UserFilterState> = (
  state: UserFilterState = initialFilterState,
  action: Redux.Action
): UserFilterState => {
  let index: number;
  let userFilters: UserFilter[];

  switch (action.type) {
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
