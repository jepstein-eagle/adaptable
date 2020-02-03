import { SparklineColumnState, SparklineColumn } from '../PredefinedConfig/SparklineColumnState';

/**
 * Provides full and comprehensive run-time access to the Sparkline Column function and associated state.
 * 
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/column/aggridsparklinecolumnsdemo/) | [State](_predefinedconfig_sparklinecolumnstate_.sparklinecolumnstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360002449478-Sparkline-Column-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360002449498-Sparkline-Column-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360003213038-Special-Column-Functions)

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
