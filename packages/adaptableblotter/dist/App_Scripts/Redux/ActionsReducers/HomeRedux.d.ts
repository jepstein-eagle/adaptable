import { HomeState } from './Interface/IState';
import * as Redux from 'redux';
export declare const FILTER_FORM_HIDE = "FILTER_FORM_HIDE";
export declare const FLOATING_FILTER_BAR_SHOW = "FLOATING_FILTER_BAR_SHOW";
export declare const FLOATING_FILTER_BAR_HIDE = "FLOATING_FILTER_BAR_HIDE";
export interface FilterFormHideAction extends Redux.Action {
}
export interface FloatingFilterBarShowAction extends Redux.Action {
}
export interface FloatingFilterBarHideAction extends Redux.Action {
}
export declare const FilterFormHide: () => FilterFormHideAction;
export declare const FloatingilterBarShow: () => FloatingFilterBarShowAction;
export declare const FloatingFilterBarHide: () => FloatingFilterBarHideAction;
export declare const HomeReducer: Redux.Reducer<HomeState>;
