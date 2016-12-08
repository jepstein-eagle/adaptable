/// <reference path="../../../typings/index.d.ts" />

import { AdvancedSearchState } from './Interface/IState';
import { LeafExpressionOperator } from '../../Core/Enums';

export const ADVANCED_SEARCH_SET_SEARCH_NAME = 'ADVANCED_SEARCH_SET_SEARCH_NAME';

export interface AdvancedSearchSetSearchNameAction extends Redux.Action {
    advancedSearchName: string
}

export const AdvancedSearchSetSearchName = (advancedSearchName: string): AdvancedSearchSetSearchNameAction => ({
    type: ADVANCED_SEARCH_SET_SEARCH_NAME,
    advancedSearchName
})



const initialAdvancedSearchState: AdvancedSearchState = {
    AdvancedSearchName: "",
 }


export const AdvancedSearchReducer: Redux.Reducer<AdvancedSearchState> = (state: AdvancedSearchState = initialAdvancedSearchState, action: Redux.Action): AdvancedSearchState => {
    switch (action.type) {
        case ADVANCED_SEARCH_SET_SEARCH_NAME:
            return Object.assign({}, state, { AdvancedSearchName: (<AdvancedSearchSetSearchNameAction>action).advancedSearchName })
           default:
            return state
    }
}