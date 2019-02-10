import { HomeState } from './Interface/IState';
import * as Redux from 'redux';
export declare const FILTER_FORM_HIDE = "FILTER_FORM_HIDE";
export interface FilterFormHideAction extends Redux.Action {
}
export declare const FilterFormHide: () => FilterFormHideAction;
export declare const HomeReducer: Redux.Reducer<HomeState>;
