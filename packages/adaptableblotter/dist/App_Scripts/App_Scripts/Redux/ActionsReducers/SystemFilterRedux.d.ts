import { SystemFilterState } from './Interface/IState';
import * as Redux from 'redux';
export declare const SYSTEM_FILTER_SET = "SYSTEM_FILTER_SET";
export interface SystemFilterSetAction extends Redux.Action {
    SystemFilters: string[];
}
export declare const SystemFilterSet: (SystemFilters: string[]) => SystemFilterSetAction;
export declare const SystemFilterReducer: Redux.Reducer<SystemFilterState>;
