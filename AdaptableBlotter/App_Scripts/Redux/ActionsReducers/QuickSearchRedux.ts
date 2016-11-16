/// <reference path="../../../typings/index.d.ts" />

import {QuickSearchState} from './Interface/IState';
import {SearchStringOperator} from '../../Core/Enums';

export const QUICK_SEARCH_SET_SEARCH_TEXT = 'QUICK_SEARCH_SET_SEARCH_TEXT';
export const QUICK_SEARCH_SET_STRING_OPERATOR = 'QUICK_SEARCH_SET_STRING_OPERATOR';

export interface QuickSearchSetSearchTextAction extends Redux.Action {
    quickSearchText: string
}

export const QuickSearchSetSearchText = (quickSearchText: string): QuickSearchSetSearchTextAction => ({
    type: QUICK_SEARCH_SET_SEARCH_TEXT,
    quickSearchText
})



export interface QuickSearchSetStringOperatorAction extends Redux.Action {
    searchStringOperator: SearchStringOperator
}

export const QuickSearchSetStringOperator = (searchStringOperator: SearchStringOperator): QuickSearchSetStringOperatorAction => ({
    type: QUICK_SEARCH_SET_STRING_OPERATOR,
    searchStringOperator
})

const initialQuickSearchState: QuickSearchState = {
    QuickSearchText: "",
    SearchStringOperator: SearchStringOperator.StartsWith
}


export const QuickSearchReducer: Redux.Reducer<QuickSearchState> = (state: QuickSearchState = initialQuickSearchState, action: Redux.Action): QuickSearchState => {
    switch (action.type) {
        case QUICK_SEARCH_SET_SEARCH_TEXT:
           let actionTyped = (<QuickSearchSetSearchTextAction>action)
             return Object.assign({}, state, { QuickSearchText: actionTyped.quickSearchText })
               case QUICK_SEARCH_SET_STRING_OPERATOR:
            return Object.assign({}, state, { SearchStringOperator: (<QuickSearchSetStringOperatorAction>action).searchStringOperator })
        default:
            return state
    }
}