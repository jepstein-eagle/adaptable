/// <reference path="../../../typings/index.d.ts" />

import { ColumnFilterState } from './Interface/IState';
import { IColumnFilter } from '../../Core/interface/IColumnFilterStrategy';
import { ColumnType } from '../../Core/Enums'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { StringExtensions } from '../../Core/Extensions';

export const COLUMN_FILTER_ADD_OR_UPDATE = 'COLUMN_FILTER_ADD_OR_UPDATE';
export const COLUMN_FILTER_DELETE = 'COLUMN_FILTER_DELETE';

export interface ColumnFilterAddEditAction extends Redux.Action {
    columnFilter: IColumnFilter
}

export const AddEditColumnFilter = (columnFilter: IColumnFilter): ColumnFilterAddEditAction => ({
    type: COLUMN_FILTER_ADD_OR_UPDATE,
    columnFilter
})

export interface ColumnFilterDeleteAction extends Redux.Action {
    columnFilter: IColumnFilter
}

export const DeleteColumnFilter = (columnFilter: IColumnFilter): ColumnFilterDeleteAction => ({
    type: COLUMN_FILTER_DELETE,
    columnFilter
})

const initialColumnFilterState:
    ColumnFilterState = {
        ColumnFilters: [],
    }

export const ColumnFilterReducer: Redux.Reducer<ColumnFilterState> = (state: ColumnFilterState = initialColumnFilterState, action: Redux.Action): ColumnFilterState => {
    let index: number;
    let columnFilters: IColumnFilter[]

    switch (action.type) {

        case COLUMN_FILTER_ADD_OR_UPDATE: {
            let actionTypedAddUpdate = (<ColumnFilterAddEditAction>action)
            columnFilters = [].concat(state.ColumnFilters)
            index = columnFilters.findIndex(i => i.ColumnId == actionTypedAddUpdate.columnFilter.ColumnId)
            if (index != -1) {  // it exists
                columnFilters[index] = actionTypedAddUpdate.columnFilter
            } else {
                columnFilters.push(actionTypedAddUpdate.columnFilter)
            }
            return Object.assign({}, state, { ColumnFilters: columnFilters })
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


