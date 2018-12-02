import { IColumnValueExpression, IFilterExpression, IRangeExpression } from "./Interface/IAdaptableBlotterObjects";
/**
 * The main Expression object - comprised of 3 collections: Column Values, Filters and Ranges
 */
export declare class Expression {
    ColumnValueExpressions: IColumnValueExpression[];
    FilterExpressions: IFilterExpression[];
    RangeExpressions: IRangeExpression[];
    /**
       * @property {ColumnValueExpressions} - Column values (as displayed in the Grid)
       */
    /**
   * @property {FilterExpressions} - User, System and Column Filters contained in the expression
   */
    /**
     * @property {RangeExpressions} - Ranges contained in the expression
     */
    constructor(ColumnValueExpressions: IColumnValueExpression[], FilterExpressions: IFilterExpression[], RangeExpressions: IRangeExpression[]);
}
