/// <reference path="../../../typings/index.d.ts" />

import { QuickSearchState } from './Interface/IState';
import { LeafExpressionOperator } from '../../Core/Enums';

export const QUICK_SEARCH_SET_SEARCH_TEXT = 'QUICK_SEARCH_SET_SEARCH_TEXT';
export const QUICK_SEARCH_SET_CASE_SENSITIVITY = 'QUICK_SEARCH_SET_CASE_SENSITIVITY';
export const QUICK_SEARCH_SET_SEARCH_OPERATOR = 'QUICK_SEARCH_SET_SEARCH_OPERATOR';

export interface QuickSearchSetSearchTextAction extends Redux.Action {
    quickSearchText: string
}

export const QuickSearchSetSearchText = (quickSearchText: string): QuickSearchSetSearchTextAction => ({
    type: QUICK_SEARCH_SET_SEARCH_TEXT,
    quickSearchText
})

export interface QuickSearchSetSearchOperatorAction extends Redux.Action {
    quickSearchOperator: LeafExpressionOperator
}

export const QuickSearchSetSearchOperator = (quickSearchOperator: LeafExpressionOperator): QuickSearchSetSearchOperatorAction => ({
    type: QUICK_SEARCH_SET_SEARCH_OPERATOR,
    quickSearchOperator
})

const initialQuickSearchState: QuickSearchState = {
    QuickSearchText: "",
    QuickSearchOperator: LeafExpressionOperator.StartsWith
}

export const QuickSearchReducer: Redux.Reducer<QuickSearchState> = (state: QuickSearchState = initialQuickSearchState, action: Redux.Action): QuickSearchState => {
    switch (action.type) {
        case QUICK_SEARCH_SET_SEARCH_TEXT:
            return Object.assign({}, state, { QuickSearchText: (<QuickSearchSetSearchTextAction>action).quickSearchText })
        case QUICK_SEARCH_SET_SEARCH_OPERATOR:
            return Object.assign({}, state, { QuickSearchOperator: (<QuickSearchSetSearchOperatorAction>action).quickSearchOperator })
        default:
            return state
    }
}