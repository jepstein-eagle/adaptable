/// <reference path="../../../typings/index.d.ts" />

import { AdvancedSearchState } from './Interface/IState';
import { LeafExpressionOperator } from '../../Core/Enums';
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';

export const ADVANCED_SEARCH_ADD_UPDATE = 'ADVANCED_SEARCH_ADD_UPDATE';
export const ADVANCED_SEARCH_DELETE = 'ADVANCED_SEARCH_DELETE';
export const ADVANCED_SEARCH_SELECT = 'ADVANCED_SEARCH_SELECT';

export interface AdvancedSearchAddUpdateAction extends Redux.Action {
    AdvancedSearch: IAdvancedSearch
}

export const AdvancedSearchAddUpdate = (AdvancedSearch: IAdvancedSearch): AdvancedSearchAddUpdateAction => ({
    type: ADVANCED_SEARCH_ADD_UPDATE,
    AdvancedSearch
})

export interface AdvancedSearchDeleteAction extends Redux.Action {
    AdvancedSearch: IAdvancedSearch
}

export const AdvancedSearchDelete = (AdvancedSearch: IAdvancedSearch): AdvancedSearchDeleteAction => ({
    type: ADVANCED_SEARCH_DELETE,
    AdvancedSearch
})

export interface AdvancedSearchSelectAction extends Redux.Action {
    SelectedSearchUid: string
}

export const AdvancedSearchSelect = (SelectedSearchUid: string): AdvancedSearchSelectAction => ({
    type: ADVANCED_SEARCH_SELECT,
    SelectedSearchUid
})

const initialAdvancedSearchState: AdvancedSearchState = {
    AdvancedSearches: [],
    CurrentAdvancedSearchId: ""
}

export const AdvancedSearchReducer: Redux.Reducer<AdvancedSearchState> = (state: AdvancedSearchState = initialAdvancedSearchState, action: Redux.Action): AdvancedSearchState => {
    let index: number;
    let advancedSearches: IAdvancedSearch[]

    switch (action.type) {
        case ADVANCED_SEARCH_ADD_UPDATE:
            let actionTypedAddUpdate = (<AdvancedSearchAddUpdateAction>action)
            advancedSearches = [].concat(state.AdvancedSearches)
            let currentSearchId = actionTypedAddUpdate.AdvancedSearch.Uid;
            index = advancedSearches.findIndex(a => a.Uid == currentSearchId)
            if (index != -1) {  // it exists
                advancedSearches[index] = actionTypedAddUpdate.AdvancedSearch
            } else {
                advancedSearches.push(actionTypedAddUpdate.AdvancedSearch)
            }
            return Object.assign({}, state, { AdvancedSearches: advancedSearches, CurrentAdvancedSearchId: currentSearchId })

        case ADVANCED_SEARCH_DELETE:
            let actionTypedDelete = (<AdvancedSearchDeleteAction>action)
            advancedSearches = [].concat(state.AdvancedSearches)
            index = advancedSearches.findIndex(a => a.Uid == actionTypedDelete.AdvancedSearch.Uid)
            advancedSearches.splice(index, 1);
            return Object.assign({}, state, { AdvancedSearches: advancedSearches, CurrentAdvancedSearchId: "" })

        case ADVANCED_SEARCH_SELECT:
            return Object.assign({}, state, { CurrentAdvancedSearchId: (<AdvancedSearchSelectAction>action).SelectedSearchUid })

        default:
            return state
    }
}