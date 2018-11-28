import { HomeState } from './Interface/IState';
import * as Redux from 'redux';
export declare const FILTER_FORM_HIDE = "FILTER_FORM_HIDE";
export declare const QUICK_FILTER_BAR_SHOW = "QUICK_FILTER_BAR_SHOW";
export declare const QUICK_FILTER_BAR_HIDE = "QUICK_FILTER_BAR_HIDE";
export interface HideFilterFormAction extends Redux.Action {
}
export interface QuickFilterBarShowAction extends Redux.Action {
}
export interface QuickFilterBarHideAction extends Redux.Action {
}
export declare const HideFilterForm: () => HideFilterFormAction;
export declare const QuickFilterBarShow: () => QuickFilterBarShowAction;
export declare const QuickFilterBarHide: () => QuickFilterBarHideAction;
export declare const HomeReducer: Redux.Reducer<HomeState>;
