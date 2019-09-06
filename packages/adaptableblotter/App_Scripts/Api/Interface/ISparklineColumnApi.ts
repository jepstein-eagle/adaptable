import {
  SparklineColumnState,
  SparklineColumn,
} from '../../PredefinedConfig/DesignTimeState/SparklineColumnState';

/**
 * Provides full and comprehensive run-time access to the Advanced Search function and associated state.
 */
export interface ISparklineColumnApi {
  /**
   * Retrieves the SparklineColumn State
   */
  getSparklineColumnState(): SparklineColumnState;

  /**
   * Returns all the Sparkline columns in the State
   */
  getAllSparklineColumn(): SparklineColumn[];
}
