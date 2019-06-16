import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface DataSourceState extends IUserState {
  DataSources?: DataSource[];
  CurrentDataSource?: string;
}

export interface DataSource extends IAdaptableBlotterObject {
  Name: string;
  Description: string;
  Params?: any[];
}
