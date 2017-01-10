/// <reference path="../../../typings/index.d.ts" />

import { UserFilterState } from './Interface/IState';
import { IUserFilter } from '../../Core/interface/IExpression';
import { ColumnType } from '../../Core/Enums'
import { UserFilterHelper } from '../../Core/Services/UserFilterHelper';
import { StringExtensions } from '../../Core/Extensions';

export const USER_FILTER_ADD_OR_UPDATE = 'USER_FILTER_ADD_OR_UPDATE';
export const USER_FILTER_DELETE = 'USER_FILTER_DELETE';


export interface UserFilterAddOrUpdateAction extends Redux.Action {
    UserFilter: IUserFilter
}

export interface UserFilterDeleteAction extends Redux.Action {
    UserFilter: IUserFilter
}

export const AddEditUserFilter = (UserFilter: IUserFilter): UserFilterAddOrUpdateAction => ({
    type: USER_FILTER_ADD_OR_UPDATE,
    UserFilter
})

export const DeleteUserFilter = (UserFilter: IUserFilter): UserFilterDeleteAction => ({
    type: USER_FILTER_DELETE,
    UserFilter
})

const initialUserFilterState:
    UserFilterState = {
        UserFilters: UserFilterHelper.CreatePredefinedExpressions(),
    }

export const UserFilterReducer: Redux.Reducer<UserFilterState> = (state: UserFilterState = initialUserFilterState, action: Redux.Action): UserFilterState => {
    let index: number;
    let UserFilters: IUserFilter[]

    switch (action.type) {

        case USER_FILTER_ADD_OR_UPDATE: {
            let actionTypedAddUpdate = (<UserFilterAddOrUpdateAction>action)
            UserFilters = [].concat(state.UserFilters)
            index = UserFilters.findIndex(i => i.Uid == actionTypedAddUpdate.UserFilter.Uid)
            if (index != -1) {  // it exists
                UserFilters[index] = actionTypedAddUpdate.UserFilter
            } else {
                UserFilters.push(actionTypedAddUpdate.UserFilter)
            }
            return Object.assign({}, state, { UserFilters: UserFilters })
        }

        case USER_FILTER_DELETE: {
            let actionTypedDelete = (<UserFilterDeleteAction>action)
            UserFilters = [].concat(state.UserFilters)
            index = UserFilters.findIndex(i => i.Uid == actionTypedDelete.UserFilter.Uid)
            UserFilters.splice(index, 1);
            return Object.assign({}, state, { UserFilters: UserFilters })
        }

        default:
            return state
    }
}

