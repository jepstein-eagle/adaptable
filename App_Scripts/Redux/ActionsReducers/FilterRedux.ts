import { FilterState } from './Interface/IState';
import { FilterHelper } from '../../Core/Helpers/FilterHelper';
import { IColumnFilter } from '../../Strategy/Interface/IColumnFilterStrategy';
import * as Redux from 'redux'
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';

export const USER_FILTER_ADD_UPDATE = 'USER_FILTER_ADD_UPDATE';
export const USER_FILTER_DELETE = 'USER_FILTER_DELETE';

export const COLUMN_FILTER_ADD_UPDATE = 'COLUMN_FILTER_ADD_UPDATE';
export const COLUMN_FILTER_CLEAR = 'COLUMN_FILTER_CLEAR';
export const COLUMN_FILTER_DELETE = 'COLUMN_FILTER_DELETE';
export const HIDE_FILTER_FORM = 'HIDE_FILTER_FORM';


export interface UserFilterAddUpdateAction extends Redux.Action {
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

export const UserFilterAddUpdate = (UserFilter: IUserFilter): UserFilterAddUpdateAction => ({
    type: USER_FILTER_ADD_UPDATE,
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


const initialFilterState:
    FilterState = {
        ColumnFilters: [],
        UserFilters: [],
        SystemFilters: [
            FilterHelper.BLANKS_SYSTEM_FILTER,
            FilterHelper.NON_BLANKS_SYSTEM_FILTER,
            FilterHelper.TODAY_SYSTEM_FILTER,
            FilterHelper.IN_PAST_SYSTEM_FILTER,
            FilterHelper.IN_FUTURE_SYSTEM_FILTER,
            FilterHelper.YESTERDAY_SYSTEM_FILTER,
            FilterHelper.TOMORROW_SYSTEM_FILTER,
            FilterHelper.NEXT_WORKING_DAY_SYSTEM_FILTER,
            FilterHelper.PREVIOUS_WORKING_DAY_SYSTEM_FILTER,
            FilterHelper.THIS_YEAR_SYSTEM_FILTER,
            FilterHelper.POSITIVE_SYSTEM_FILTER,
            FilterHelper.NEGATIVE_SYSTEM_FILTER,
            FilterHelper.ZERO_SYSTEM_FILTER,
            FilterHelper.TRUE_SYSTEM_FILTER,
            FilterHelper.FALSE_SYSTEM_FILTER
        ]
    }

export const FilterReducer: Redux.Reducer<FilterState> = (state: FilterState = initialFilterState, action: Redux.Action): FilterState => {
    let index: number;
    let columnFilters: IColumnFilter[]
    let UserFilters: IUserFilter[]
    
    switch (action.type) {

        case USER_FILTER_ADD_UPDATE: {
            let actionTypedAddUpdate = (<UserFilterAddUpdateAction>action)
            UserFilters = [].concat(state.UserFilters)
            index = UserFilters.findIndex(i => i.Name == actionTypedAddUpdate.UserFilter.Name)
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
            index = UserFilters.findIndex(i => i.Name == actionTypedDelete.UserFilter.Name)
            UserFilters.splice(index, 1);
            return Object.assign({}, state, { UserFilters: UserFilters })
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

        default:
            return state
    }
}

