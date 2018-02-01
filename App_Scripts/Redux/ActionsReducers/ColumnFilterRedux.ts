import { ColumnFilterState } from './Interface/IState';
import { UserFilterHelper } from '../../Core/Helpers/UserFilterHelper';
import { StringExtensions } from '../../Core/Extensions';
import { IColumnFilter } from '../../Strategy/Interface/IColumnFilterStrategy';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as Redux from 'redux'


export const COLUMN_FILTER_ADD_UPDATE = 'COLUMN_FILTER_ADD_UPDATE';
export const COLUMN_FILTER_CLEAR = 'COLUMN_FILTER_CLEAR';
export const COLUMN_FILTER_DELETE = 'COLUMN_FILTER_DELETE';
export const HIDE_FILTER_FORM = 'HIDE_FILTER_FORM';

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
    ColumnFilterState = {
          ColumnFilters: [],
    }

export const ColumnFilterReducer: Redux.Reducer<ColumnFilterState> = (state: ColumnFilterState = initialFilterState, action: Redux.Action): ColumnFilterState => {
    let index: number;
  let columnFilters: IColumnFilter[]
 
    switch (action.type) {

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
            let actionTypedClear = (<ColumnFilterClearAction>action)
            columnFilters = []
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

