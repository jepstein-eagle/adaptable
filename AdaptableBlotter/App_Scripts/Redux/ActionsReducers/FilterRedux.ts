/// <reference path="../../../typings/index.d.ts" />

import { ColumnFilterState } from './Interface/IState';
import { IColumnFilter } from '../../Core/interface/IColumnFilterStrategy';
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
    ColumnFilterState = {
        ColumnFilters: [],
    }

export const FilterReducer: Redux.Reducer<ColumnFilterState> = (state: ColumnFilterState = initialFilterState, action: Redux.Action): ColumnFilterState => {
    let index: number;
    let columnFilters: IColumnFilter[]


    switch (action.type) {

        case FILTER_ADD_OR_UPDATE: {
            let actionTypedAddUpdate = (<FilterAddEditAction>action)
            columnFilters = [].concat(state.ColumnFilters)
            index = columnFilters.findIndex(i => i.ColumnId == actionTypedAddUpdate.columnFilter.ColumnId)
            if (index != -1) {  // it exists
                columnFilters[index] = actionTypedAddUpdate.columnFilter
            } else {
                columnFilters.push(actionTypedAddUpdate.columnFilter)
            }
            return Object.assign({}, state, { ColumnFilters: columnFilters })
        }

        case FILTER_DELETE: {
            let actionTypedDelete = (<FilterDeleteAction>action)
            columnFilters = [].concat(state.ColumnFilters)
            index = columnFilters.findIndex(i => i.ColumnId == actionTypedDelete.columnFilter.ColumnId)
            columnFilters.splice(index, 1);
            return Object.assign({}, state, { ColumnFilters: columnFilters })
        }

        default:
            return state
    }





}


