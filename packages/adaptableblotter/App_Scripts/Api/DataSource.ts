import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as DataSourceRedux from '../Redux/ActionsReducers/DataSourceRedux'
import { ApiBase } from "./ApiBase";

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


export class DataSourceApi extends ApiBase implements IDataSourceApi {

  public Set(dataSourceName: string): void {
    let dataSource: string = this.getState().DataSource.DataSources.find(a => a == dataSourceName);
    if (this.checkItemExists(dataSource, dataSourceName, StrategyConstants.DataSourceStrategyName)) {
      this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource))
    }
  }

  public Clear(): void {
    this.dispatchAction(DataSourceRedux.DataSourceSelect(""))
  }
}