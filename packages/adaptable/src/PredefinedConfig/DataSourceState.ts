import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import { DataType } from './Common/Enums';
export interface DataSourceState extends RunTimeState {
  DataSources?: DataSource[];
  CurrentDataSource?: string;
}

export interface DataSource extends AdaptableObject {
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
