import { SparklineColumnState, SparklineColumn } from '../PredefinedConfig/SparklineColumnState';

/**
 * Provides full and comprehensive run-time access to the Sparkline Column function and associated state.
 * 
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/column/aggridsparklinecolumnsdemo/) | [State](_src_predefinedconfig_sparklinecolumnstate_.sparklinecolumnstate.html) | [Sparkline Column Function Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/charts/sparkline-column-function.md)

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
   * Returns true if the Column with given `columnId` is a Sparkline Column
   * @param columnId the id of the Column to check
   */
  isSparklineColumn(columnId: string): boolean;
}
