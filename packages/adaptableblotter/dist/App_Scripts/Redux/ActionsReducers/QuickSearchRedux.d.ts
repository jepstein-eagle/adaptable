import { QuickSearchState } from './Interface/IState';
import { DisplayAction } from '../../Utilities/Enums';
import * as Redux from 'redux';
import { IStyle } from "../../Utilities/Interface/IStyle";
export declare const QUICK_SEARCH_APPLY = "QUICK_SEARCH_APPLY";
export declare const QUICK_SEARCH_SET_DISPLAY = "QUICK_SEARCH_SET_DISPLAY";
export declare const QUICK_SEARCH_SET_STYLE = "QUICK_SEARCH_SET_STYLE";
export interface QuickSearchApplyAction extends Redux.Action {
    quickSearchText: string;
}
export interface QuickSearchClearAction extends Redux.Action {
}
export interface QuickSearchSetDisplayAction extends Redux.Action {
    DisplayAction: DisplayAction;
}
export interface QuickSearchSetStyleAction extends Redux.Action {
    style: IStyle;
}
export declare const QuickSearchApply: (quickSearchText: string) => QuickSearchApplyAction;
export declare const QuickSearchSetDisplay: (DisplayAction: DisplayAction) => QuickSearchSetDisplayAction;
export declare const QuickSearchSetStyle: (style: IStyle) => QuickSearchSetStyleAction;
export declare const QuickSearchReducer: Redux.Reducer<QuickSearchState>;
