/// <reference path="../../../typings/index.d.ts" />

import { QuickSearchState } from './Interface/IState';
import { LeafExpressionOperator, QuickSearchDisplayType } from '../../Core/Enums';

export const QUICK_SEARCH_SET_SEARCH_TEXT = 'QUICK_SEARCH_SET_SEARCH_TEXT';
export const QUICK_SEARCH_SET_SEARCH_OPERATOR = 'QUICK_SEARCH_SET_SEARCH_OPERATOR';
export const QUICK_SEARCH_SET_SEARCH_DISPLAY = 'QUICK_SEARCH_SET_SEARCH_DISPLAY';

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

export interface QuickSearchSetSearchDisplayAction extends Redux.Action {
    quickSearchDisplayType: QuickSearchDisplayType
}

export const QuickSearchSetSearchDisplay = (quickSearchDisplayType: QuickSearchDisplayType): QuickSearchSetSearchDisplayAction => ({
    type: QUICK_SEARCH_SET_SEARCH_DISPLAY,
    quickSearchDisplayType
})

const initialQuickSearchState: QuickSearchState = {
    QuickSearchText: "",
    QuickSearchOperator: LeafExpressionOperator.StartsWith,
    QuickSearchDisplayType: QuickSearchDisplayType.ColourCell
}

export const QuickSearchReducer: Redux.Reducer<QuickSearchState> = (state: QuickSearchState = initialQuickSearchState, action: Redux.Action): QuickSearchState => {
    switch (action.type) {
        case QUICK_SEARCH_SET_SEARCH_TEXT:
            return Object.assign({}, state, { QuickSearchText: (<QuickSearchSetSearchTextAction>action).quickSearchText })
        case QUICK_SEARCH_SET_SEARCH_OPERATOR:
            return Object.assign({}, state, { QuickSearchOperator: (<QuickSearchSetSearchOperatorAction>action).quickSearchOperator })
        case QUICK_SEARCH_SET_SEARCH_DISPLAY:
            return Object.assign({}, state, { QuickSearchDisplayType: (<QuickSearchSetSearchDisplayAction>action).quickSearchDisplayType })
        default:
            return state
    }
}