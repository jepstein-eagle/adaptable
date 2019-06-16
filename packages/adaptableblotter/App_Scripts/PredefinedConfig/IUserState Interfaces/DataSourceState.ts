import { IUserState } from '../Interfaces/IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface DataSourceState extends IUserState {
  DataSources?: IDataSource[];
  CurrentDataSource?: string;
}

export interface IDataSource extends IAdaptableBlotterObject {
  Name: string;
  Description: string;
  Params?: any[];
}
