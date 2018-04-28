import { AdvancedSearchState } from './Interface/IState';
import * as Redux from 'redux'
import { IAdvancedSearch } from '../../Core/Api/AdaptableBlotterObjects';

export const ADVANCED_SEARCH_ADD_UPDATE = 'ADVANCED_SEARCH_ADD_UPDATE';
export const ADVANCED_SEARCH_DELETE = 'ADVANCED_SEARCH_DELETE';
export const ADVANCED_SEARCH_SELECT = 'ADVANCED_SEARCH_SELECT';

export interface AdvancedSearchAddUpdateAction extends Redux.Action {
    Index: number
    AdvancedSearch: IAdvancedSearch
}

export interface AdvancedSearchDeleteAction extends Redux.Action {
    AdvancedSearch: IAdvancedSearch
}

export interface AdvancedSearchSelectAction extends Redux.Action {
    SelectedSearchName: string
}

export const AdvancedSearchAddUpdate = (Index: number,AdvancedSearch: IAdvancedSearch): AdvancedSearchAddUpdateAction => ({
    type: ADVANCED_SEARCH_ADD_UPDATE,
    Index,
    AdvancedSearch
})

export const AdvancedSearchDelete = (AdvancedSearch: IAdvancedSearch): AdvancedSearchDeleteAction => ({
    type: ADVANCED_SEARCH_DELETE,
    AdvancedSearch
})

export const AdvancedSearchSelect = (SelectedSearchName: string): AdvancedSearchSelectAction => ({
    type: ADVANCED_SEARCH_SELECT,
    SelectedSearchName
})

const initialAdvancedSearchState: AdvancedSearchState = {
    AdvancedSearches: [],
    CurrentAdvancedSearch: ""
}

export const AdvancedSearchReducer: Redux.Reducer<AdvancedSearchState> = (state: AdvancedSearchState = initialAdvancedSearchState, action: Redux.Action): AdvancedSearchState => {
    let index: number;
    let advancedSearches: IAdvancedSearch[]

    switch (action.type) {
        case ADVANCED_SEARCH_ADD_UPDATE:
            let actionTypedAddUpdate = (<AdvancedSearchAddUpdateAction>action)
            advancedSearches = [].concat(state.AdvancedSearches)
            let currentSearchName = actionTypedAddUpdate.AdvancedSearch.Name;
            if (actionTypedAddUpdate.Index != -1) {  // it exists
                advancedSearches[actionTypedAddUpdate.Index] = actionTypedAddUpdate.AdvancedSearch
            } else {
                advancedSearches.push(actionTypedAddUpdate.AdvancedSearch)
            }
            return Object.assign({}, state, { AdvancedSearches: advancedSearches})//, CurrentAdvancedSearch: currentSearchName })

        case ADVANCED_SEARCH_DELETE:
            let actionTypedDelete = (<AdvancedSearchDeleteAction>action)
            advancedSearches = [].concat(state.AdvancedSearches)
            index = advancedSearches.findIndex(a => a.Name == actionTypedDelete.AdvancedSearch.Name)
            advancedSearches.splice(index, 1);
            return Object.assign({}, state, { AdvancedSearches: advancedSearches, CurrentAdvancedSearch: "" })

        case ADVANCED_SEARCH_SELECT:
            return Object.assign({}, state, { CurrentAdvancedSearch: (<AdvancedSearchSelectAction>action).SelectedSearchName })

        default:
            return state
    }
}