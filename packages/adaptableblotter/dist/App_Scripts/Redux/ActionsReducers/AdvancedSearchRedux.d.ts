import { AdvancedSearchState } from './Interface/IState';
import * as Redux from 'redux';
import { IAdvancedSearch } from '../../Api/Interface/IAdaptableBlotterObjects';
export declare const ADVANCED_SEARCH_ADD_UPDATE = "ADVANCED_SEARCH_ADD_UPDATE";
export declare const ADVANCED_SEARCH_DELETE = "ADVANCED_SEARCH_DELETE";
export declare const ADVANCED_SEARCH_SELECT = "ADVANCED_SEARCH_SELECT";
export interface AdvancedSearchAddUpdateAction extends Redux.Action {
    Index: number;
    AdvancedSearch: IAdvancedSearch;
}
export interface AdvancedSearchDeleteAction extends Redux.Action {
    AdvancedSearch: IAdvancedSearch;
}
export interface AdvancedSearchSelectAction extends Redux.Action {
    SelectedSearchName: string;
}
export declare const AdvancedSearchAddUpdate: (Index: number, AdvancedSearch: IAdvancedSearch) => AdvancedSearchAddUpdateAction;
export declare const AdvancedSearchDelete: (AdvancedSearch: IAdvancedSearch) => AdvancedSearchDeleteAction;
export declare const AdvancedSearchSelect: (SelectedSearchName: string) => AdvancedSearchSelectAction;
export declare const AdvancedSearchReducer: Redux.Reducer<AdvancedSearchState>;
