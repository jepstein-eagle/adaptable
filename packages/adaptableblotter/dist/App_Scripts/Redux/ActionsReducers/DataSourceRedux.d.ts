import { DataSourceState } from './Interface/IState';
import * as Redux from 'redux';
import { IDataSource } from '../../Utilities/Interface/BlotterObjects/IDataSource';
export declare const DATA_SOURCE_SELECT = "DATA_SOURCE_SELECT";
export declare const DATASOURCE_ADD_UPDATE = "DATASOURCE_ADD_UPDATE";
export declare const DATASOURCE_DELETE = "DATASOURCE_DELETE";
export declare const DATASOURCE_CHANGE_NAME = "DATASOURCE_CHANGE_NAME";
export declare const DATASOURCE_CHANGE_DESCRIPTION = "DATASOURCE_CHANGE_DESCRIPTION";
export interface DataSourceSelectAction extends Redux.Action {
    SelectedDataSource: string;
}
export interface DataSourceAddUpdateAction extends Redux.Action {
    index: number;
    DataSource: IDataSource;
}
export interface DataSourceDeleteAction extends Redux.Action {
    DataSource: IDataSource;
}
export interface DataSourceChangeNameAction extends Redux.Action {
    DataSource: IDataSource;
    Name: string;
}
export interface DataSourceChangeDescriptionAction extends Redux.Action {
    DataSource: IDataSource;
    Description: String;
}
export declare const DataSourceSelect: (SelectedDataSource: string) => DataSourceSelectAction;
export declare const DataSourceAddUpdate: (index: number, DataSource: IDataSource) => DataSourceAddUpdateAction;
export declare const DataSourceChangeName: (DataSource: IDataSource, Name: string) => DataSourceChangeNameAction;
export declare const DataSourceChangeDescription: (DataSource: IDataSource, Description: String) => DataSourceChangeDescriptionAction;
export declare const DataSourceDelete: (DataSource: IDataSource) => DataSourceDeleteAction;
export declare const DataSourceReducer: Redux.Reducer<DataSourceState>;
