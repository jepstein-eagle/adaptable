import { IDisplayValueExpression, IRawValueExpression, IFilterExpression, IRangeExpression } from "./Interface/AdaptableBlotterObjects";


/**
 * The main Expression object - comprised of 4 collections
 */
export class Expression {
  /**
     * @property {DisplayValueExpressions} - Column values as displayed in the Grid.
     */
  /**
   * @property {RawValueExpressions} - Underlying column values (typically used when numbers are formatted)
   */
  /**
  * @property {FilterExpressions} - User, System and Column Filters contained in the expression
  */
  /**
   * @property {RangeExpressions} - Ranges contained in the expression
   */
  constructor(
    public DisplayValueExpressions: IDisplayValueExpression[],
    public RawValueExpressions: IRawValueExpression[],
    public FilterExpressions: IFilterExpression[],
    public RangeExpressions: IRangeExpression[]
  ) {
  }
}

