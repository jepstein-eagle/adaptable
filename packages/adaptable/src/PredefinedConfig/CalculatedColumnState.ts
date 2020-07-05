import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for the Calculated Column function
 *
 * Calculated Columns are columns created by users (using the Calculated Column Editor) where the cell value is calculated, dynamically, based off other columns in the row.
 *
 * Each Calculated Column contains an **Expression** which is used to evaluate the contents of the cell.
 *
 * The Expression can contain any number of functions and references to other columns in the grid as needed.
 *
 * Once created a Calculated Column is treated like any other Column in the Grid - though **only the name and Expression are stored** and not the cell data.
 *
 * **Further AdapTable Help Resources**
 *
 * [Calculated Column Demo](https://demo.adaptabletools.com/column/aggridcalculatedcolumndemo/)
 *
 * [Calculated Column Api](https://api.adaptabletools.com/interfaces/_src_api_calculatedcolumnapi_.calculatedcolumnapi)
 *
 * [Calculated Column Function Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/calculated-column-function.md)
 *
 **/
export interface CalculatedColumnState extends ConfigState {
  /**
   * A collection of Calculated Columns, i.e. columns that show a value which is derived from other values in the row, and which is stored with the user's state.
   *
   * **Default Value**:  Empty array
   */
  CalculatedColumns?: CalculatedColumn[];
}

export interface CalculatedColumn extends AdaptableObject {
  /**
   * The name of the Calculated Column.
   *
   * This is how it will appear in the Column Header (as caption).
   */
  ColumnId: string;

  /**
   * An **Expression** which will retrieve the value to display in the Column and is re-evaluated each time cells in the columns in the expression change.
   *
   * The expression (which is not the same as an Adaptable expression) can contain a number of functions and references to other columns in the grid as required.
   */
  ColumnExpression: string;

  /**
   * Addtional optional properties for the Column (e.g. if it is filterable, or resizable).
   *
   * Any properties not set will use the defaults (based on the return datatype of the Calculated Columns's Expression)
   */
  CalculatedColumnSettings?: CalculatedColumnSettings;
}

/**
 * Set of optional properties that define a Calculated Column's behaviour
 */
export interface CalculatedColumnSettings {
  /**
   * The DataType of the Expression's return value when it evaluates
   *
   * This is inferred by AdapTable but also setable by the User
   */
  DataType?: 'String' | 'Number' | 'Boolean' | 'Date';

  /**
   * The preferred width (in pixels) for the Column
   *
   * If not provided, the width will be set automatically by the underling grid based on other properties and columns
   */
  Width?: number;

  /**
   * Whether the Column is filterable
   *
   * Default Value: true
   */
  Filterable?: boolean;

  /**
   * Whether the Column is able to be resized (by dragging the column header ends)
   *
   * Default Value: true
   */
  Resizable?: boolean;

  /**
   * Whether the Column can be grouped
   *
   * Default Value: true
   */
  Groupable?: boolean;

  /**
   * Whether the Column is sortable
   *
   * Default Value: true
   */
  Sortable?: boolean;

  /**
   * Whether the Column can be used when the grid is in pivot mode
   *
   * Default Value: true
   */
  Pivotable?: boolean;

  /**
   * Whether the Column can be used in an aggregation when grouping
   *
   * Default Value: true
   */
  Aggregatable?: boolean;
}
