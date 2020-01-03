import { SparklineColumnState, SparklineColumn } from '../PredefinedConfig/SparklineColumnState';

/**
 * Provides full and comprehensive run-time access to the Advanced Search function and associated state.
 */
export interface SparklineColumnApi {
  /**
   * Retrieves the SparklineColumn section from Adaptable State
   */
  getSparklineColumnState(): SparklineColumnState;

  /**
   * Returns all the Sparkline columns in Adaptable State
   */
  getAllSparklineColumn(): SparklineColumn[];

  /**
   * Returns true if the Column with given ColId is a Sparkline Column
   * @param colId the id of the Column to check
   */
  isSparklineColumn(colId: string): boolean;
}
