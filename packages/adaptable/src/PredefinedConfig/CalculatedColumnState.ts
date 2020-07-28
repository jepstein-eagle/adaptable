import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { DataType } from './Common/Enums';

/**
 * The Predefined Configuration for the Calculated Column function
 *
 * Calculated Columns are columns created by users where the cell value is calculated, dynamically, based off other columns in the row.
 *
 * Each Calculated Column contains an **Expression** which is used to evaluate the contents of the cell.
 *
 * Adaptable uses an external library [mathjs](https://mathjs.org) to create the Expression.
 *
 * Once created a Calculated Column is treated like any other Column in the Grid - though **only the name and Expression are stored** and not the cell data.
 *
 * **Further AdapTable Help Resources**
 *
 * [Calculated Column Demo](https://demo.adaptabletools.com/column/aggridcalculatedcolumndemo/)
 *
 * [Calculated Column API](_src_api_calculatedcolumnapi_.calculatedcolumnpi.html)
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

  FriendlyName?: string;

  /**
   * An **Expression** which will retrieve the value to display in the Column and is re-evaluated each time cells in the columns in the expression change.
   *
   * The expression (which is not the same as an Adaptable expression) evaluates using the [mathjs library](https://mathjs.org).
   */
  ColumnExpression: string;
  CalculatedColumnSettings?: CalculatedColumnSettings;
}

export interface CalculatedColumnSettings {
  DataType?: 'String' | 'Number' | 'Boolean' | 'Date';

  Width?: number;

  Filterable?: boolean;

  Resizable?: boolean;

  Groupable?: boolean;

  Sortable?: boolean;

  Pivotable?: boolean;

  Aggregatable?: boolean;
}
