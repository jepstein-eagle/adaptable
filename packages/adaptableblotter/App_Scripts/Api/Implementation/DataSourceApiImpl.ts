import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux';
import { ApiBase } from './ApiBase';
import { DataSourceApi } from '../DataSourceApi';
import { DataSourceState, DataSource } from '../../PredefinedConfig/DataSourceState';

export class DataSourceApiImpl extends ApiBase implements DataSourceApi {
  public getDataSourceState(): DataSourceState {
    return this.getBlotterState().DataSource;
  }

  public getAllDataSource(): DataSource[] {
    return this.getDataSourceState().DataSources;
  }

  public getCurrentDataSource(): DataSource {
    let currentDataSourceName: string = this.getDataSourceState().CurrentDataSource;
    return this.getDataSourceByName(currentDataSourceName);
  }

  public getDataSourceByName(dataSourceName: string): DataSource {
    return this.getAllDataSource().find(a => a.Name == dataSourceName);
  }

  public setDataSource(dataSourceName: string): void {
    let dataSource: DataSource = this.getBlotterState().DataSource.DataSources.find(
      a => a.Name == dataSourceName
    );
    if (
      this.checkItemExists(
        dataSource,
        dataSourceName,
        StrategyConstants.DataSourceStrategyFriendlyName
      )
    ) {
      this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource.Name));
    }
  }

  public createDataSource(dataSourceName: string, dataSourceDescription: string): void {
    let dataSource: DataSource = {
      Name: dataSourceName,
      Description: dataSourceDescription,
    };
    this.addDataSource(dataSource);
  }

  public addDataSource(dataSource: DataSource): void {
    this.dispatchAction(DataSourceRedux.DataSourceAdd(dataSource));
  }

  public clearDataSource(): void {
    this.dispatchAction(DataSourceRedux.DataSourceSelect(''));
  }

  public showDataSourcePopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.DataSourceStrategyId,
      ScreenPopups.DataSourcePopup
    );
  }
}
