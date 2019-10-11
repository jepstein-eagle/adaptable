import { DataSourceState, DataSource } from '../../PredefinedConfig/RunTimeState/DataSourceState';

export interface IDataSourceApi {
  getDataSourceState(): DataSourceState;

  getAllDataSource(): DataSource[];

  getCurrentDataSource(): DataSource;

  getDataSourceByName(dataSourceName: string): DataSource;

  /**
   * Sets the DataSource
   * @param dataSource has to be an existing DataSource
   */
  setDataSource(dataSource: string): void;

  /**
   * Creates a DataSource from a given name and description
   * @param dataSourceName
   * @param dataSourceDescription
   */
  createDataSource(dataSourceName: string, dataSourceDescription: string): void;

  /**
   * Adds a new DataSource
   * @param dataSource
   */
  addDataSource(dataSource: DataSource): void;

  /**
   * Clears the currently selected DataSource
   */
  clearDataSource(): void;

  /**
   * Opens the Data Source popup screen
   */
  showDataSourcePopup(): void;
}
