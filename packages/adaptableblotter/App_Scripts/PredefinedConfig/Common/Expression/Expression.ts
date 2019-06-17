import { FilterExpression } from './FilterExpression';
import { ColumnValueExpression } from './ColumnValueExpression';
import { createUuid, TypeUuid } from '../../Uuid';
import { RangeExpression } from './RangeExpression';

/**
 * The main Expression object - comprised of 3 collections: Column Values, Filters and Ranges
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
    public ColumnValueExpressions: ColumnValueExpression[],
    public FilterExpressions: FilterExpression[],
    public RangeExpressions: RangeExpression[]
  ) {
    this.ColumnValueExpressions = ColumnValueExpressions;
    this.FilterExpressions = FilterExpressions;
    this.RangeExpressions = RangeExpressions;
    this.Uuid = createUuid();
  }
}
