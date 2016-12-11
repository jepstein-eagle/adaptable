/// <reference path="../../../typings/index.d.ts" />

import { AdvancedSearchState } from './Interface/IState';
import { LeafExpressionOperator } from '../../Core/Enums';
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';


export const ADVANCED_SEARCH_ADD = 'ADVANCED_SEARCH_ADD';
export const ADVANCED_SEARCH_DELETE = 'ADVANCED_SEARCH_DELETE';

export interface AdvancedSearchAddAction extends Redux.Action {
    AdvancedSearch: IAdvancedSearch
}

export const AdvancedSearchAdd = (AdvancedSearch: IAdvancedSearch): AdvancedSearchAddAction => ({
    type: ADVANCED_SEARCH_ADD,
    AdvancedSearch
})

export interface AdvancedSearchDeleteAction extends Redux.Action {
    AdvancedSearch: IAdvancedSearch
}

export const AdvancedSearchDelete = (AdvancedSearch: IAdvancedSearch): AdvancedSearchDeleteAction => ({
    type: ADVANCED_SEARCH_DELETE,
    AdvancedSearch
})

const initialAdvancedSearchState: AdvancedSearchState = {
    AdvancedSearches: [
    ]
}


export const AdvancedSearchReducer: Redux.Reducer<AdvancedSearchState> = (state: AdvancedSearchState = initialAdvancedSearchState, action: Redux.Action): AdvancedSearchState => {
    let index: number;
    let advancedSearches: IAdvancedSearch[]

    switch (action.type) {
        case ADVANCED_SEARCH_ADD:
            let actionTypedAddUpdate = (<AdvancedSearchAddAction>action)
            advancedSearches = [].concat(state.AdvancedSearches)

            index = advancedSearches.findIndex(a => a.AdvancedSearchName == actionTypedAddUpdate.AdvancedSearch.AdvancedSearchName)
            if (index != -1) {  // it exists
                advancedSearches[index] = actionTypedAddUpdate.AdvancedSearch
            } else {
                advancedSearches.push(actionTypedAddUpdate.AdvancedSearch)
            }
            return Object.assign({}, state, { AdvancedSearches: advancedSearches })

        case ADVANCED_SEARCH_DELETE:
            let actionTypedAddDelete = (<AdvancedSearchDeleteAction>action)
            advancedSearches = [].concat(state.AdvancedSearches)

            index = advancedSearches.findIndex(a => a.AdvancedSearchName == actionTypedAddDelete.AdvancedSearch.AdvancedSearchName)
                advancedSearches.splice(index, 1);
            return Object.assign({}, state, { AdvancedSearches: advancedSearches })

        default:
            return state
    }
}