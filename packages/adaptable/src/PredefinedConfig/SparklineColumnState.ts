import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for Sparkline Columns
 *
 * A Sparkline Column is a column which contains an array of numbers as its value.
 *
 * As a result, each cell in the column can be represented as a Sparkline chart.
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/column/aggridsparklinecolumnsdemo/) | [API](_src_api_sparklinecolumnapi_.sparklinecolumnapi.html) | [Sparkline Column Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/charts/sparkline-column-function.md)
 *
 * **Sparkline Column Predefined Config Example**
 *
 * ```ts
 * export default {
 * SparklineColumn: {
 *  SparklineColumns: [
 *   {
 *      ColumnId: 'Prices',
 *   },
 *   {
 *      ColumnId: 'Values',
 *      MinimumValue: 20,
 *      MaximumValue: 1000,
 *      SparklineType: 'Line'
 *      ShowToolTip: true
 *   },
 *  ],
 *  },
 * } as PredefinedConfig;
 * ```
 *
 *  In this example we have created 2 Sparkline Columns:
 *
 * - 'Prices' - which uses default settings
 *
 * - 'Values' - which sets a min and max value, makes the Sparkline type 'Line' and shows the tooltip
 *
 */
export interface SparklineColumnState extends ConfigState {
  /**
   * The list of columns you want to represent as `SparklineColumn`
   *
   * Each Sparkline Column contains the following properties:
   *
   * - ColumnId: Name of the Column (will appear in the header)
   *
   * - SparklineType: 'Line', 'Column' or 'Area'
   *
   * - MinimumValue: The min value to show;
   *
   * - MaximumValue: The max value to show;
   *
   * - ShowToolTip: Whether to show a tooltip displaying the underlying values;
   *
   * - LineColor: The colour to use if the type is 'Line';
   */
  SparklineColumns?: SparklineColumn[];
}

/**
 * The SparklineColumn object used in the Sparkline Column function.
 *
 * A Sparkline Column is a column which contains an array of numbers as its value.
 *
 * As a result, each cell in the column can be represented as a Sparkline chart.
 */
export interface SparklineColumn extends AdaptableObject {
  /**
   * The id of the Column
   *
   */
  ColumnId: string;

  /**
   * The type of the Sparkline chart to display
   */
  SparklineType?: 'Line' | 'Column' | 'Area';

  /**
   * The value to be considered the minimum value for the Sparkline chart of the column
   */
  MinimumValue?: number;

  /**
   * The value to be considered the maximum value for the Sparkline chart of the column
   */
  MaximumValue?: number;

  /**
   * Whether to show a tooltip which will display the underlying values in the Sparkline
   */
  ShowToolTip?: boolean;

  /**
   * Colour of the Sparkline line
   */
  LineColor?: string;
}
