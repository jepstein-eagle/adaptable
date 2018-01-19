import { QuickSearchState } from './Interface/IState';
import { LeafExpressionOperator, QuickSearchDisplayType, FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { IStyle } from '../../Core/Interface/IStyle';
import * as Redux from 'redux'

export const QUICK_SEARCH_RUN = 'QUICK_SEARCH_RUN';
export const QUICK_SEARCH_SET_OPERATOR = 'QUICK_SEARCH_SET_OPERATOR';
export const QUICK_SEARCH_SET_DISPLAY = 'QUICK_SEARCH_SET_DISPLAY';
export const QUICK_SEARCH_SET_STYLE = 'QUICK_SEARCH_SET_STYLE';
export const QUICK_SEARCH_DEFAULT_BACK_COLOUR = '#FFFFCC';
export const QUICK_SEARCH_DEFAULT_FORE_COLOUR = '#000000';


export interface QuickSearchRunAction extends Redux.Action {
    quickSearchText: string
}

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

export interface QuickSearchSetStyleAction extends Redux.Action {
    style: IStyle
}

export const QuickSearchSetStyle = (style: IStyle): QuickSearchSetStyleAction => ({
    type: QUICK_SEARCH_SET_STYLE,
    style
})

const initialQuickSearchState: QuickSearchState = {
    QuickSearchDefaultBackColour: QUICK_SEARCH_DEFAULT_BACK_COLOUR,
    QuickSearchDefaultForeColour: QUICK_SEARCH_DEFAULT_FORE_COLOUR,
    QuickSearchText: "",
    QuickSearchOperator: LeafExpressionOperator.Contains,
    QuickSearchDisplayType: QuickSearchDisplayType.ColourCell,
    QuickSearchStyle:
    {
        BackColor: QUICK_SEARCH_DEFAULT_BACK_COLOUR, // only property we are going to set 
    }
}

export const QuickSearchReducer: Redux.Reducer<QuickSearchState> = (state: QuickSearchState = initialQuickSearchState, action: Redux.Action): QuickSearchState => {
    switch (action.type) {
        case QUICK_SEARCH_RUN:
            return Object.assign({}, state, { QuickSearchText: (<QuickSearchRunAction>action).quickSearchText })
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