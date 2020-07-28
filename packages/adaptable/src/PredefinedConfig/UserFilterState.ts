import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression } from './Common/Expression';

/**
 *
 * The Predefined Configuration for User Filters
 *
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [User Filter Demo](https://demo.adaptabletools.com/filters/aggriduserfiltersdemo/)
 *
 * {@link UserFilterApi|User Filter API}
 *
 * [User Filter Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/user-filter-function.md)
 *
 * [Adaptable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 * --------------
 *
 *  As well as User Filters, AdapTable offers 3 other types of Filters:
 *
 *  | Filter Type                                   | Usage
 *  | -----------                                   | -----------
 *  | {@link ColumnFilterState|Column}      | Filter a single Column using either a list of Column Values or a Range
 *  | {@link NamedFilterState|Named}        | Filters which are provided at design-time together with a predicate function that is called each time it needs to be evaluated
 *  | {@link SystemFilterState|System}      | A predefined list of Filters shipped with AdapTable (e.g. 'Yesterday', 'Positive')
 *
 * Read more at the [Adaptable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 */
export interface UserFilterState extends ConfigState {
  UserFilters?: UserFilter[];
}

/**
 * A User Filter is a filter provided to Adaptable by users (or created through the UI).
 *
 * It wraps an Expression object (aka a Query) and operates on a single column
 *
 * **note; this will shortly be updated to take a Scope object so that it can work across mutliple columns or a single DataType**
 */
export interface UserFilter extends AdaptableObject {
  /**
   * The name of the User Filter - how it will appear in Column Filters and the Query Builder screen
   */
  Name: string;

  /**
   * The Expression which is evaluated each time the Filter is run to see if the value passes or not
   */
  Expression: Expression;

  /**
   * The Column on which the Expression will be run
   *
   * The UI currently restricts User Filters to only have a single Column (as otherwise they would be meaningless)
   *
   * This will shortly be updated to take a Scope object.
   */
  ColumnId: string;
}
