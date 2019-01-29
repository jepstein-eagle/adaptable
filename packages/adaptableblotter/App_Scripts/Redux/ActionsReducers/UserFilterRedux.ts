import { UserFilterState } from './Interface/IState';
import * as Redux from 'redux'
import { IUserFilter } from "../../Utilities/Interface/BlotterObjects/IUserFilter";
import { IColumnFilter } from "../../Utilities/Interface/BlotterObjects/IColumnFilter";
import { InputAction } from '../../Utilities/Interface/IMessage';
import { EMPTY_ARRAY } from '../../Utilities/Constants/GeneralConstants';

export const USER_FILTER_ADD_UPDATE = 'USER_FILTER_ADD_UPDATE';
export const USER_FILTER_DELETE = 'USER_FILTER_DELETE';
export const USER_FILTER_CREATE_FROM_COLUMN_FILTER = 'USER_FILTER_CREATE_FROM_COLUMN_FILTER';

export interface UserFilterAddUpdateAction extends Redux.Action {
    Index: number
    UserFilter: IUserFilter
}

export interface UserFilterDeleteAction extends Redux.Action {
    UserFilter: IUserFilter
}

export interface CreateUserFilterFromColumnFilterAction extends InputAction {
    ColumnFilter: IColumnFilter
}

export const UserFilterAddUpdate = (Index: number, UserFilter: IUserFilter): UserFilterAddUpdateAction => ({
    type: USER_FILTER_ADD_UPDATE,
    Index,
    UserFilter
})

export const UserFilterDelete = (UserFilter: IUserFilter): UserFilterDeleteAction => ({
    type: USER_FILTER_DELETE,
    UserFilter
})

export const CreateUserFilterFromColumnFilter = (ColumnFilter: IColumnFilter, InputText: string): CreateUserFilterFromColumnFilterAction => ({
    type: USER_FILTER_CREATE_FROM_COLUMN_FILTER,
    ColumnFilter,
    InputText
})

const initialFilterState: UserFilterState = {
    UserFilters: EMPTY_ARRAY,
}

export const UserFilterReducer: Redux.Reducer<UserFilterState> = (state: UserFilterState = initialFilterState, action: Redux.Action): UserFilterState => {
    let index: number;
    let userFilters: IUserFilter[]

    switch (action.type) {

        case USER_FILTER_ADD_UPDATE: {
            let actionTypedAddUpdate = (<UserFilterAddUpdateAction>action)
            userFilters = [].concat(state.UserFilters)
            if (actionTypedAddUpdate.Index != -1) {  // it exists
                userFilters[actionTypedAddUpdate.Index] = actionTypedAddUpdate.UserFilter
            } else {
                userFilters.push(actionTypedAddUpdate.UserFilter)
            }
            return Object.assign({}, state, { UserFilters: userFilters })
        }

        case USER_FILTER_DELETE: {
            let actionTypedDelete = (<UserFilterDeleteAction>action)
            userFilters = [].concat(state.UserFilters)
            index = userFilters.findIndex(i => i.Name == actionTypedDelete.UserFilter.Name)
            userFilters.splice(index, 1);
            return Object.assign({}, state, { UserFilters: userFilters })
        }


        default:
            return state
    }
}

