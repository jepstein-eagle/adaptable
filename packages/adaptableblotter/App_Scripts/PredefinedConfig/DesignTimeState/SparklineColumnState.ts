import { DesignTimeState } from './DesignTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

/**
 * The Predefined Configuration for Sparkline Columns
 *
 * An Sparkline Column is a column whose values are array of numbers, so each cell can be represented as a sparkline chart
 *
 *
 * ```ts
 * export default {
 * Sparkline: {
 *  Columns: [
 *   {
 *      ColumnId: 'Prices',
 *   },
 *   {
 *      ColumnId: 'Values'
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
  Columns?: SparklineColumn[];
}

/**
 * The SparklineColumn object used in the Advanced Search function.
 */
export interface SparklineColumn extends AdaptableBlotterObject {
  /**
   * The id of the Column
   *
   * If no value is set for the *FriendlyName* property, then this will be the name of the Column also (e.g. what appears in the Column Header)
   */
  ColumnId: string;

  /**
   * The type of the sparkline chart to display
   */
  SparklineType?: 'Line' | 'Column';
}
