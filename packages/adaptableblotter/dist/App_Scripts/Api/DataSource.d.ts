import { ApiBase } from "./ApiBase";
export interface IDataSourceApi {
    /**
    * Sets the dataSource
    * @param dataSource has to be an existing dataSource
    */
    Set(dataSource: string): void;
    /**
     * Clears the currently selected dataSource
     */
    Clear(): void;
}
export declare class DataSourceApi extends ApiBase implements IDataSourceApi {
    Set(dataSourceName: string): void;
    Clear(): void;
}
