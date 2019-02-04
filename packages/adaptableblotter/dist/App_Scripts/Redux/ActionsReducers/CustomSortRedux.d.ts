import { CustomSortState } from './Interface/IState';
import * as Redux from 'redux';
import { ICustomSort } from "../../Utilities/Interface/BlotterObjects/ICustomSort";
export declare const CUSTOMSORT_ADD = "CUSTOMSORT_ADD";
export declare const CUSTOMSORT_EDIT = "CUSTOMSORT_EDIT";
export declare const CUSTOMSORT_DELETE = "CUSTOMSORT_DELETE";
export interface CustomSortAddAction extends Redux.Action {
    CustomSort: ICustomSort;
}
export interface CustomSortEditAction extends Redux.Action {
    CustomSort: ICustomSort;
}
export interface CustomSortDeleteAction extends Redux.Action {
    CustomSort: ICustomSort;
}
export declare const CustomSortAdd: (CustomSort: ICustomSort) => CustomSortAddAction;
export declare const CustomSortEdit: (CustomSort: ICustomSort) => CustomSortEditAction;
export declare const CustomSortDelete: (CustomSort: ICustomSort) => CustomSortDeleteAction;
export declare const CustomSortReducer: Redux.Reducer<CustomSortState>;
