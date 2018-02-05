import { UserFilterState } from './Interface/IState';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { UserFilterHelper } from '../../Core/Helpers/UserFilterHelper';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as Redux from 'redux'

export const USER_FILTER_ADD_UPDATE = 'USER_FILTER_ADD_UPDATE';
export const USER_FILTER_DELETE = 'USER_FILTER_DELETE';

export interface UserFilterAddUpdateAction extends Redux.Action {
    UserFilter: IUserFilter
}


export interface UserFilterDeleteAction extends Redux.Action {
    UserFilter: IUserFilter
}


export const UserFilterAddUpdate = (UserFilter: IUserFilter): UserFilterAddUpdateAction => ({
    type: USER_FILTER_ADD_UPDATE,
    UserFilter
})

export const UserFilterDelete = (UserFilter: IUserFilter): UserFilterDeleteAction => ({
    type: USER_FILTER_DELETE,
    UserFilter
})



const initialFilterState:
    UserFilterState = {
        UserFilters: UserFilterHelper.CreateSystemUserFilters()
      }

export const UserFilterReducer: Redux.Reducer<UserFilterState> = (state: UserFilterState = initialFilterState, action: Redux.Action): UserFilterState => {
    let index: number;
    let UserFilters: IUserFilter[]
 
    switch (action.type) {

        case USER_FILTER_ADD_UPDATE: {
            let actionTypedAddUpdate = (<UserFilterAddUpdateAction>action)
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

