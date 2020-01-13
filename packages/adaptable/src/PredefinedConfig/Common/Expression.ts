import { createUuid, TypeUuid } from '../Uuid';

/**
 * The main Expression (or Query) object used in multiple Adaptable functions
 *
 * It is comprised of 3 (nullable) collections:
 *
 * - Column Values: actual cell value in the a Column - can be either Display or Raw Values
 *
 * - Filters: can be a mix of *Column Filters* (created by the user at run-time), *System Filters* (filters which are shipped by Adaptable) and *User Filters* (special filters which the user creates and names and can then re-use as required).
 *
 * - Ranges: an evaluation (e.g. 'GreaterThan 15', 'LessThan [Bid]' etc.)
 */
export class Expression {
  /**
   * @property {Uuid} - unique identifier for the expression - nullable and created automatically by Adaptable
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

/**
 * Any column display (and optionally raw) values contained in the expression, grouped by column
 */
export interface ColumnValueExpression {
  ColumnId: string;
  ColumnDisplayValues: string[];
  ColumnRawValues?: string[];
}

/**
 * Any filters in the expression, grouped by column.
 *
 * There are 3 types of Filter that can be included here:
 *
 * [User Filters](../interfaces/_predefinedconfig_runtimestate_userfilterstate_.userfilterstate.html) - created by the User at RunTime and saved for re-use
 *
 * [System Filters](../interfaces/_predefinedconfig_designtimestate_systemfilterstate_.systemfilterstate.htm) - provided by Adaptable (e.g. 'Today', 'Positive', 'Blanks' etc.)
 *
 * [Named Filters](../interfaces/_predefinedconfig_runtimestate_namedfilterstate_.namedfilterstate.html) - created by developers at Design Time (who provide in Adavnced Options the function that will be applied).
 */
export interface FilterExpression {
  /**
   * The Column which has the Filters applied
   */
  ColumnId: string;

  /**
   * The **names** of the Filters which will be applied
   */
  Filters: string[];
}

/**
 * Any ranges contained in the expression, grouped by column
 */
export interface RangeExpression {
  ColumnId: string;
  Ranges: QueryRange[];
}

/**
 * Objects which performs comparisons on values or other columns
 */
export interface QueryRange {
  /**
   * Operator for the range (e.g. Greater Than, Equals), sometimes varies according to the column data type
   */
  Operator:
    | 'None'
    | 'GreaterThan'
    | 'LessThan'
    | 'Equals'
    | 'NotEquals'
    | 'GreaterThanOrEqual'
    | 'LessThanOrEqual'
    | 'Between'
    | 'Contains'
    | 'NotContains'
    | 'StartsWith'
    | 'EndsWith'
    | 'Regex'
    | 'AnyChange'
    | 'ValueChange'
    | 'PercentChange'
    | 'NotBetween'
    | 'IsPositive'
    | 'IsNegative'
    | 'IsNotNumber'
    | 'IsTrue'
    | 'IsFalse'
    | 'NoDuplicateValues'
    | 'ExistingValuesOnly'
    | 'PrimaryKeyDuplicate';
  /**
   * Comparison value - can either be a static column valur or name of another column (set in Operand1Type property)
   */
  Operand1: string;
  /**
   * Comparison value - can either be a static column valur or name of another column (set in Operand2Type property).  Only used when operator is 'Between'
   */
  Operand2: string;
  /**
   * Whether first operand is a static value or the name of a column; if latter then we look up that column's value in real time when evaluating the expression
   */
  Operand1Type: 'Value' | 'Column';
  /**
   * Whether second operand is a static value or the name of a column; if latter then we look up that column's value in real time when evaluating the expression
   */
  Operand2Type: 'Value' | 'Column';
}
