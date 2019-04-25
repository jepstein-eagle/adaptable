import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as DataSourceRedux from '../Redux/ActionsReducers/DataSourceRedux'
import { ApiBase } from "./ApiBase";
import { IDataSourceApi } from './Interface/IDataSourceApi';
import { IDataSource } from '../Utilities/Interface/BlotterObjects/IDataSource';
import { DataSourceState } from '../Redux/ActionsReducers/Interface/IState';


export class DataSourceApi extends ApiBase implements IDataSourceApi {

  
  public GetState(): DataSourceState {
    return this.getBlotterState().DataSource;
}

public Set(dataSourceName: string): void {
    let dataSource: IDataSource = this.getBlotterState().DataSource.DataSources.find(a => a.Name == dataSourceName);
    if (this.checkItemExists(dataSource, dataSourceName, StrategyConstants.DataSourceStrategyName)) {
      this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource.Name))
    }
  }

  public Create(dataSourceName: string, dataSourceDescription: string): void {
    let dataSource: IDataSource = {
      Name: dataSourceName,
      Description: dataSourceDescription
    }
    this.Add(dataSource);
  }

  public Add(dataSource: IDataSource): void {
      this.dispatchAction(DataSourceRedux.DataSourceAddUpdate(-1, dataSource))
  }

  public Clear(): void {
    this.dispatchAction(DataSourceRedux.DataSourceSelect(""))
  }
}