import { FilterState } from './Interface/IState';
import { FilterHelper } from '../../Core/Helpers/FilterHelper';
import * as Redux from 'redux'
import { IUserFilter, IColumnFilter } from '../../Core/Api/Interface/AdaptableBlotterObjects';


export const USER_FILTER_ADD_UPDATE = 'USER_FILTER_ADD_UPDATE';
export const USER_FILTER_DELETE = 'USER_FILTER_DELETE';

export const COLUMN_FILTER_ADD_UPDATE = 'COLUMN_FILTER_ADD_UPDATE';
export const COLUMN_FILTER_CLEAR = 'COLUMN_FILTER_CLEAR';
export const COLUMN_FILTER_DELETE = 'COLUMN_FILTER_DELETE';
export const HIDE_FILTER_FORM = 'HIDE_FILTER_FORM';

export const SYSTEM_FILTER_SET = 'SYSTEM_FILTER_SET';


export interface UserFilterAddUpdateAction extends Redux.Action {
    Index: number
   UserFilter: IUserFilter
}

export interface UserFilterDeleteAction extends Redux.Action {
    UserFilter: IUserFilter
}

export interface HideFilterFormAction extends Redux.Action {
}

export interface ColumnFilterAddUpdateAction extends Redux.Action {
    columnFilter: IColumnFilter
}

export interface ColumnFilterClearAction extends Redux.Action {
}

export interface ColumnFilterDeleteAction extends Redux.Action {
    columnFilter: IColumnFilter
}

export interface SystemFilterSetAction extends Redux.Action {
    SystemFilters: string[]
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

export const HideFilterForm = (): HideFilterFormAction => ({
    type: HIDE_FILTER_FORM,
})

export const ColumnFilterAddUpdate = (columnFilter: IColumnFilter): ColumnFilterAddUpdateAction => ({
    type: COLUMN_FILTER_ADD_UPDATE,
    columnFilter
})

export const ColumnFilterClear = (): ColumnFilterClearAction => ({
    type: COLUMN_FILTER_CLEAR
})

export const ColumnFilterDelete = (columnFilter: IColumnFilter): ColumnFilterDeleteAction => ({
    type: COLUMN_FILTER_DELETE,
    columnFilter
})

export const SystemFilterSet = (SystemFilters: string[]): SystemFilterSetAction => ({
    type: SYSTEM_FILTER_SET,
    SystemFilters
})

const initialFilterState:
    FilterState = {
        ColumnFilters: [],
        UserFilters: [],
        SystemFilters: FilterHelper.GetAllSystemFilters()
    }

export const FilterReducer: Redux.Reducer<FilterState> = (state: FilterState = initialFilterState, action: Redux.Action): FilterState => {
    let index: number;
    let columnFilters: IColumnFilter[]
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
        case COLUMN_FILTER_ADD_UPDATE: {
            let actionTypedAddUpdate = (<ColumnFilterAddUpdateAction>action)
            columnFilters = [].concat(state.ColumnFilters)
            index = columnFilters.findIndex(i => i.ColumnId == actionTypedAddUpdate.columnFilter.ColumnId)
            if (index != -1) {  // it exists
                columnFilters[index] = actionTypedAddUpdate.columnFilter
            } else {
                columnFilters.push(actionTypedAddUpdate.columnFilter)
            }
            return Object.assign({}, state, { ColumnFilters: columnFilters })
        }

        case COLUMN_FILTER_CLEAR: {
            return Object.assign({}, state, { ColumnFilters: [] })
        }

        case COLUMN_FILTER_DELETE: {
            let actionTypedDelete = (<ColumnFilterDeleteAction>action)
            columnFilters = [].concat(state.ColumnFilters)
            index = columnFilters.findIndex(i => i.ColumnId == actionTypedDelete.columnFilter.ColumnId)
            columnFilters.splice(index, 1);
            return Object.assign({}, state, { ColumnFilters: columnFilters })
        }
        case SYSTEM_FILTER_SET:
        return Object.assign({}, state, { SystemFilters: (<SystemFilterSetAction>action).SystemFilters })
   
        default:
            return state
    }
}

