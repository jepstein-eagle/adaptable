import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from './AdaptableBlotterObject';

/**
 * The Predefined Configuration for the Calculated Column function
 *
 * Calculated Columns are columns created by users where the cell value is calculated, dynamically, based off other columns in the row.
 *
 * Each Calculated Column contains an **Expression** which is used to evaluate the contents of the cell.
 *
 * The Adaptable Blotter uses an external library [mathjs](https://mathjs.org) to create the Expression.
 *
 * Once created a Calculated Column is treated like any other Column in the Grid - though **only the name and Expression are stored** and not the cell data.
 *
 * **Further Resources**
 *
 * [Calculated Column Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360003213038-Special-Column-Functions)
 *
 * [Calculated Column Demo](https://demo.adaptableblotter.com/column/aggridcalculatedcolumndemo/)
 *
 * [Calculated Column API](_api_calculatedcolumnapi_.calculatedcolumnpi.html)
 *
 * [Calculated Column FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360030078351-Calculated-Column-FAQ)
 *
 * [Calculated Column Help](https://adaptabletools.zendesk.com/hc/en-us/articles/360005113212-Calculated-Columns)
 *
 **/
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
   * An **Expression** which will retrieve the value to display in the Column and is re-evaluated each time cells in the columns in the expression change.
   *
   * The expression (which is not the same as an Adaptable Blotter expression) evaluates using the [mathjs library](https://mathjs.org).
   */
  ColumnExpression: string;
}
