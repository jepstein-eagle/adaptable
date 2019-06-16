import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as DataSourceRedux from '../Redux/ActionsReducers/DataSourceRedux';
import { ApiBase } from './ApiBase';
import { IDataSourceApi } from './Interface/IDataSourceApi';
import {
  DataSourceState,
  IDataSource,
} from '../PredefinedConfig/IUserState Interfaces/DataSourceState';

export class DataSourceApi extends ApiBase implements IDataSourceApi {
  public getDataSourceState(): DataSourceState {
    return this.getBlotterState().DataSource;
  }

  public getAllDataSource(): IDataSource[] {
    return this.getDataSourceState().DataSources;
  }

  public getCurrentDataSource(): IDataSource {
    let currentDataSourceName: string = this.getDataSourceState().CurrentDataSource;
    return this.getDataSourceByName(currentDataSourceName);
  }

  public getDataSourceByName(dataSourceName: string): IDataSource {
    return this.getAllDataSource().find(a => a.Name == dataSourceName);
  }

  public setDataSource(dataSourceName: string): void {
    let dataSource: IDataSource = this.getBlotterState().DataSource.DataSources.find(
      a => a.Name == dataSourceName
    );
    if (
      this.checkItemExists(dataSource, dataSourceName, StrategyConstants.DataSourceStrategyName)
    ) {
      this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource.Name));
    }
  }

  public createDataSource(dataSourceName: string, dataSourceDescription: string): void {
    let dataSource: IDataSource = {
      Name: dataSourceName,
      Description: dataSourceDescription,
    };
    this.addDataSource(dataSource);
  }

  public addDataSource(dataSource: IDataSource): void {
    this.dispatchAction(DataSourceRedux.DataSourceAdd(dataSource));
  }

  public clearDataSource(): void {
    this.dispatchAction(DataSourceRedux.DataSourceSelect(''));
  }
}
