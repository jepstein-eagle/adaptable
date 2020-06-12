import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { BaseSchedule } from './Common/Schedule';

// This is now ENTIRELY local - nothing is provided at design time as that is all done through options
// and we have moved scheduling
export interface Glue42State extends ConfigState {
  Glue42LoginErrorMessage?: string;
  CurrentLiveGlue42Report?: Glue42Report;
  IsGlue42Available?: boolean;
  IsGlue42Running?: boolean;
}

export interface Glue42Report extends AdaptableObject {
  ReportName: string;
  // might be more properties
}

export interface Glue42Schedule extends BaseSchedule {
  Glue42Report: Glue42Report;
  Transmission: 'Snapshot' | 'Live Data';
}
