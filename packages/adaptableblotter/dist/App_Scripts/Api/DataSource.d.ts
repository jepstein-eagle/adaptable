import { ApiBase } from "./ApiBase";
import { IDataSourceApi } from './Interface/IDataSource';
export declare class DataSourceApi extends ApiBase implements IDataSourceApi {
    Set(dataSourceName: string): void;
    Clear(): void;
}
