import { IRangeExpression } from './Interface/Expression/IRangeExpression';
import { IFilterExpression } from './Interface/Expression/IFilterExpression';
import { IColumnValueExpression } from './Interface/Expression/IColumnValueExpression';
import { createUuid, TypeUuid } from './Uuid';

/**
 * The main Expression object - comprised of 3 collections: Column Values, Filters and Ranges
 */
export class Expression {
  /**
   * @property {Uuid} - unique identifier for the expression
   */
  public Uuid: TypeUuid;

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
    public ColumnValueExpressions: IColumnValueExpression[],
    public FilterExpressions: IFilterExpression[],
    public RangeExpressions: IRangeExpression[]
  ) {
    this.ColumnValueExpressions = ColumnValueExpressions;
    this.FilterExpressions = FilterExpressions;
    this.RangeExpressions = RangeExpressions;
    this.Uuid = createUuid();
  }
}
