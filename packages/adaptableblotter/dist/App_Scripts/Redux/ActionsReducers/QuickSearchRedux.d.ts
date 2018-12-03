import { QuickSearchState } from './Interface/IState';
import { LeafExpressionOperator, DisplayAction } from '../../Utilities/Enums';
import * as Redux from 'redux';
import { IStyle } from '../../api/Interface/IAdaptableBlotterObjects';
export declare const QUICK_SEARCH_APPLY = "QUICK_SEARCH_APPLY";
export declare const QUICK_SEARCH_SET_OPERATOR = "QUICK_SEARCH_SET_OPERATOR";
export declare const QUICK_SEARCH_SET_DISPLAY = "QUICK_SEARCH_SET_DISPLAY";
export declare const QUICK_SEARCH_SET_STYLE = "QUICK_SEARCH_SET_STYLE";
export interface QuickSearchApplyAction extends Redux.Action {
    quickSearchText: string;
}
export interface QuickSearchClearAction extends Redux.Action {
}
export interface QuickSearchSetSearchOperatorAction extends Redux.Action {
    operator: LeafExpressionOperator;
}
export interface QuickSearchSetSearchDisplayAction extends Redux.Action {
    DisplayAction: DisplayAction;
}
export interface QuickSearchSetStyleAction extends Redux.Action {
    style: IStyle;
}
export declare const QuickSearchApply: (quickSearchText: string) => QuickSearchApplyAction;
export declare const QuickSearchSetOperator: (operator: LeafExpressionOperator) => QuickSearchSetSearchOperatorAction;
export declare const QuickSearchSetDisplay: (DisplayAction: DisplayAction) => QuickSearchSetSearchDisplayAction;
export declare const QuickSearchSetStyle: (style: IStyle) => QuickSearchSetStyleAction;
export declare const QuickSearchReducer: Redux.Reducer<QuickSearchState>;
