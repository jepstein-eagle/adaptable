import { IDataSource } from '../../Utilities/Interface/BlotterObjects/IDataSource';
import { DataSourceState } from '../../Redux/ActionsReducers/Interface/IState';
export interface IDataSourceApi {
    getDataSourceState(): DataSourceState;
    getAllDataSource(): IDataSource[];
    getCurrentDataSource(): IDataSource;
    getDataSourceByName(dataSourceName: string): IDataSource;
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
    addDataSource(dataSource: IDataSource): void;
    /**
     * Clears the currently selected DataSource
     */
    clearDataSource(): void;
}
