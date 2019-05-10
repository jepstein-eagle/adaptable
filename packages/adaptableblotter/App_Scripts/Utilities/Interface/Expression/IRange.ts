import { LeafExpressionOperator } from '../../Enums';
/**
 * Objects which performs comparisons on values or other columns
 */
export interface IRange {
  /**
   * Operator for the range (e.g. Greater Than, Equals), varies according to the column data type
   */
  Operator: LeafExpressionOperator;
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
