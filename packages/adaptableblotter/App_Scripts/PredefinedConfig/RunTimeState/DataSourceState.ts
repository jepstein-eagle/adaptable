import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { DataType } from '../Common/Enums';
export interface DataSourceState extends RunTimeState {
  DataSources?: DataSource[];
  CurrentDataSource?: string;
}

export interface DataSource extends AdaptableBlotterObject {
  Name: string;
  Description: string;
  DataSourceParams?: DataSourceParams[];
}

export interface DataSourceParams {
  Name: string;
  DataType: 'String' | 'Number' | 'Boolean' | 'Date';
  // should add some validation at some point - either existing validation rules or something bespoke
  Value?: any;
}
