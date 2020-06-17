import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { BaseSchedule } from './Common/Schedule';

// This is now ENTIRELY local - nothing is provided at design time as that is all done through options
// and we have moved scheduling
export interface OpenFinState extends ConfigState {
  CurrentLiveOpenFinReport?: OpenFinReport;
  IsOpenFinRunning?: boolean;
}

export interface OpenFinReport extends AdaptableObject {
  ReportName: string;
  // might be more properties
}

export interface OpenFinSchedule extends BaseSchedule {
  OpenFinReport: OpenFinReport;
  Transmission: 'Live Data';
}
