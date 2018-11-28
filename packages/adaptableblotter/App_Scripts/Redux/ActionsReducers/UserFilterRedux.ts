import { UserFilterState } from './Interface/IState';
import { FilterHelper } from '../../Utilities/Helpers/FilterHelper';
import * as Redux from 'redux'
import { IUserFilter, IColumnFilter } from '../../Api/Interface/IAdaptableBlotterObjects';
import { InputAction } from '../../Core/Interface/IMessage';


export const USER_FILTER_ADD_UPDATE = 'USER_FILTER_ADD_UPDATE';
export const USER_FILTER_DELETE = 'USER_FILTER_DELETE';
export const CREATE_USER_FILTER_FROM_COLUMN_FILTER = 'CREATE_USER_FILTER_FROM_COLUMN_FILTER';


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

export const UserFilterAddUpdate = (Index: number,UserFilter: IUserFilter): UserFilterAddUpdateAction => ({
    type: USER_FILTER_ADD_UPDATE,
    Index,
    UserFilter
})

export const UserFilterDelete = (UserFilter: IUserFilter): UserFilterDeleteAction => ({
    type: USER_FILTER_DELETE,
    UserFilter
})

export const CreateUserFilterFromColumnFilter = (ColumnFilter: IColumnFilter,  InputText: string): CreateUserFilterFromColumnFilterAction => ({
    type: CREATE_USER_FILTER_FROM_COLUMN_FILTER,
    ColumnFilter,
    InputText
})

const initialFilterState:
    UserFilterState = {
        UserFilters: [],
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

