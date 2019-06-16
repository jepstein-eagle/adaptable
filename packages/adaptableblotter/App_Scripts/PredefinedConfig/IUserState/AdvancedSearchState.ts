import { IUserState } from './IUserState';
import { Expression } from '../Common/Expression/Expression';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';

/**
 * The Predefined Configuration for Advanced Search
 */
export interface AdvancedSearchState extends IUserState {
  AdvancedSearches?: IAdvancedSearch[];
  CurrentAdvancedSearch?: string;
}

/**
 * The Advanced Search entity.
 * Contains the name of the Search and an Expression (the query object used in many IAdaptableBlotterObjects)
 */
export interface IAdvancedSearch extends IAdaptableBlotterObject {
  Name: string;
  Expression: Expression;
}
