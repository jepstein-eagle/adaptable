/// <reference path="../../../typings/index.d.ts" />

import { QuickSearchState } from './Interface/IState';
import { LeafExpressionOperator, QuickSearchDisplayType } from '../../Core/Enums';

export const QUICK_SEARCH_RUN = 'QUICK_SEARCH_RUN';
export const QUICK_SEARCH_CLEAR = 'QUICK_SEARCH_CLEAR';
export const QUICK_SEARCH_SET_OPERATOR = 'QUICK_SEARCH_SET_OPERATOR';
export const QUICK_SEARCH_SET_DISPLAY = 'QUICK_SEARCH_SET_DISPLAY';
export const QUICK_SEARCH_SET_BACK_COLOR = 'QUICK_SEARCH_SET_BACK_COLOR';

export interface QuickSearchRunAction extends Redux.Action {
    quickSearchText: string
}

export const QuickSearchClear = (): QuickSearchClearAction => ({
    type: QUICK_SEARCH_CLEAR,
})

export interface QuickSearchClearAction extends Redux.Action {
}

export const QuickSearchRun = (quickSearchText: string): QuickSearchRunAction => ({
    type: QUICK_SEARCH_RUN,
    quickSearchText
})

export interface QuickSearchSetSearchOperatorAction extends Redux.Action {
    quickSearchOperator: LeafExpressionOperator
}

export const QuickSearchSetOperator = (quickSearchOperator: LeafExpressionOperator): QuickSearchSetSearchOperatorAction => ({
    type: QUICK_SEARCH_SET_OPERATOR,
    quickSearchOperator
})

export interface QuickSearchSetSearchDisplayAction extends Redux.Action {
    quickSearchDisplayType: QuickSearchDisplayType
}

export const QuickSearchSetDisplay = (quickSearchDisplayType: QuickSearchDisplayType): QuickSearchSetSearchDisplayAction => ({
    type: QUICK_SEARCH_SET_DISPLAY,
    quickSearchDisplayType
})

export interface QuickSearchSetBackColorAction extends Redux.Action {
    backColor: string
}

export const QuickSearchSetBackColor = (backColor: string): QuickSearchSetBackColorAction => ({
    type: QUICK_SEARCH_SET_BACK_COLOR,
    backColor
})

const initialQuickSearchState: QuickSearchState = {
    QuickSearchText: "",
    QuickSearchOperator: LeafExpressionOperator.StartsWith,
    QuickSearchDisplayType: QuickSearchDisplayType.ColourCell,
    QuickSearchBackColor: "#FFFFCC"
}

export const QuickSearchReducer: Redux.Reducer<QuickSearchState> = (state: QuickSearchState = initialQuickSearchState, action: Redux.Action): QuickSearchState => {
    switch (action.type) {
        case QUICK_SEARCH_RUN:
            return Object.assign({}, state, { QuickSearchText: (<QuickSearchRunAction>action).quickSearchText })
        case QUICK_SEARCH_CLEAR:
            return Object.assign({}, state, { QuickSearchText: ""})
        case QUICK_SEARCH_SET_OPERATOR:
            return Object.assign({}, state, { QuickSearchOperator: (<QuickSearchSetSearchOperatorAction>action).quickSearchOperator })
        case QUICK_SEARCH_SET_DISPLAY:
            return Object.assign({}, state, { QuickSearchDisplayType: (<QuickSearchSetSearchDisplayAction>action).quickSearchDisplayType })
        case QUICK_SEARCH_SET_BACK_COLOR:
            return Object.assign({}, state, { QuickSearchBackColor: (<QuickSearchSetBackColorAction>action).backColor })
        default:
            return state
    }
}