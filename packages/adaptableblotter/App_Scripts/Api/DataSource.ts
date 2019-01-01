import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as DataSourceRedux from '../Redux/ActionsReducers/DataSourceRedux'
import { ApiBase } from "./ApiBase";

export interface IDataSourceApi {

  /**
  * Selects the dataSource
  * @param dataSource has to be an existing dataSource
  */
  dataSourceSet(dataSource: string): void

  /**
   * Clears the currently selected dataSource
   */
  dataSourceClear(): void

}


export class DataSourceApi extends ApiBase implements IDataSourceApi {

  // Data Source api methods
  public dataSourceSet(dataSourceName: string): void {
    let dataSource: string = this.getState().DataSource.DataSources.find(a => a == dataSourceName);
    if (this.checkItemExists(dataSource, dataSourceName, StrategyConstants.DataSourceStrategyName)) {
      this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource))
    }
  }

  public dataSourceClear(): void {
    this.dispatchAction(DataSourceRedux.DataSourceSelect(""))
  }
}