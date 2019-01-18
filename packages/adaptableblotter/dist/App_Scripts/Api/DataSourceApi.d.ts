import { ApiBase } from "./ApiBase";
import { IDataSourceApi } from './Interface/IDataSourceApi';
export declare class DataSourceApi extends ApiBase implements IDataSourceApi {
    Set(dataSourceName: string): void;
    Clear(): void;
}
