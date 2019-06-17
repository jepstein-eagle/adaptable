import { RunTimeState } from './RunTimeState';
import { Expression } from '../Common/Expression/Expression';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

/**
 * The Predefined Configuration for Advanced Search
 */
export interface AdvancedSearchState extends RunTimeState {
  AdvancedSearches?: AdvancedSearch[];
  CurrentAdvancedSearch?: string;
}

/**
 * The Advanced Search entity.
 * Contains the name of the Search and an Expression (the query object used in many IAdaptableBlotterObjects)
 */
export interface AdvancedSearch extends AdaptableBlotterObject {
  Name: string;
  Expression: Expression;
}
