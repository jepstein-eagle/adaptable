import { DesignTimeState } from './DesignTimeState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for Sparkline Columns
 *
 * An Sparkline Column is a column whose values are array of numbers, so each cell can be represented as a sparkline chart
 *
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
 *   },
 *  ],
 *  },
 * } as PredefinedConfig;
 * ```
 */
export interface SparklineColumnState extends DesignTimeState {
  /**
   * The list of column you want to represent with sparklines
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
