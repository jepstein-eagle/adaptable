import {
  SparklineColumnState,
  SparklineColumn,
} from '../../PredefinedConfig/DesignTimeState/SparklineColumnState';

/**
 * Provides full and comprehensive run-time access to the Advanced Search function and associated state.
 */
export interface ISparklineColumnApi {
  /**
   * Retrieves the SparklineColumn section from the Adaptable Blotter State
   */
  getSparklineColumnState(): SparklineColumnState;

  /**
   * Returns all the Sparkline columns in the Adaptable Blotter State
   */
  getAllSparklineColumn(): SparklineColumn[];

  /**
   * Returns true if the Column with given ColId is a Sparkline Column
   * @param colId the id of the Column to check
   */
  isSparklineColumn(colId: string): boolean;
}
