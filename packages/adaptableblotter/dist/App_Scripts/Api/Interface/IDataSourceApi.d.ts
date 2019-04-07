import { IDataSource } from '../../Utilities/Interface/BlotterObjects/IDataSource';
export interface IDataSourceApi {
    /**
    * Sets the DataSource
    * @param dataSource has to be an existing DataSource
    */
    Set(dataSource: string): void;
    /**
     * Creates a DataSource from a given name and description
     * @param dataSourceName
     * @param dataSourceDescription
     */
    Create(dataSourceName: string, dataSourceDescription: string): void;
    /**
     * Adds a new DataSource
     * @param dataSource
     */
    Add(dataSource: IDataSource): void;
    /**
     * Clears the currently selected DataSource
     */
    Clear(): void;
}
