import { ApiBase } from "./ApiBase";
import { IDataSourceApi } from './Interface/IDataSourceApi';
import { IDataSource } from '../Utilities/Interface/BlotterObjects/IDataSource';
export declare class DataSourceApi extends ApiBase implements IDataSourceApi {
    Set(dataSourceName: string): void;
    Create(dataSourceName: string, dataSourceDescription: string): void;
    Add(dataSource: IDataSource): void;
    Clear(): void;
}
