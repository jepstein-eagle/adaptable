import { FilterExpression } from './FilterExpression';
import { ColumnValueExpression } from './ColumnValueExpression';
import { createUuid, TypeUuid } from '../../Uuid';
import { RangeExpression } from './RangeExpression';

/**
 * The main Expression (or Query) object used in multiple Adaptable Blotter functions
 *
 * It is comprised of 3 (nullable) collections:
 *
 * - Column Values: actual cell value in the a Column - can be either Display or Raw Values
 *
 * - Filters: can be a mix of *Column Filters* (created by the user at run-time), *System Filters* (filters which are shipped by the Adaptable Blotter) and *User Filters* (special filters which the user creates and names and can then re-use as required).
 *
 * - Ranges: an evaluation (e.g. 'GreaterThan 15', 'LessThan [Bid]' etc.)
 */
export class Expression {
  /**
   * @property {Uuid} - unique identifier for the expression - nullable and created automatically by the Adaptable Blotter
   */
  public Uuid?: TypeUuid;

  /**
   * @property {ColumnValueExpressions} - Column values (as displayed in the Grid)
   */
  /**
   * @property {FilterExpressions} - User, System and Column Filters contained in the expression
   */
  /**
   * @property {RangeExpressions} - Ranges contained in the expression
   */
  constructor(
    public ColumnValueExpressions?: ColumnValueExpression[],
    public FilterExpressions?: FilterExpression[],
    public RangeExpressions?: RangeExpression[]
  ) {
    this.ColumnValueExpressions = ColumnValueExpressions == undefined ? [] : ColumnValueExpressions;
    this.FilterExpressions = FilterExpressions == undefined ? [] : FilterExpressions;
    this.RangeExpressions = RangeExpressions == undefined ? [] : RangeExpressions;
    this.Uuid = createUuid();
  }
}
