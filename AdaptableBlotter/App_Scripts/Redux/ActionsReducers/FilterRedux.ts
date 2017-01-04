/// <reference path="../../../typings/index.d.ts" />

import { FilterState } from './Interface/IState';
import { IColumnFilter } from '../../Core/interface/IFilterStrategy';
import { ColumnType } from '../../Core/Enums'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { StringExtensions } from '../../Core/Extensions';


export const FILTER_ADD_OR_UPDATE = 'FILTER_ADD_OR_UPDATE';
export const FILTER_DELETE = 'FILTER_DELETE';


export interface FilterAddEditAction extends Redux.Action {
    columnFilter: IColumnFilter
}

export interface FilterDeleteAction extends Redux.Action {
    columnFilter: IColumnFilter
}

export const AddEditFilter = (columnFilter: IColumnFilter): FilterAddEditAction => ({
    type: FILTER_ADD_OR_UPDATE,
    columnFilter
})

export const DeleteFilter = (columnFilter: IColumnFilter): FilterDeleteAction => ({
    type: FILTER_DELETE,
    columnFilter
})

const initialFilterState:
    FilterState = {
        ColumnFilters: [],
    }

export const FilterReducer: Redux.Reducer<FilterState> = (state: FilterState = initialFilterState, action: Redux.Action): FilterState => {
    let index: number;
    let ColumnFilters: IColumnFilter[]


    switch (action.type) {

        case FILTER_ADD_OR_UPDATE: {
            let actionTypedAddUpdate = (<FilterAddEditAction>action)
            ColumnFilters = [].concat(state.ColumnFilters)
            index = ColumnFilters.findIndex(i => i.ColumnId == actionTypedAddUpdate.columnFilter.ColumnId)
            if (index != -1) {  // it exists
                ColumnFilters[index] = actionTypedAddUpdate.columnFilter
            } else {
                ColumnFilters.push(actionTypedAddUpdate.columnFilter)
            }
            return Object.assign({}, state, { ColumnFilters: ColumnFilters })
        }

        case FILTER_DELETE: {
            let actionTypedDelete = (<FilterDeleteAction>action)
            ColumnFilters = [].concat(state.ColumnFilters)
            index = ColumnFilters.findIndex(i => i.ColumnId == actionTypedDelete.columnFilter.ColumnId)
            ColumnFilters.splice(index, 1);
            return Object.assign({}, state, { ColumnFilters: ColumnFilters })
        }

        default:
            return state
    }





}


