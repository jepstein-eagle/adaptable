import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux'
import { ApiBase } from "../ApiBase";

export interface IDataSourceApi {

  /**
  * Sets the dataSource
  * @param dataSource has to be an existing dataSource
  */
  Set(dataSource: string): void

  /**
   * Clears the currently selected dataSource
   */
  Clear(): void

}

