import { ColumnFilterState } from './Interface/IState';
import { FilterHelper } from '../../Core/Helpers/FilterHelper';
import * as Redux from 'redux'
import { IUserFilter, IColumnFilter } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { InputAction } from '../../Core/Interface/IMessage';



export const COLUMN_FILTER_ADD_UPDATE = 'COLUMN_FILTER_ADD_UPDATE';
export const COLUMN_FILTER_CLEAR_ALL = 'COLUMN_FILTER_CLEAR_ALL';
export const COLUMN_FILTER_CLEAR = 'COLUMN_FILTER_CLEAR';


export interface ColumnFilterAddUpdateAction extends Redux.Action {
    columnFilter: IColumnFilter
}


export interface ColumnFilterClearAllAction extends Redux.Action {
}

export interface ColumnFilterClearAction extends Redux.Action {
    columnId: string
}



export const ColumnFilterAddUpdate = (columnFilter: IColumnFilter): ColumnFilterAddUpdateAction => ({
    type: COLUMN_FILTER_ADD_UPDATE,
    columnFilter
})

export const ColumnFilterClearAll = (): ColumnFilterClearAllAction => ({
    type: COLUMN_FILTER_CLEAR_ALL
})

export const ColumnFilterClear = (columnId: string): ColumnFilterClearAction => ({
    type: COLUMN_FILTER_CLEAR,
    columnId
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

        case COLUMN_FILTER_CLEAR_ALL: {
            return Object.assign({}, state, { ColumnFilters: [] })
        }

        case COLUMN_FILTER_CLEAR: {
            let actionTypedDelete = (<ColumnFilterClearAction>action)
            columnFilters = [].concat(state.ColumnFilters)
            index = columnFilters.findIndex(i => i.ColumnId == actionTypedDelete.columnId)
            columnFilters.splice(index, 1);
            return Object.assign({}, state, { ColumnFilters: columnFilters })
        }

        default:
            return state
    }
}

