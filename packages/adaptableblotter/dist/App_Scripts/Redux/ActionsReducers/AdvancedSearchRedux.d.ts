import { AdvancedSearchState } from './Interface/IState';
import * as Redux from 'redux';
import { IAdvancedSearch } from '../../Utilities/Interface/IAdaptableBlotterObjects';
export declare const ADVANCED_SEARCH_ADD_UPDATE = "ADVANCED_SEARCH_ADD_UPDATE";
export declare const ADVANCED_SEARCH_DELETE = "ADVANCED_SEARCH_DELETE";
export declare const ADVANCED_SEARCH_SELECT = "ADVANCED_SEARCH_SELECT";
export interface AdvancedSearchAddUpdateAction extends Redux.Action {
    index: number;
    advancedSearch: IAdvancedSearch;
}
export interface AdvancedSearchDeleteAction extends Redux.Action {
    advancedSearch: IAdvancedSearch;
}
export interface AdvancedSearchSelectAction extends Redux.Action {
    selectedSearchName: string;
}
export declare const AdvancedSearchAddUpdate: (index: number, advancedSearch: IAdvancedSearch) => AdvancedSearchAddUpdateAction;
export declare const AdvancedSearchDelete: (advancedSearch: IAdvancedSearch) => AdvancedSearchDeleteAction;
export declare const AdvancedSearchSelect: (selectedSearchName: string) => AdvancedSearchSelectAction;
export declare const AdvancedSearchReducer: Redux.Reducer<AdvancedSearchState>;
