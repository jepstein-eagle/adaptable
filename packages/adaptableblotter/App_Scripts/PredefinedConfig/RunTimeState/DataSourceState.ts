import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface DataSourceState extends RunTimeState {
  DataSources?: DataSource[];
  CurrentDataSource?: string;
}

export interface DataSource extends AdaptableBlotterObject {
  Name: string;
  Description: string;
  Params?: any[];
}
