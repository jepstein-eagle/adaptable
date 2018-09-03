import { DataSourceState } from './Interface/IState';
import * as Redux from 'redux';
export declare const DATA_SOURCE_SELECT = "DATA_SOURCE_SELECT";
export interface DataSourceSelectAction extends Redux.Action {
    SelectedDataSource: string;
}
export declare const DataSourceSelect: (SelectedDataSource: string) => DataSourceSelectAction;
export declare const DataSourceReducer: Redux.Reducer<DataSourceState>;
