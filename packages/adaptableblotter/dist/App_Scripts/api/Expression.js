"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The main Expression object - comprised of 3 collections: Column Values, Filters and Ranges
 */
class Expression {
    /**
       * @property {ColumnValueExpressions} - Column values (as displayed in the Grid)
       */
    /**
   * @property {FilterExpressions} - User, System and Column Filters contained in the expression
   */
    /**
     * @property {RangeExpressions} - Ranges contained in the expression
     */
    constructor(ColumnValueExpressions, FilterExpressions, RangeExpressions) {
        this.ColumnValueExpressions = ColumnValueExpressions;
        this.FilterExpressions = FilterExpressions;
        this.RangeExpressions = RangeExpressions;
    }
}
exports.Expression = Expression;
