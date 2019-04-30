import { ApiBase } from "./ApiBase";
import { IDataSourceApi } from './Interface/IDataSourceApi';
import { IDataSource } from '../Utilities/Interface/BlotterObjects/IDataSource';
import { DataSourceState } from '../Redux/ActionsReducers/Interface/IState';
export declare class DataSourceApi extends ApiBase implements IDataSourceApi {
    getDataSourceState(): DataSourceState;
    getAllDataSource(): IDataSource[];
    getCurrentDataSource(): IDataSource;
    getDataSourceByName(dataSourceName: string): IDataSource;
    setDataSource(dataSourceName: string): void;
    createDataSource(dataSourceName: string, dataSourceDescription: string): void;
    addDataSource(dataSource: IDataSource): void;
    clearDataSource(): void;
}
