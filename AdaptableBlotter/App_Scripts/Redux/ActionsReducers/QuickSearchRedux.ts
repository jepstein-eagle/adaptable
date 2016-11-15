/// <reference path="../../../typings/index.d.ts" />

import {QuickSearchState} from './Interface/IState';

export const QUICK_SEARCH_SET_SEARCH_TEXT = 'QUICK_SEARCH_SET_SEARCH_TEXT';

export interface QuickSearchSetSearchTextAction extends Redux.Action {
    quickSearchText: string
}

export const QuickSearchSetSearchText = (quickSearchText: string): QuickSearchSetSearchTextAction => ({
    type: QUICK_SEARCH_SET_SEARCH_TEXT,
    quickSearchText
})

const initialQuickSearchState: QuickSearchState = {
    QuickSearchText: ""
}

export const QuickSearchReducer: Redux.Reducer<QuickSearchState> = (state: QuickSearchState = initialQuickSearchState, action: Redux.Action): QuickSearchState => {
    switch (action.type) {
        case QUICK_SEARCH_SET_SEARCH_TEXT:
           let actionTyped = (<QuickSearchSetSearchTextAction>action)
             return Object.assign({}, state, { QuickSearchText: actionTyped.quickSearchText })
        default:
            return state
    }
}