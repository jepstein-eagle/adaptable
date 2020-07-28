import { CalculatedColumnState, CalculatedColumn } from '../PredefinedConfig/CalculatedColumnState';

/**
 * Provides full and comprehensive run-time access to the Calculated Column function
 *
 * Calculated Columns are columns created by users (using the Calculated Column Editor) where the cell value is calculated, dynamically, based off other columns in the row.
 *
 * Each Calculated Column contains an **Expression** which is used to evaluate the contents of the cell.
 *
 * The Expression can contain any number of functions and references to other columns in the grid as needed.
 *
 * Once created a Calculated Column is treated like any other Column in the Grid - though **only the name and Expression are stored** and not the cell data.
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Calculated Column Demo](https://demo.adaptabletools.com/column/aggridcalculatedcolumndemo/)
 *
 * {@link CalculatedColumnState|Calculated Column State}
 *
 * [Calculated Column Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/calculated-column-function.md)
 *
 **/
export interface CalculatedColumnApi {
  /**
   * Retrieves the Calculated Column section from Adaptable State
   */
  getCalculatedColumnState(): CalculatedColumnState;

  /**
   * Retrieves all Calculated Columns in the Adaptable State
   */
  getAllCalculatedColumn(): CalculatedColumn[];

  /**
   * Adds a new Calculated Column to the State
   * @param calculatedColumn Calculated Column to add
   */
  addCalculatedColumn(calculatedColumn: CalculatedColumn): void;

  /**
   * Edits the given Calculated Column (essentially replaces the Calculated Column with that ColumnId in the State with the inputted one)
   * @param calculatedColumn Calculated Column to edit
   */
  editCalculatedColumn(calculatedColumn: CalculatedColumn): void;

  /**
   * Replaces the Expression for a given Calculated Column with the inputted value
   * @param column Calculated Column for which the Expression should change
   * @param columnExpression The new Expression for the Calculated Column
   */
  editCalculatedColumnExpression(column: string, columnExpression: string): void;

  /**
   * Removes a Calculated Column from the State
   *
   * Note: This fumction does NOT run a check to see where else the Calculated Column is reffered to (e.g. in a Layout or Conditional Style)
   * @param column Calculated Column to delete
   */
  deleteCalculatedColumn(column: string): void;

  /**
   * Opens the Calculated Column popup screen
   */
  showCalculatedColumnPopup(): void;
}
