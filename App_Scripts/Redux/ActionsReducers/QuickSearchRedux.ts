import { QuickSearchState } from './Interface/IState';
import { LeafExpressionOperator, QuickSearchDisplayType } from '../../Core/Enums';
import { IStyle } from '../../Core/Interface/IStyle';
import * as Redux from 'redux'

export const QUICK_SEARCH_APPLY = 'QUICK_SEARCH_APPLY';
export const QUICK_SEARCH_SET_OPERATOR = 'QUICK_SEARCH_SET_OPERATOR';
export const QUICK_SEARCH_SET_DISPLAY = 'QUICK_SEARCH_SET_DISPLAY';
export const QUICK_SEARCH_SET_STYLE = 'QUICK_SEARCH_SET_STYLE';
export const QUICK_SEARCH_DEFAULT_BACK_COLOR = '#FFFFCC';
export const QUICK_SEARCH_DEFAULT_FORE_COLOR = '#000000';


export interface QuickSearchApplyAction extends Redux.Action {
    quickSearchText: string
}

export interface QuickSearchClearAction extends Redux.Action {
}

export interface QuickSearchSetSearchOperatorAction extends Redux.Action {
    quickSearchOperator: LeafExpressionOperator
}

export interface QuickSearchSetSearchDisplayAction extends Redux.Action {
    quickSearchDisplayType: QuickSearchDisplayType
}

export interface QuickSearchSetStyleAction extends Redux.Action {
    style: IStyle
}

export const QuickSearchApply = (quickSearchText: string): QuickSearchApplyAction => ({
    type: QUICK_SEARCH_APPLY,
    quickSearchText
})

export const QuickSearchSetOperator = (quickSearchOperator: LeafExpressionOperator): QuickSearchSetSearchOperatorAction => ({
    type: QUICK_SEARCH_SET_OPERATOR,
    quickSearchOperator
})

export const QuickSearchSetDisplay = (quickSearchDisplayType: QuickSearchDisplayType): QuickSearchSetSearchDisplayAction => ({
    type: QUICK_SEARCH_SET_DISPLAY,
    quickSearchDisplayType
})

export const QuickSearchSetStyle = (style: IStyle): QuickSearchSetStyleAction => ({
    type: QUICK_SEARCH_SET_STYLE,
    style
})

const initialQuickSearchState: QuickSearchState = {
    QuickSearchBackColor: QUICK_SEARCH_DEFAULT_BACK_COLOR,
    QuickSearchForeColor: QUICK_SEARCH_DEFAULT_FORE_COLOR,
    QuickSearchText: "",
    QuickSearchOperator: LeafExpressionOperator.Contains,
    QuickSearchDisplayType: QuickSearchDisplayType.HighlightCell,
    QuickSearchStyle:
    {
        BackColor: QUICK_SEARCH_DEFAULT_BACK_COLOR, 
        ForeColor: QUICK_SEARCH_DEFAULT_FORE_COLOR
    }
}

export const QuickSearchReducer: Redux.Reducer<QuickSearchState> = (state: QuickSearchState = initialQuickSearchState, action: Redux.Action): QuickSearchState => {
    switch (action.type) {
        case QUICK_SEARCH_APPLY:
            return Object.assign({}, state, { QuickSearchText: (<QuickSearchApplyAction>action).quickSearchText })
        case QUICK_SEARCH_SET_OPERATOR:
            return Object.assign({}, state, { QuickSearchOperator: (<QuickSearchSetSearchOperatorAction>action).quickSearchOperator })
        case QUICK_SEARCH_SET_DISPLAY:
            return Object.assign({}, state, { QuickSearchDisplayType: (<QuickSearchSetSearchDisplayAction>action).quickSearchDisplayType })
        case QUICK_SEARCH_SET_STYLE:
            return Object.assign({}, state, { QuickSearchStyle: (<QuickSearchSetStyleAction>action).style })
        default:
            return state
    }
}