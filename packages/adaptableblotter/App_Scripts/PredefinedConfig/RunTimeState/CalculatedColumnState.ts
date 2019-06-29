import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

export interface CalculatedColumnState extends RunTimeState {
  /**
   * A collection of Calculated Columns, i.e. columns that show a value which is derived from other values in the row, and which is stored with the user's state.
   *
   * **Default Value**:  Empty array
   */
  CalculatedColumns?: CalculatedColumn[];
}

export interface CalculatedColumn extends AdaptableBlotterObject {
  /**
   * The name of the Calculated Column.
   *
   * This is how it will appear in the Column Header (as caption).
   */
  ColumnId: string;

  /**
   * An expression which will retrieve the value to display in the Column and is re-evaluated each time cells in the columns in the expression change.
   *
   * The expression (which is not the same as an Adaptable Blotter expression) evaluates using the math.js library.
   */
  ColumnExpression: string;
}

/*
A collection of Calculated Columns.

An ICalculatedColumn consists of just 2 properties:

ColumnId: 

ColumnExpression: An expression which will retrieve the value - see Calculated Columns for more details.
*/
