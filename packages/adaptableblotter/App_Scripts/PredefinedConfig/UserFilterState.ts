import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression } from './Common/Expression';

/**
 * 
 * blah 
 * 
 * 
 * Adaptable Blotter has 4 different types of configuration filters - ColumnFilters, UserFilters and SystemFilters.

 */
export interface UserFilterState extends RunTimeState {
  UserFilters?: UserFilter[];
}

/**
 * A User Filter is a filter provided to the Adaptable Blotter by users (or created through the UI).
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
