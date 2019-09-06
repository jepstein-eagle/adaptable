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
  Columns?: SparklineColumn[];
}

export enum SparklineTypeEnum {
  Line = 'Line',
  Column = 'Column',
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

  /**
   * The value to be considered the minimum value for the sparkline chart of the column
   */
  MinimumValue?: number;

  /**
   * The value to be considered the maximum value for the sparkline chart of the column
   */
  MaximumValue?: number;
}
