import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface DataSourceState extends RunTimeState {
  DataSources?: DataSource[];
  CurrentDataSource?: string;
}

export interface DataSource extends IAdaptableBlotterObject {
  Name: string;
  Description: string;
  Params?: any[];
}
