/// <reference path="../../../typings/index.d.ts" />

import { FilterState } from './Interface/IState';
import { INamedExpression } from '../../Core/interface/IExpression';


export const FILTER_ADD_OR_UPDATE = 'FILTER_ADD_OR_UPDATE';
export const FILTER_DELETE = 'FILTER_DELETE';


export interface FilterAddOrUpdateAction extends Redux.Action {
    Index: number,
    Filter: INamedExpression
}

export interface FilterDeleteAction extends Redux.Action {
    Index: number
}

export const AddEditFilter = (Index: number, Filter: INamedExpression): FilterAddOrUpdateAction => ({
    type: FILTER_ADD_OR_UPDATE,
    Index,
    Filter
})

export const DeleteFilter = (Index: number): FilterDeleteAction => ({
    type: FILTER_DELETE,
    Index
})

const initialFilterState: FilterState = {
    Filters: []
}

export const FilterReducer: Redux.Reducer<FilterState> = (state: FilterState = initialFilterState, action: Redux.Action): FilterState => {
    switch (action.type) {

        case FILTER_ADD_OR_UPDATE: {
            let actionTypedAddUpdate = (<FilterAddOrUpdateAction>action)
            let newFilters: INamedExpression[] = [].concat(state.Filters)
            if (actionTypedAddUpdate.Index == -1) {
                newFilters.push(actionTypedAddUpdate.Filter)
            }
            else {
                newFilters[actionTypedAddUpdate.Index] = actionTypedAddUpdate.Filter
            }
            return Object.assign({}, state, { Filters: newFilters })
        }
        case FILTER_DELETE: {
            let newFilters: INamedExpression[] = [].concat(state.Filters)
            newFilters.splice((<FilterDeleteAction>action).Index, 1)
            return Object.assign({}, state, { Filters: newFilters })
        }
        default:
            return state
    }
}