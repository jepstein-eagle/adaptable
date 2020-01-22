import { DesignTimeState } from './DesignTimeState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for Sparkline Columns
 *
 * A Sparkline Column is a column which contains an array of numbers as its value.
 *
 * As a result, each cell in the column can be represented as a sparkline chart.
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/column/aggridsparklinecolumnsdemo/) | [API](_api_sparklinecolumnapi_.sparklinecolumnapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360002449478-Sparkline-Column-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360002449498-Sparkline-Column-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360003213038-Special-Column-Functions)
 *
 * **Sparkline Column Predefined Config Example**
 *
 * * ```ts
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
 */
export interface SparklineColumnState extends DesignTimeState {
  /**
   * The list of columns you want to represent as `SparklineColumn`
   *
   * Each SparklineColumn contains the following properties:
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
 * The SparklineColumn object used in the Advanced Search function.
 */
export interface SparklineColumn extends AdaptableObject {
  /**
   * The id of the Column
   *
   * If no value is set for the *FriendlyName* property, then this will be the name of the Column also (e.g. what appears in the Column Header)
   */
  ColumnId: string;

  /**
   * The type of the sparkline chart to display
   */
  SparklineType?: 'Line' | 'Column' | 'Area';

  /**
   * The value to be considered the minimum value for the sparkline chart of the column
   */
  MinimumValue?: number;

  /**
   * The value to be considered the maximum value for the sparkline chart of the column
   */
  MaximumValue?: number;

  /**
   * Whether to show a tooltip which will display the underlying values in the Sparklne
   */
  ShowToolTip?: boolean;

  /**
   * Colour of the Sparkline line
   */
  LineColor?: string;
}
